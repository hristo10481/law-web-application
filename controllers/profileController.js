// controllers/profileController.js
const UserProfile = require('../models/userModel');
const User = require('../models/usersTableModel');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    let profile = await UserProfile.findOne({ where: { user_id: userId } });
    const user = await User.findByPk(userId);

    if (!profile) {
      profile = {
        first_name: "",
        last_name: "",
        email: user.email,
        phone_number: "",
      };
    }

    res.render('profile', { user: profile });
  } catch (error) {
    console.error('Fetching profile failed:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getProfileData = async (userId) => {
  try {
    let profile = await UserProfile.findOne({ where: { user_id: userId } });
    const user = await User.findByPk(userId);

    if (!profile) {
      profile = {
        first_name: "",
        last_name: "",
        email: user ? user.email : "",
        phone_number: "",
      };
    }

    return profile;
  } catch (error) {
    console.error('Fetching profile failed:', error);
    throw error;
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
