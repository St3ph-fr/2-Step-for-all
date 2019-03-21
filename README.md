# 2-Step-for-all
This repository is made for Google G Suite Admin that want to turn ON 2-Step for all their domain. We provide some advice and a script to stream line the 2-Step enforcement of users.

## Why this project
Google highly recomment to activate the 2-Step on Google account and I really believe it can help company to avoid most of Phishing / HiJacking attacks.
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
