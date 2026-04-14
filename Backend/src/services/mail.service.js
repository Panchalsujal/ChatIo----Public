// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         type: 'OAuth2',
//         user: process.env.GOOGLE_USER,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
//         clientId: process.env.GOOGLE_CLIENT_ID
//     }
// })

// transporter.verify()
//     .then(() => { console.log("Email transporter is ready to send emails"); })
//     .catch((err) => { console.error("Email transporter verification failed:", err); });


// export async function sendEmail({ to, subject, html, text }) {

//     const mailOptions = {
//         from: process.env.GOOGLE_USER,
//         to,
//         subject,
//         html,
//         text
//     };

//     const details = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", details);
// }


import sgMail from "@sendgrid/mail";

// set api key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail({ to, subject, html, text }) {
    try {

        const msg = {
            to,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject,
            text,
            html
        };

        const response = await sgMail.send(msg);

        console.log("Email sent:", response[0].statusCode);

        return response;

    } catch (error) {

        console.error(
            "Email error:",
            error.response?.body || error.message
        );

        throw error;
    }
}