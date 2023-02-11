const discord = require('discord.js');
const mail = require('nodemailer');
const { email_username, email_password, email_provider, token } = require('./data.json');
let prefix = ">";


const client = new discord.Client();
var transporter = mail.createTransport({
    service: email_provider,
    auth: {
        user: `${email_username}`,
        pass: `${email_password}`
    }
});

function makeid(length) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


client.on('ready', () => {
    console.log("[+] Bot online");
    console.log(`[LOG] Emails sent through ${email_username}`)
    console.log("[INFO] Developer xczs#9999");
})

client.on('message', message => {
    if(message.author.bot) return;

    let args = message.content.split(' ');

    let get_date = new Date();
    let year = get_date.getFullYear();
    let month = get_date.getMonth();
    let day = get_date.getDay();
    let hrs = get_date.getHours();
    let mins = get_date.getMinutes();
    let secs = get_date.getSeconds();
    let the_date = `${day}/${month}/${year} ${hrs}:${mins}:${secs}`;

    if(message.attachments.size > 0) {
        message.attachments.forEach(function(attachment) {
            console.log(`\n[LOG] ${message.author.tag}: ${attachment.url} \nSent: ${the_date}`);
        });
        return;
    }

    console.log(`\n[LOG] ${message.author.tag}: ${args} \nSent: ${the_date}`);
    
    if(message.channel.id !== "VERIFICATION CHANNEL ID GOES HERE") return;

    if(message.content.startsWith('>verify') === true) {
        message.delete();
        if(!args[1]) return message.author.send(`${message.author.tag}: NO EMAIL GIVEN!`);

        const code_send = makeid(6);
        const email_ad = args[1];
        const author_sent = message.author.username;

        let role = message.guild.roles.cache.find(r => r.name == 'YOUR ROLE GOES HERE')

        if(code_send === '') return message.author.send(`${message.author.tag}: COULD NOT GENERATE A CODE, CONTACT SUPPORT?`);

        var mailOptions = {
            from: `${email_username}`,
            to: `${email_ad}`,
            subject: 'Verify In xczs server',
            html: `
            <div style="text-align: center;">
                <p>Hello <b>${email_ad.substring(0, email_ad.indexOf("."))}</b>,</p>
                <p>Discord user: ${message.author.tag}</p>
                <p>Your code is: <b>${code_send}</b></p>
                <p style="font-size: 12px; color: grey;">This message was sent to ${email_ad}, if you did not request a code please contact (admin discord)</p>
            </div>`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(`\n[DEBUG] ${error}`);
                message.author.send("An error has occured, please alert the support!");
                return;
            } else {
                console.log(`\n[LOG] [DEBUG] USER: ${author_sent}\nCode:${code_send}\nSENT: ${email_ad}\nRESPONSE: ${info.response}`);
                message.author.send(`${author_sent} your code has been sent`);
            }
        }); 


        let filter = m => m.author.id === message.author.id;
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 60000,
            errors: ['time']
          })
          .then(messagee => {
            messagee = messagee.first();
            if (messagee.content === code_send) {
                messagee.delete();
                message.member.roles.add(role);
                return messagee.channel.send(`${author_sent} VERIFIED`);
            } else {
                messagee.delete();
                return message.author.send(`${author_sent} PROVIDED INVALID CODE`);
            }
          })
          .catch(collected => {
                console.log(`\n[LOG] ${author_sent} RAN OUT OF TIME WHEN USING THE COMMAND ${collected}`);
                return message.author.send(`${author_sent} RAN OUT OF TIME TO VERIFY, PLEASE TRY AGAIN!`);
          });
    } else {
        message.delete();
    }
})


client.login(token);