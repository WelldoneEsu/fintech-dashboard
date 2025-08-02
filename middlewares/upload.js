const multer = require('multer');
const path = require('path');

// 1. Storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName =`${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.originalname);
        cb(null, uniqueName + ext);
    }
});

// 2. File filter logic 
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|mp4|mov/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;

    if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type'), false);
    }
};

//3. Multer upload setup
const upload = multer ({
    storage,
    limits: {
        fileSize: 20 * 1024 * 1024 //20MB max
    },
    fileFilter
});

module.exports = upload;


// Basic setup using 'dest' - multer handles file saving automatically
//const upload = multer ({ dest:'uploads/'});

// Set storage engine
/* const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save in 'upload' folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() *1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // unique.jpg
    }
});
 
// File filter: only images
const fileFilter =(req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const ext =
allowedTypes.test(path.extname(file.originalname).toLowerCase());
const mime = allowedTypes.test(file.mimetype);
if (ext && mime) {
    cb(null, true);
} else {
    cb(new Error('Only image files are allowed!'));
}
};

const upload = multer({ storage, fileFilter }); */

