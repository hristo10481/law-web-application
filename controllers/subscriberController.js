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
    from: '"Адв. кантора Георгиеви" <yourEmail@example.com>',
    to: email,
    subject: 'Абонамент за правен бюлетин',
    text: 'Благодарим Ви, че се абонирахте за нашият правен бюлетин.',
    html: '<b>Благодарим Ви, че се абонирахте за нашия правен бюлетин.</b>',
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
    // Проверка дали вече съществува абонат с този имейл
    const existingSubscriber = await Subscriber.findOne({ where: { email } });
    if (existingSubscriber) {
      return res.status(400).send('Този имейл вече е абониран.');
    }

    // Създаване на нов абонат
    const newSubscriber = await Subscriber.create({ email });

    // Изпращане на имейл
    await sendEmail(email);

    res.send('Успешен абонамент.');
  } catch (error) {
    console.error('Възникна грешка:', error);
    res.status(500).send('Възникна грешка при обработката на заявката.');
  }
};
