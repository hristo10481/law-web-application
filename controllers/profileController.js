// controllers/profileController.js
const UserProfile = require('../models/userModel');


// Във вашата функция getProfile
// Предполагаме, че имате модел за потребителя с име User
const User = require('../models/usersTableModel'); // Пътят до модела може да се различава


exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    let profile = await UserProfile.findOne({ where: { user_id: userId } });
    const user = await User.findByPk(userId);

    if (!profile) {
      profile = {
        first_name: "",
        last_name: "",
        email: user.email, // Вземаме email от таблицата `users`
        phone_number: "",
      };
    }

    res.render('profile', { user: profile });
  } catch (error) {
    console.error('Fetching profile failed:', error);
    res.status(500).send('Internal Server Error');
  }
};

  
exports.updateOrCreateProfile = async (req, res) => {

  const userId = req.user.id;
  const { first_name, last_name, email, phone_number } = req.body;
console.log(req.body);
  try {
    const [profile, created] = await UserProfile.findOrCreate({
      where: { user_id: userId },
      defaults: { first_name, last_name, email, phone_number }
    });

    if (!created) {
      // Ако профилът вече съществува, актуализирайте го
      await UserProfile.update(
        { first_name, last_name, email, phone_number },
        { where: { user_id: userId } }
      );
    }

    res.redirect('/profile');
  } catch (error) {
    console.error('Updating or creating profile failed:', error);
    res.status(500).send('Internal Server Error');
  }
};
