# 2-Step-for-all
This repository is made for Google G Suite Admin that want to turn ON 2-Step for all their domain. We provide some advice and a script to stream line the 2-Step enforcement of users.

## Why this project
Google highly recomment to activate the 2-Step on Google account and I really believe it can help company to avoid most of Phishing / Hijacking attacks.
For that as a Google Admin you can enfore 2 steps directly on accounts, hard way or you can set a period of time user have to enforce the 2-Step [ref](https://support.google.com/a/answer/9176657).

By experience users do not really care about the Google warning, too generic and not company oriented. It is better to have a direct communiation, it can respect communication policy of your company and personalize the request to imply most actively the user.

2-Step for all is a Google Sheets with an Apps Script bound to easily add emails of users to enforce 2-Step and send 2 emails to invite user to activate 2 steps.

## What will do the script
You can make a copy of the Google Sheets and setup your own version. We provide the script and you an customize it.
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

### Trigger
Setup a trigger by using the option "Setup trigger" int he custom menu "2-Step for All" or setup the trigger manually in the editor. 
Trigger recommendation, daily trigge that run in the morning.

##Install
1. Make a copy of the sheets by clicking on this link : [2-Step for All](http://bit.ly/2TRjPOF)
2. Go to Apps Script editor "Tools >> Script editor" and setup the parameters.
3. Go back to the Sheets and go to menu "2-Step for All >> Setup Trigger"
4. Add emails in the column "A", that's all !
5. Optionnally, you can run it the first time manually instead of waiting next morning. Go to "2-Step for All >> Manual Launch"

