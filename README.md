
# Discord Email Verification System

This is coded in JS using the NodeJS framework, it generates a code and sends them an email with the code. If they do not reply, or enter an incorrect code it will send an message informing them.
I CODED THIS A WHILE AGO SO THERE MIGHT BE BUGS!!




## Authors

- [@Jirgap](https://www.github.com/Jirgap)


## Usage

First install the modules 
```bash
cd \PATH\TO\Directory

npm install discord.js@12
npm install nodemailer
```

Open data.json and add all the information
```json
{
    "email_username": "YOUR EMAIL",
    "email_password": "YOUR EMAIL PASSWORD",
    "email_provider": "EMAIL PROVIDER GOES HERE EG GMAIL YAHOO",
    "token": "YOUR BOTS TOKEN"
}
```
Then open index.js and edit these variables/lines

```javascript
[LINE 56] if(message.channel.id !== "VERIFICATION CHANNEL ID GOES HERE") return;
[LINE 66] let role = message.guild.roles.cache.find(r => r.name == 'ROLE NAME GOES HERE')
[LINE 79] contact (admin discord)
```
Finally run the bot
```bash
node index.js
```

## Support

For support, join the [Discord](https://discord.gg/Zxh5WSyZ2t)

