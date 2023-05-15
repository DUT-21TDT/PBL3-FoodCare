const dotenv = require("dotenv");
const ejs = require("ejs");
const ejsmailfilePath = require("../config/path.config.js").ejsmailfilePath;
dotenv.config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
        user: process.env.GGACCOUNT,
        pass: process.env.GGAPPPWD
    },
});

exports.sendEmail = async function sendEmail(clientAddress, clientName) {
    try {
      const websiteName = "Foodcare";
      const htmlFile = await ejs.renderFile(ejsmailfilePath, {websiteName: websiteName, clientName: clientName});
        let info = await transporter.sendMail({
            from: process.env.GGACCOUNT,
            to: clientAddress,
            subject: 'Greeting newcomer',
            // text: 'Thank you for choosing FoodCare',
            html: htmlFile,
      });
    }

    catch(err) {
        console.log(err);
    }
}




// OAUTH2

// const nodemailer = require("nodemailer");
// const { google } = require('googleapis');
// const OAuth2 = google.auth.OAuth2;
// require("dotenv");

// const oauth2Client = new OAuth2(
//     process.env.GGCLIENTID,
//     process.env.GGCLIENTSECRET,
//     'https://developers.google.com/oauthplayground'
// );

// oauth2Client.setCredentials({
//     refresh_token: process.env.GGREFRESHTOKEN
// });

// const accessToken = oauth2Client.getAccessToken();

// exports.sendEmail = async function sendEmail(toAddress) {
//     try {
//         console.log(accessToken);

//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 type: 'OAuth2',
//                 user: process.env.GGACCOUNT,
//                 accessToken,
//                 clientId: process.env.GGCLIENTID,
//                 clientSecret: process.env.GGCLIENTSECRET,
//                 refreshToken: process.env.GGREFRESHTOKEN
//             }
//         });
  
//         let info = await transporter.sendMail({
//             from: process.env.GGACCOUNT,
//             to: toAddress,
//             subject: 'Test Email',
//             text: 'This is a test email sent from Node.js using Nodemailer'
//       });
  
//     //   console.log('Email sent: ' + info.response);
//     } 
    
//     catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

////////////////////////////////////////////////////////////////////////////////////////