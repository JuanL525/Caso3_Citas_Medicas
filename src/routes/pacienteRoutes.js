import express from 'express';

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
    .post(agregarPaciente)
    .get(obtenerPacientes)

router
    .route("/:id")
    .get(obtenerPaciente)
    .put(actualizarPaciente)
    .delete(eliminarPaciente)

export default router;