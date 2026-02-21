import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import{
    agregarCita,
    obtenerCita,
    obtenerCitas,
    actualizarCitas,
    eliminarCita,
} from '../controllers/citaController.js';

const router = express.Router();

router
    .route("/")
    .post(checkAuth, agregarCita)
    .get(checkAuth, obtenerCitas)

router
    .route("/:id")
    .get(checkAuth, obtenerCita)
    .put(checkAuth, actualizarCitas)
    .delete(checkAuth, eliminarCita)

export default router;