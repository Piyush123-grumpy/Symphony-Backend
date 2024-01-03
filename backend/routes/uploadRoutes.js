import multer from 'multer'
import path from 'path'
import fs from 'fs';
import { fileURLToPath } from 'url';
import express from 'express';
const router = express.Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesFolderPath = path.join(__dirname, '..', '..', '..', 'Symphony Frontend', 'frontend', 'public', 'images');
console.log(imagesFolderPath)

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images only')
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imagesFolderPath)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


export const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
})

router.post('/upload', upload.single('image'), (req, res) => {
    const originalPath = req.file.path

    // Use regular expression to replace the unwanted parts
    const transformedPath = originalPath.replace(/.*public\\/g, '').replace(/\\/g, '/');
    res.send(`${transformedPath}`)
})

export default router