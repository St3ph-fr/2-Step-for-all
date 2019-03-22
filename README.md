# 2-Step for All

2-Step for All is a project to help Google G Suite Admin to enfoce 2-Step on their domain. You can use the Google Sheets Template to setup the enforcement process in few minutes or customize it for your needs.

## Why this project
Google highly recommend to activate the 2-Step on Google account and I really believe it can help company to avoid most of Phishing / Hijacking attacks.
For that as a Google Admin you can enfore 2 steps directly on accounts, hard way, or you can set a period of time user have to enforce the 2-Step [ref](https://support.google.com/a/answer/9176657).

By experience users do not really care about the Google warning, too generic and not company oriented. It is better to have a direct communication, it can respect communication policy of your company and personalize the request to imply the users most actively.

2-Step for All is a Google Sheets with an Apps Script bound to easily send emails of users to enforce 2-Step in a 1 week (standard setup) period.

## What will do the script
Feature included :
- Enforcement is managed by using a Google Groups
- Send emails to user in order to ease 2-Step setup
- Process start after first user sign-in
- You can customize period of time between each emails
- Script can notifiy manager before to enfoce 2 steps

## Pre requesite
### Admin rights
Script must run on an Admin account with at least this rights :
- List users and view profile details
- Manage Groups

### 2-Step G Suite Admin Setup
Admin must setup a Google Groups ine the admin console to enforce the 2 steps. Go there : [2-Step admin page](https://admin.google.com/AdminHome#ServiceSettings/service=securitysetting)

Select top level domain (1), activate 2-Step (2) and setup a group (3)
<img src="https://github.com/St3ph-fr/2-Step-for-all/blob/master/img/2019-03-22_16h40_19.png"  width="70%" />

### Trigger
Setup a trigger by using the option "Setup trigger" int he custom menu "2-Step for All" or setup the trigger manually in the editor. 
Trigger recommendation, daily trigger that run in the morning.

<img src="https://github.com/St3ph-fr/2-Step-for-all/blob/master/img/2019-03-22_16h23_44.png?raw=true"  width="50%"/>

## Install
1. Make a copy of the sheets by clicking on this link : [2-Step for All](http://bit.ly/2TRjPOF)
2. Go to Apps Script editor "Tools >> Script editor" and setup the parameters.
3. Go back to the Sheets and go to menu "2-Step for All >> Setup Trigger"
4. Add emails in the column "A", that's all !
5. Optionnally, you can run it the first time manually instead of waiting next morning. Go to "2-Step for All >> Manual Launch"

