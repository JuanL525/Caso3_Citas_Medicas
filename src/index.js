import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import cors from 'cors';

import usuarioRoutes from './routes/usuarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';
import especialidadRoutes from './routes/especialidadRoutes.js';
import citaRoutes from './routes/citaRoutes.js';

// 1. Cargar variables de entorno al principio
dotenv.config();

const app = express();

// 2. CORS Abierto (Solución definitiva para el examen)
app.use(cors({
    origin: "*",
    credentials: false
}));

// 3. Habilitar lectura de JSON
app.use(express.json());

// 4. Conectar a la Base de Datos
conectarDB();

// 5. Ruta de bienvenida (Para verificar que el servidor vive)
app.get('/', (req, res) => {
    res.send('Bienvenido a la API del Sistema de Citas Médicas 🏥');
});

// 6. Rutas de la API
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/especialidades', especialidadRoutes);
app.use('/api/citas', citaRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});