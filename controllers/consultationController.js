// controllers/consultationController.js
const Consultation = require('../models/consultation');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'testhristo69@gmail.com',
        pass: 'ujab fnlg upmy alof'
    }//tovaetestovemail1948
});

exports.sendConsultation = async (req, res) => {
    try {
        const { name, phone, email, inquiry, additional_info, consent } = req.body;
        console.log(req.body);

        const consultation = await Consultation.create({
            name,
            phone,
            email,
            inquiry,
            additional_info,
            consent
        });

        const mailOptions = {
            from: '"Адвокатска кантора Георгиеви" <georgievilawfirm@example.com>',
            to: email,
            subject: `Запитване`,
            html: `
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        h1 { color: #333; }
                        p { color: #555; }
                    </style>
                </head>
                <body>
                    <h1>Здравейте, ${name}!</h1>
                    <p>Благодарим ви, че направихте запитаване към нас.</p>
                    <p>Вашите допълнителни бележки: "${additional_info || "Няма предоставена допълнителна информация"}".</p>
                    <p>Ще се свържем с вас на посочения телефон <strong>${phone}</strong> възможно най-скоро в рамките на работното време на кантората.</p>
                    <p>Ако имате спешни въпроси, моля не се колебайте да се свържете с нас на следните координати или чрез отговор на този имейл.</p>
                    <p>С уважение,<br>Екипът на Адвокатска кантора Георгиеви</p>
                </body>
                </html>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred while sending email:', error);
                res.status(500).json({ error: 'Failed to send email.' });
            } else {
                console.log('Email sent:', info.response);
                res.status(201).json({ message: 'Consultation request sent successfully.' });
            }
        });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
