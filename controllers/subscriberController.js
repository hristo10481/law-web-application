const nodemailer = require('nodemailer');
const Subscriber = require('../models/subscriber.js');

// Настройки за NodeMailer
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

// Функция за изпращане на имейл
const sendEmail = async (email) => {
  let mailOptions = {
    from: '"Адвокатска кантора Георгиеви" <georgievilawfirm@example.com>',
    to: email,
    subject: 'Абонамент за правен бюлетин',
    html: `
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; padding: 20px; }
            .container { background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            h1 { color: #333; }
            p { color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Добре дошли в нашия правен бюлетин!</h1>
            <p>Благодарим Ви, че се абонирахте за нашия правен бюлетин. От тук нататък ще получавате редовна информация за последните новини и събития в областта на правото.</p>
            <p>Всеки месец ще ви предоставяме актуализации и полезна информация, която може да бъде важна за вашите правни нужди.</p>
            <p>С уважение,<br>Екипът на Адвокатска кантора Георгиеви</p>
          </div>
        </body>
      </html>
    `,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Имейлът е изпратен: %s', info.messageId);
  } catch (error) {
    console.error('Възникна грешка при изпращане на имейл:', error);
  }
};

// Контролер за абонамент
exports.subscribe = async (req, res) => {
  const { email } = req.body;

  try {

    const existingSubscriber = await Subscriber.findOne({ where: { email } });
    if (existingSubscriber) {
      return res.status(400).send('Този имейл вече е абониран.');
    }


    const newSubscriber = await Subscriber.create({ email });


    await sendEmail(email);

    res.send('Успешен абонамент.');
  } catch (error) {
    console.error('Възникна грешка:', error);
    res.status(500).send('Възникна грешка при обработката на заявката.');
  }
};
