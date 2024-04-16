const Document = require('../models/docs');
const fs = require('fs');
const path = require('path');

exports.getDocuments = async (req, res) => {
    try {
        const documents = await Document.findAll();
        res.render('index', { documents: documents, user: req.user });
    } catch (error) {
        console.error("Failed to get documents", error);
        res.status(500).send("An error occurred");
    }
};

// Функция за качване на документ
exports.uploadDocument = async (req, res) => {
    try {
        if (!req.files || !req.files.document || !req.files.documentImage) {
            return res.status(400).send({ message: "Document and document image are required." });
        }

        const documentFile = req.files.document[0];
        const imageFile = req.files.documentImage[0];
        const description = req.body.description;

        const document = await Document.create({
            name: documentFile.originalname,
            path: documentFile.path,
            imagePath: imageFile.path,
            description: description
        });

        res.status(201).send({ message: "Document uploaded successfully", document: document });
    } catch (error) {
        console.error("Error uploading document", error);
        res.status(500).send({ message: "Error uploading document", error });
    }
};

// Функция за изтегляне на документ
exports.downloadDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document.findByPk(id);
        if (!document) {
            return res.status(404).send({ message: "Document not found" });
        }
        res.download(document.path, document.name);
    } catch (error) {
        res.status(500).send({ message: "Error downloading document", error });
    }
};

// Функция за изтриване на документ
exports.deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document.findByPk(id);
        if (!document) {
            return res.status(404).send({ message: "Document not found" });
        }
        // Изтриване на файл от файловата система или облачно хр
        fs.unlinkSync(document.path); // За локално съхранени файлове
        await Document.destroy({ where: { id } });
        res.status(200).send({ message: "Document deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error deleting document", error });
    }
};