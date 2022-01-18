import React from "react";
import './PopupStyle.css'

export const Popup = props => {

    return (props.trigger) ? (

        <div onClick={props.closingFunction}  className="wholePopup">
            <div className="balloonPopup">
            <p className="descripcionPopup">En este componente deberá indicar el número de {props.contenido} que tiene su sitio web</p>
            </div>
            <button></button>
        </div>
    )
        : "";
}