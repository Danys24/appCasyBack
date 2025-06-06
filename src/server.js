import { configuracion } from './config/config.js';
import app from './app.js';

const PORT = configuracion.app.port;

// Servidor escuchando
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});