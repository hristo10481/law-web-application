// controllers/userController.js

const User = require('../models/usersTableModel');

const userController = {
    // Получаване на всички потребители
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Създаване на нов потребител
    createUser: async (req, res) => {
        try {
            const { username, email, password, role } = req.body;
            const newUser = await User.create({ username, email, password, role });
            res.json(newUser);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Редактиране на потребител
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { username, email, password, role } = req.body;
            const userToUpdate = await User.findByPk(id);

            if (userToUpdate) {
                await userToUpdate.update({ username, email, password, role });
                res.send('Потребителят е обновен успешно.');
            } else {
                res.status(404).send('Потребителят не е намерен.');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Изтриване на потребител
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const userToDelete = await User.findByPk(id);

            if (userToDelete) {
                await userToDelete.destroy();
                res.send('Потребителят е изтрит успешно.');
            } else {
                res.status(404).send('Потребителят не е намерен.');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = userController;
