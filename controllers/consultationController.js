// controllers/consultationController.js
const Consultation = require('../models/consultation');
const nodemailer = require('nodemailer');

// Конфигурирайте транспортъра за изпращане на имейли
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
        // Запазете консултацията в базата данни
        const consultation = await Consultation.create({
            name,
            phone,
            email,
            inquiry,
            additional_info,
            consent
        });

        // Изпратете имейл за уведомление
        const mailOptions = {
            from: '"Адвокатска кантора Георгиеви" <georgievilawfirm@example.com>',
            to: req.body.email,
            subject: `Заявка за онлайн консултация: ${inquiry}`,
            html: `
                <p>Здравейте, ${name}!</p>
                <p>Благодарим ви, че се свързахте с нас.</p>
                <p>Ще се свържем с вас на телефон: ${phone} възможно най-скоро!</p>
                <p>С уважение,<br>Адвокатска кантора Георгиеви</p>
            `
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            console.log(mailOptions);
            if (error) {
                console.log('Error occurred while sending email:', error);
            } else {
                console.log('Email sent:', info.response);
              
            }
        });
        //  res.redirect('/');
        res.status(201).json({ message: 'Consultation request sent successfully.' });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
