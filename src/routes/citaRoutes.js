import express from 'express';

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
    .post(agregarCita)
    .get(obtenerCitas)

router
    .route("/:id")
    .get(obtenerCita)
    .put(actualizarCitas)
    .delete(eliminarCita)

export default router;