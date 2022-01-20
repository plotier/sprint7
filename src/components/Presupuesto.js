import React, { useState } from "react";
import "./Presupuesto.css"

export const Presupuesto = props => {
    const [btnMasInFo, setBtnMasInfo] = useState(false)
    return (
        <div className="presupuestoCuadro" >
            <div className="col"><h5>{props.titulo} - {props.nombre}</h5></div>
            <div className="col"><button type="button" onClick={e => setBtnMasInfo(!btnMasInFo)} className="btnMasInfo btn btn-outline-dark btn-sm">+ info</button>
            </div>

            {btnMasInFo &&
                <div>
                    <ul >
                        {props.pagWeb ? <li>Página web (€500)</li> : ""}
                        {props.pagWeb ? <li>Paginas: {props.paginas}. Idiomas:{props.idiomas}. (${props.plus})</li> : ""}
                        {props.seo ? <li>Consultoría SEO (€300)</li> : ""}
                        {props.ads ? <li>Campaña de Google Ads (€200)</li> : ""}
                    </ul>
                    <div className="p-1">
                        <p>{props.total != 0 ? "Total: €" + props.total: ""}</p>
                        <p >{props.total != 0 ? props.fecha : ""}</p>
                    </div>

                </div>
            }
        </div>
    )

}