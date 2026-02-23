import express from 'express';

import{
    agregarEspecialidad,
    obtenerEspecialidad,
    obtenerEspecialidades,
    actualizarEspecialidad,
    eliminarEspecialidad
} from '../controllers/especialidadController.js';

const router = express.Router()

router
    .route("/")
    .post(agregarEspecialidad)
    .get(obtenerEspecialidades);

router
    .route("/:id")
    .get(obtenerEspecialidad)
    .put(actualizarEspecialidad)
    .delete(eliminarEspecialidad)

export default router;
