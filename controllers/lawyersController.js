// controllers/lawyersController.js

const Lawyer = require('../models/lawyer');

const lawyersController = {

  getAllLawyers: async (req, res) => {
    try {
      const lawyers = await Lawyer.findAll();
      res.json(lawyers);
    } catch (error) {
      console.error("Failed to fetch lawyers", error);
      res.status(500).send("An error occurred while fetching lawyers.");
    }
  },

  createLawyer: async (req, res) => {
    try {
      const { firstName, lastName, email, phone, specialization, profilePicturePath } = req.body;
      const lawyer = await Lawyer.create({ firstName, lastName, email, phone, specialization, profilePicturePath });
      res.send(lawyer);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateLawyer: async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, email, phone, specialization, profilePicturePath } = req.body;
      const lawyer = await Lawyer.findByPk(id);
      if (lawyer) {
        await lawyer.update({ firstName, lastName, email, phone, specialization, profilePicturePath });
        res.send(lawyer);
      } else {
        res.status(404).send('Lawyer not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deleteLawyer: async (req, res) => {
    try {
      const { id } = req.params;
      const lawyer = await Lawyer.findByPk(id);
      if (lawyer) {
        await lawyer.destroy();
        res.send({ message: 'Lawyer deleted successfully' });
      } else {
        res.status(404).send('Lawyer not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

module.exports = lawyersController;