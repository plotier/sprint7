import React from "react";
import { Link } from 'react-router-dom';
import './Welcome.css'




export const Welcome = () => {
    return (
        <div className="m-5 welcomeMain">
            <h1>Sprint 7</h1>
            <h3>Aplicació per calcular el pressupost d'una pàgina web</h3>
            <ul>
                <li>Seleccionar los servicios contratados</li>
                <li>Personalizar presupuesto con título y nombre</li>
                <li>Guardar presupuesto</li>
                <li>Ordenar presupuesto alfabéticamente, por fecha, o por orden de creación</li>
                <li>Buscar presupuesto por título</li>

            </ul>

            <Link to="/home">
            <button type="button" class="btn btn-primary"> Entrar</button>
            </Link>
        </div>
    )
}