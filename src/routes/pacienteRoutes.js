import express from 'express';
import checkAuth from '../middleware/checkAuth.js';

import {
    agregarPaciente,
    obtenerPaciente,
    obtenerPacientes,
    actualizarPaciente,
    eliminarPaciente
} from '../controllers/pacienteController.js'

const router = express.Router();

router
    .route("/")
    .post(checkAuth, agregarPaciente)
    .get(checkAuth, obtenerPacientes)

router
    .route("/:id")
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, actualizarPaciente)
    .delete(checkAuth, eliminarPaciente)

export default router;