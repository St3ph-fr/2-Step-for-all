/**************************************************
 ************** Define Global Var ******************
 **************************************************/

var GROUP_EMAIL = ""; //Group to enforce 2 steps
var SHEET_ID = "";
var SHEET_NAME = "2Step";
var FROM = "CUSTOM NAME <custom.name@domain.com>";
var REPLY_TO = "CUSTOM NAME <custom.name@domain.com>";

/**
 * Adds a custom menu with items to show the sidebar and dialog.
 *
 * @param {Object} e The event parameter for a simple onOpen trigger.
 */
function onOpen(e) {
  SpreadsheetApp.getUi()
      .createMenu('2-Step for All')
      .addItem('Setup Trigger','setupTrigger')
      .addItem('Stop Trigger', 'stopTrigger')
      .addItem('Manual Launch', 'twoStepEnforcement')
      .addToUi();
}

/**************************************************
 **************** Main program ********************
 **************************************************/
function setupTrigger(){
  var hour = 6;
  ScriptApp.newTrigger('twoStepEnforcement')
  .timeBased()
  .everyDays(1)
  .atHour(hour)
  .create();
  
  SpreadsheetApp.getUi().alert('Trigger created !');
}

function stopTrigger(){
  var allTriggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < allTriggers.length; i++) {
    ScriptApp.deleteTrigger(allTriggers[i]);
  }
  
  SpreadsheetApp.getUi().alert('Trigger deleted !');
}

function twoStepEnforcement() {
  //Setup data
  var sheetId = SHEET_ID;
  var sheetName = SHEET_NAME;
  var today = new Date();
  var deltaEnforcement = (1*24*60*60*1000) - (60*60*1000); //We remove 1h to be sure enforcement will be done as trigger + treatement time do not occur exactly 24h after email2 is sent
  var deltaEmail2 = 6*24*60*60*1000;
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var data = sheet.getDataRange().getValues();
  
  data.shift(); //remove header
  var newTab = [];
  for(var i in data){
    var row = data[i];
    var email, dateCreated, lastLogin, enrolled,enforced,email1,email2,dateEnforcement;
    [email, dateCreated, lastLogin, enrolled,enforced,email1,email2,dateEnforcement] = row;
    if(dateEnforcement == ""){
      var error = false;
      try{
        var user = AdminDirectory.Users.get(email);
        [dateCreated,lastLogin, enrolled,enforced] = [new Date(user.creationTime),new Date(user.lastLoginTime),user.isEnrolledIn2Sv,user.isEnforcedIn2Sv];
      }catch(e){
        var detailsError = "Error details : "+e.message;
        error = true;
      }
      if(error){
        //Error to get user details from API, if needed do some actions
        GmailApp.sendEmail(Session.getEffectiveUser().getEmail(), "Error to get user details from API : "+email , detailsError);
      }else if(enrolled && !enforced){
        //User have 2 steps but need to be enforced
        enforce2Steps(email);
        dateEnforcement = new Date();
        enforced = true;
      }else if(!enrolled && !enforced){
        //User not enrolled we check for sending emails
        if(lastLogin.getFullYear() == 1970){
          //User never connected so we wait to start the process
          //Some additionnal actions can be added
        }else{
          //The user already connect
          email1 = (email1 != "" ? new Date(email1) : false);
          email2 = (email2 != "" ? new Date(email2) : false);
          if(!email1){
            //We send email 1
            sendEmailOne(email)
            email1 = new Date();
          }else if(!email2 && (today.getTime()-email1.getTime() > deltaEmail2)){
            //We send email 2
            sendEmailTwo(email,getManager(user.relations))
            email2 = new Date();
          }else if(email2  && ((today.getTime()-email2.getTime()) > (deltaEnforcement))){
            //User did not setup 2 Step and is over enforcement window, we enforce 2 Step
            enforce2Steps(email);
            sendEmailEnforcement(email,getManager(user.relations))
            enforced = true;
            dateEnforcement = new Date();
          }
        }
      }else if(enrolled && enforced){
        dateEnforcement = new Date();
      }
      newTab.unshift([email, dateCreated, lastLogin, enrolled,enforced,email1,email2,dateEnforcement]);
    }else{
      //2 Step is already enforced
      newTab.push([email, dateCreated, lastLogin, enrolled,enforced,email1,email2,dateEnforcement]);
    }
  }
  sheet.getRange(2,1,newTab.length,newTab[0].length).setValues(newTab)
}


/**************************************************
 ************* Utils to send email *****************
 **************************************************/

function sendEmailToUser(title,to,html,cc){
  var options = {
    htmlBody:html,
    from:FROM,
    replyTo:REPLY_TO
  };
  if(cc){
    options.cc = cc;
  }
  
  GmailApp.sendEmail(to, title , "", options);
}

function sendEmailOne(email){
  var html = "Hi,<br>"
  +"<p>Our security Policy require you to activate the 2 steps authentication. We send you this email to inform you that the 2 steps will be enforced on your account in 1 week.<br>"
  +"To activate 2 steps on your account you can click on this link : https://myaccount.google.com/signinoptions/two-step-verification<br>"
  +"You can get help here : https://support.google.com/accounts/answer/185839</p>"
  +"Thank you,<br>Support Team";
  
  var title= "Important : Activate the 2-Step Verification";
  
  sendEmailToUser(title,email,html,false)
}

function sendEmailTwo(email,manager){
  var html = "Hi,<br>"
  +"<p>We send you this reminder as you did not activate the 2-Step Verification on your account, it is mandatory to comply with our Security Policy.<br>"
  +"2-Steps verification will be enfoced on your account tomorrow.<br>"
  +"To activate 2 steps on your account you can click on this link : https://myaccount.google.com/signinoptions/two-step-verification<br>"
  +"You can get help here : https://support.google.com/accounts/answer/185839</p>"
  +"Thank you,<br>Support Team";
  
  var title = "Last reminder : Tomorrow 2-Step Verification will be enforced on your account";
  
  sendEmailToUser(title,email,html,manager)
  
}

function sendEmailEnforcement(email,manager){
  var html = "Hi,<br>"
  +"<p>This email to inform you that we enforced 2-Step verification on the acount of "+email+"</p>"
  +"<p>Now, to connect, a backup code will be required, you can ask for one on this page LINK<br>"
  +"Thank you,<br>Support Team";
  
  var title = "Important : 2 steps is now enforced on the account "+email;
  
  if(manager){
    sendEmailToUser(title,manager,html,email);
  }else{
    //We send anyway the email even if user is locked out, can be used to send a communication when user go back to its Gmail
    sendEmailToUser(title,email,html,false);
  }
  
}

/**************************************************
 ******************** Utils ************************
 **************************************************/

function enforce2Steps(email){
  if(!GROUP_EMAIL){
    //Group email not setup, can't enforce 2 steps.
    Logger.log("no group")
    return false;
  }
  var opt = {
    email:email,
    role:"MEMBER"
  };
  AdminDirectory.Members.insert(opt, GROUP_EMAIL);
  //Routine to be sure user will be logout after enforcement and force user to set 2Step by requesting a backup code
  AdminDirectory.Users.update({"changePasswordAtNextLogin": true}, email);
  AdminDirectory.Users.update({"changePasswordAtNextLogin": false}, email);
}

function getManager(relations){
  for(var i in relations){
    if(relations[i].type == "manager"){
      return relations[i].value
    }
  }
  return false;
}
