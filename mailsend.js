const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    {
        secure:true,
        host: 'smtp.gmail.com',
        port: 465,
        auth:{
            user:'tiangaming000@gmail.com',
            pass:''
        }
    }
);


function sendMail(to,sub,msg){
    transporter.sendMail({
        to:to,
        subject:sub,
        html:msg
    });

    console.log("Email Sent");
}


sendMail("tiangaming000@gmail.com", "This Is the Subject","This is the message");
