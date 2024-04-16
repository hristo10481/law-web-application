const ConsultationRequest = require('../models/ConsultationRequest');
const User = require('../models/usersTableModel');
const UserProfile = require('../models/userModel');
const Lawyer = require('../models/lawyer');


const nodemailer = require('nodemailer');

UserProfile.hasMany(ConsultationRequest, { foreignKey: 'userId', sourceKey: 'user_id', as: 'consultations' });
ConsultationRequest.belongsTo(UserProfile, { foreignKey: 'userId', targetKey: 'user_id', as: 'userModel' });


Lawyer.hasMany(ConsultationRequest, { foreignKey: 'lawyerId', as: 'consultations' });
ConsultationRequest.belongsTo(Lawyer, { foreignKey: 'lawyerId', as: 'lawyer' });

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: 'testhristo69@gmail.com',
        pass: 'ujab fnlg upmy alof'
    },
    secure: true // Тъй като порт 465 обикновено изисква SSL
});

// Функция за изпращане на имейл
async function sendEmail(to, subject, htmlContent) {
    try {
        const mailOptions = {
            from: '"Адвокатска кантора Георгиеви" <georgievilawfirm@example.com>',
            to: to,
            subject: subject,
            html: htmlContent
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error);
        if (error.response) {
            console.error('SMTP Response:', error.response);
        }
    }
}

exports.getAllConsultations = async (req, res) => {
    try {
        const consultations = await ConsultationRequest.findAll({


            include: [
                { model: UserProfile, as: 'userModel' },
                { model: Lawyer, as: 'lawyer' }
            ]

        });
        console.log(consultations);  // Добавете този ред за дебъгване

        res.status(200).send(consultations);
    } catch (error) {
        res.status(400).send(error.message);
    }
};


// Създаване на нова консултация
exports.createConsultation = async (req, res) => {
    try {


        const { userId, lawyerId, appointmentDateTime } = req.body;
        const newConsultation = await ConsultationRequest.create({
            userId,
            lawyerId,
            appointmentDateTime,
            status: 'pending'
        });
        res.status(201).send(newConsultation);

    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Извличане на консултации за конкретен адвокат
exports.getConsultationsForLawyer = async (req, res) => {
    try {
        const { lawyerId } = req.params;
        const consultations = await ConsultationRequest.findAll({
            where: { lawyerId }
        });
        res.status(200).send(consultations);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Обновяване на консултация
exports.updateConsultation = async (req, res) => {
    try {
        const { consultationId } = req.params;
        const { status } = req.body;
        const consultation = await ConsultationRequest.findByPk(consultationId);

        if (!consultation) {
            return res.status(404).send("Consultation not found.");
        }

        consultation.status = status;
        await consultation.save();

        res.status(200).send(consultation);
    } catch (error) {
        res.status(400).send(error.message);
    }
};


// Обновяване на консултация
exports.deleteConsultation = async (req, res) => {
    try {
        const { consultationId } = req.params;
        const { status } = req.body;
        const consultation = await ConsultationRequest.findByPk(consultationId);

        if (!consultation) {
            return res.status(404).send("Consultation not found.");
        }

        consultation.status = status;
        await consultation.destroy();

        res.status(200).send(consultation);
    } catch (error) {
        res.status(400).send(error.message);
    }
};


// Одобряване на консултация
exports.approveConsultation = async (req, res) => {
    try {
        const { consultationId } = req.params;
        const consultation = await ConsultationRequest.findByPk(consultationId, {
            include: [
                { model: UserProfile, as: 'userModel' },
                { model: Lawyer, as: 'lawyer' }
            ]
        });

        if (!consultation) {
            return res.status(404).send({ message: "Consultation not found." });
        }

        consultation.status = 'approved';
        await consultation.save();

        if (consultation.userModel && consultation.userModel.email) {
            const emailHtml = `
                <html>
                <body>
                    <h1 style="color: #4CAF50;">Потвърждение за консултация</h1>
                    <p>Здравейте, <strong>${consultation.userModel.first_name} ${consultation.userModel.last_name}</strong>,</p>
                    <p>Имаме удоволствието да Ви информираме, че Вашата консултация беше <strong>успешно одобрена</strong>.</p>
                    <ul>
                        <li>Дата и час: <strong>${new Date(consultation.appointmentDateTime).toLocaleString('bg-BG')}</strong></li>
                        <li>Адрес: <strong>Център, ул. "Димитър Благоев" 4Б, 6500 Свиленград</strong></li>
                        <li>Адвокат: <strong>${consultation.lawyer.firstName} ${consultation.lawyer.lastName}</strong></li>
                    </ul>
                    <p>Моля, бъдете на адреса 10 минути преди насроченото време и не забравяйте да носите необходимите документи.</p>
                    <p>Благодарим Ви за доверието и очакваме с нетърпение да Ви срещнем!</p>
                    <p>С уважение,</p>
                    <p>Екипът на Адвокатска кантора Георгиеви</p>
                </body>
                </html>
            `;
            await sendEmail(consultation.userModel.email, "Потвърждение за консултация", emailHtml);
        }

        res.status(200).send({ message: "Consultation approved successfully." });
    } catch (error) {
        console.error('Error approving consultation:', error);
        res.status(400).send(error.message);
    }
};


exports.declineConsultation = async (req, res) => {
    try {
        const { consultationId } = req.params;
        const consultation = await ConsultationRequest.findByPk(consultationId, {
            include: [
                { model: UserProfile, as: 'userModel' },
                { model: Lawyer, as: 'lawyer' }
            ]
        });

        if (!consultation) {
            return res.status(404).send({ message: "Consultation not found." });
        }

        consultation.status = 'declined';
        await consultation.save();

        if (consultation.userModel && consultation.userModel.email) {
            const emailHtml = `
                <html>
                <body>
                    <h1 style="color: #f44336;">Отхвърлена консултация</h1>
                    <p>Здравейте, <strong>${consultation.userModel.first_name} ${consultation.userModel.last_name}</strong>,</p>
                    <p>Съжаляваме да ви съобщим, че вашата заявка за консултация на <strong>${new Date(consultation.appointmentDateTime).toLocaleString('bg-BG')}</strong> е била <strong>отхвърлена</strong>.</p>
                    <h2>Подробности за отхвърлянето:</h2>
                    <ul>
                        <li>Адрес: <strong>Център, ул. "Димитър Благоев" 4Б, 6500 Свиленград</strong></li>
                        <li>Адвокат: <strong>${consultation.lawyer.firstName} ${consultation.lawyer.lastName}</strong></li>
                    </ul>
                    <p>Може би, поради предварително ангажиран график или други обстоятелства, не можем да осигурим консултация в посочения от вас период.</p>
                    <p>Моля, не се колебайте да се свържете с нас за нова заявка или допълнителна информация. Благодарим за разбирането.</p>
                    <p>С уважение,</p>
                    <p>Екипът на Адвокатска кантора Георгиеви</p>
                </body>
                </html>
            `;

            await sendEmail(
                consultation.userModel.email,
                "Отхвърлена консултация",
                emailHtml
            );
        }

        res.status(200).send({ message: "Consultation declined successfully." });
    } catch (error) {
        console.error('Error declining consultation:', error);
        res.status(400).send(error.message);
    }
};
