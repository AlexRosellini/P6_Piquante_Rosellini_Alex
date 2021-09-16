/*********************************************************************************/
//On importe ce dont nous avons besoin.

const multer = require('multer'); //multer permet de gêrer les fichiers dans no requêtes

/*********************************************************************************/
//On importe ce dont nous avons besoin.

const MIME_TYPES = {
  'image/jpg' : 'jpg',
  'image/jpeg' : 'jpg',
  'image/png' : 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

/*********************************************************************************/
//On exporte notre module

module.exports = multer({storage: storage}).single('image');