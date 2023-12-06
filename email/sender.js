const nodeMailer = require("nodemailer");
const EMAIL_USER = "damian.batista123@gmail.com" // THIS SHOULDNT BE HERE
const EMAIL_PASSWORD = "vbirscarbmtdkznt"       // THIS SHOULDNT BE HERE
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");




const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
    },
});
const getTemplate = () => {
    const emailTemplatePath = path.join(
        __dirname,
        "templates",
        "receipt.ejs"
    );
    const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");
    return emailTemplate;
};

const sendPurchaseEmail = async (email, emailData) => {
    try {
        const emailTemplate = getTemplate();
        const emailContent = ejs.render(emailTemplate, emailData);
        await transporter.sendMail({
            from: '"NFTickets" <NFTickets@example.com>',
            to: email,
            subject: "Gracias por tu compra!",
            html: emailContent,
        });
        console.log(`Email sent successfully to ${email}`);
    } catch (error) {
        console.log("Error sending email:", error);
    }
};

module.exports = {
    sendPurchaseEmail,
};


