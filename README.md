# 2-Step-for-all
This repository is made for Google G Suite Admin that want to turn ON 2-Step for all their domain. We provide some advice and a script to stream line the 2-Step enforcement of users.

## Why this project
Google highly recomment to activate the 2-Step on Google account and I really believe it can help company to avoid most of Phishing / HiJacking attacks.
For that as a Google Admin you can enfore 2 steps directly on accounts, hard way or you can set a period of time user have to enforce the 2-Step [ref](https://support.google.com/a/answer/9176657).

By experience users do not really car about the Google warning, a better direct communiation is required, thta is why I made a custom script that allow an admin to send specific messsage with specific instruction befiore to enforce the 2 steps.

## What will do the script
You can make a copy of the Google Sheets and setup your own version. We provide the script and you an customize it.
Feature included :
- Enforcement is managed by using a Google Groups
- Send emails to user in order to ease 2-Step setup
- Process start after first user sign-in
- 2 reminder emails are sent
- Script can notifiy manager before to enfoce 2 steps
