import React from "react";

export const NumInput = props =>{

return(
    <input type='number'ref={props.referencia} value={props.valor} min="1" name={props.name} className='costumeInput' onChange={props.funcion} ></input>
)
}