import multer from 'multer';
import path from 'path';

// Directorio donde se guardan las imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // crea carpeta si no existe
  },
  filename: function (req, file, cb) {
    // Guardar con nombre único
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

export const upload = multer({ storage });