import React from "react";

export const Presupuesto = props => {

    return (
        <div>
            <h4>{props.titulo}</h4>
            <h5>{props.nombre}</h5>
            <ul>
                {}
                {props.pagWeb?<li>Página web (€500)</li>:""}
                {props.pagWeb?<li>Paginas: {props.paginas}. Idiomas:{props.idiomas}. (${props.plus})</li>:"" }
                {props.seo?<li>Consultoría SEO (€300)</li>:""}
                {props.ads?<li>Campaña de Google Ads (€200)</li>:""}
               </ul>
               <h5>{props.total!=0?"Total: €"+props.total+" - " + " Fecha: "+props.fecha:""}</h5>
               
              
        </div>
    )
    
}