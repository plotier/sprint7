import React from "react";

export const NumInput = props => {

    

    return (
        <span>
            <button type="button" className="btn btn-success" onClick={props.funcionRes}>-</button>
            <input type='number' ref={props.referencia} value={props.valor} min="1" name={props.name} className='costumeInput' onChange={props.funcion} ></input>
            <button type="button" className="btn btn-success" onClick={props.funcionSum}>+</button>
        </span>
    )
}