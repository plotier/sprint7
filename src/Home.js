import './App.css';
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { Panell } from './styled';
import { NumInput } from './components/NumInput.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Popup } from './components/Popup.js'
import { Presupuesto } from './components/Presupuesto';

export const Home = () => {

  //Array con los precios de los input
  const [totalPrice, setTotalPrice] = useState([]);
  //Paginas e idiomas en el primer checkbox
  const [extraWeb, setExtraWeb] = useState({
    paginas: 1,
    idiomas: 1
  })
  //Suma total de todos los precios, menos los plus del primer checkbox
  const [sumaPrecio, setSumaPrecio] = useState(0)
  //Suma de los precios por páginas e idiomas en el primer checkbox
  const [plusWeb, setPlusWeb] = useState(1)
  //Suma de los precios de los checkbox + el precio de los plus del primer checkbox
  const total = sumaPrecio + plusWeb

  //Los tres estados y funciones para comprobar si está o no checkeado el checkbox
  const [isCheckedOne, setIsCheckedOne] = useState(false);
  const [isCheckedTwo, setIsCheckedTwo] = useState(false);
  const [isCheckedThree, setIsCheckedThree] = useState(false);

  const [buttonPupop, setButtonPupop] = useState(false);


  //Local Storage

  useEffect(() => {
    const valueFirstBox = localStorage.getItem('firstCheckBox');
    setIsCheckedOne(JSON.parse(valueFirstBox))
    const valueSecondBox = localStorage.getItem('secondCheckBox');
    setIsCheckedTwo(JSON.parse(valueSecondBox))
    const valueThirdBox = localStorage.getItem('thirdCheckBox');
    setIsCheckedThree(JSON.parse(valueThirdBox))
    const valueTotalPrice = localStorage.getItem('totalPrice');
    valueTotalPrice != null ? setTotalPrice(JSON.parse(valueTotalPrice)) : valueTotalPrice = totalPrice
    const valueExtraWeb = localStorage.getItem('extraWeb');
    valueExtraWeb != null ? setExtraWeb(JSON.parse(valueExtraWeb)) : valueExtraWeb = extraWeb
    const valuePresupuesto = localStorage.getItem('presupuesto');
    valuePresupuesto != null ? setPresupuesto(JSON.parse(valuePresupuesto)) : valuePresupuesto = presupuesto
    const valuePresupuestoAbc = localStorage.getItem('presupuestoAbc');
    valuePresupuestoAbc != null ? setPresupuestoAbc(JSON.parse(valuePresupuestoAbc)) : valuePresupuestoAbc = presupuestoAbc
    
  }, [])

  useEffect(() => {
    localStorage.setItem('firstCheckBox', JSON.stringify(isCheckedOne))
    localStorage.setItem('secondCheckBox', JSON.stringify(isCheckedTwo))
    localStorage.setItem('thirdCheckBox', JSON.stringify(isCheckedThree))
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice))
    localStorage.setItem('extraWeb', JSON.stringify(extraWeb))
    localStorage.setItem('presupuesto', JSON.stringify(presupuesto))
    localStorage.setItem('presupuestoAbc', JSON.stringify(presupuestoAbc))
  })



  const handleOnChangeOne = e => {
    setIsCheckedOne(!isCheckedOne);
    e.target.checked ? setTotalPrice([...totalPrice, parseInt(e.target.value)])
      :
      setTotalPrice(totalPrice => totalPrice.filter(item => item !== parseInt(e.target.value)));
  };
  const handleOnChangeTwo = e => {
    setIsCheckedTwo(!isCheckedTwo);
    e.target.checked ? setTotalPrice([...totalPrice, parseInt(e.target.value)])
      :
      setTotalPrice(totalPrice => totalPrice.filter(item => item !== parseInt(e.target.value)))
  };
  const handleOnChangeThree = e => {
    setIsCheckedThree(!isCheckedThree);
    e.target.checked ? setTotalPrice([...totalPrice, parseInt(e.target.value)])
      :
      setTotalPrice(totalPrice => totalPrice.filter(item => item !== parseInt(e.target.value)))
  };

  //Input onChange numero de paginas e idiomas (Primer checkbox)
  const handlePagNum = (event) => {
    let value = parseInt(event.target.value);
    let newValue = (Number.isNaN(value) ? 1 : value);
    setExtraWeb(
      {
        ...extraWeb,
        [event.target.name]: newValue
      }
    )
  }
  const refInput = useRef(null);
  const refFunction = event => {  //para hacer un refactor puedo pasar parametros para las funciones en el onClick de los botones
    if (refInput.current.value) {
      refInput.current.value = parseInt(refInput.current.value) + 1
      setExtraWeb(
        {
          ...extraWeb,
          [refInput.current.name]: parseInt(refInput.current.value)
        }
      )
    }
  }
  const refFunctionRest = event => {
    if (refInput.current.value && refInput.current.value > 1) {
      refInput.current.value = parseInt(refInput.current.value) - 1
      setExtraWeb(
        {
          ...extraWeb,
          [refInput.current.name]: parseInt(refInput.current.value)
        }
      )
    }
  }
  const refInput2 = useRef(null);
  const refFunction2 = event => {
    if (refInput2.current.value) {
      refInput2.current.value = parseInt(refInput2.current.value) + 1
      setExtraWeb(
        {
          ...extraWeb,
          [refInput2.current.name]: parseInt(refInput2.current.value)
        }
      )
    }
  }
  const refFunctionRest2 = event => {
    if (refInput2.current.value && refInput2.current.value > 1) {
      refInput2.current.value = parseInt(refInput2.current.value) - 1
      setExtraWeb(
        {
          ...extraWeb,
          [refInput2.current.name]: parseInt(refInput2.current.value)
        }
      )
    }
  }
  //Suma del plus del primer checkbox (paginas e idiomas) // Numero de pàgines * el numero d'idiomes * 30 €.
  useEffect(() => {
    let cantPaginas = extraWeb.paginas
    let cantIdiomas = extraWeb.idiomas
    let resultado = cantIdiomas * cantPaginas * 30
    // resultado > 30 ? resultado = resultado : resultado = 0;
    isCheckedOne ? resultado = resultado : resultado = 0;
    setPlusWeb(
      resultado
    )
  }, [extraWeb, isCheckedOne])

  //Suma total de todos los precios, sin el plus del primer checkbox
  useEffect(() => {
    if (totalPrice.length !== 0) {
      setSumaPrecio(totalPrice.reduce((a, b) => a + b))
    }
    else { setSumaPrecio(0) }
  })
  const [contenidoWeb, setContenidoWeb] = useState("")
  const buttonPopFunction = (dato) => {
    setButtonPupop(!buttonPupop);
    setContenidoWeb(dato)
  }

  const [datosPersonales, setDatosPersonales] = useState({
    nombre: "",
    tituloPresupuesto: ""
  })
  const handlePersonalInput = e => {
    setDatosPersonales({
      ...datosPersonales,
      [e.target.name]: e.target.value

    })
  }

  const [presupuesto, setPresupuesto] = useState([])

  const enviarDatos = event => {
    event.preventDefault()
    const paginaWeb = isCheckedOne ? true : false;
    const consultoriaSEO = isCheckedTwo ? true : false;
    const GoogleAds = isCheckedThree ? true : false;
    const now = new Date();
    const simpleDate = now.getDate() + "/" + now.getMonth() + 1 + "/" + now.getFullYear() + " At " + now.getHours() + " : " + now.getMinutes() + " : " + now.getSeconds()

    setPresupuesto([
      ...presupuesto, {
        nombre: datosPersonales.nombre,
        titulo: datosPersonales.tituloPresupuesto,
        pagWeb: paginaWeb,
        extras: {
          paginas: extraWeb.paginas,
          idiomas: extraWeb.idiomas
        },
        SEO: consultoriaSEO,
        ads: GoogleAds,
        plus: plusWeb,
        total: total,
        fecha: simpleDate,
        fechaCompleta: now
      }])
    setPresupuestoAbc([
      ...presupuesto, {
        nombre: datosPersonales.nombre,
        titulo: datosPersonales.tituloPresupuesto,
        pagWeb: paginaWeb,
        extras: {
          paginas: extraWeb.paginas,
          idiomas: extraWeb.idiomas
        },
        SEO: consultoriaSEO,
        ads: GoogleAds,
        plus: plusWeb,
        total: total,
        fecha: simpleDate,
        fechaCompleta: now
      }])

    setOrdenadoAbc(false)
    setDateCheck(false)
    setReiniciado(true)
  }

  //ordenar alfabeticamente
  const [presupuestoAbc, setPresupuestoAbc] = useState([])
  const [ordenadoAbc, setOrdenadoAbc] = useState(false)
  // const [originalPresupuesto, setOriginalPresupuesto] = useState([])
  const [ordenadoDate, setOrdenadoDate] = useState([])
  const [dateCheck, setDateCheck] = useState(false)
  const [reiniciado, setReiniciado] = useState(true)


  const sortBasicFunction = () => {
    const copyPresupuesto = [...presupuesto]
    setPresupuestoAbc(
      copyPresupuesto.sort((a, b) => a.titulo.localeCompare(b.titulo))
    )
    setOrdenadoAbc(true)
    setReiniciado(false)
    setDateCheck(false)
  }
  //ordenar por fecha///
  const sortDateFunction = () => {
    const copyPresupuesto = [...presupuesto]
    setPresupuestoAbc(
      copyPresupuesto.sort(function (a, b) {
        return new Date(b.fechaCompleta) - new Date(a.fechaCompleta);
      })
    )
    setOrdenadoAbc(false)
    setDateCheck(true)
    setReiniciado(false)
  }

  const reiniciarFunction = () => {
    const copyPresupuesto = [...presupuesto]
    setPresupuestoAbc(
      copyPresupuesto
    )
    setOrdenadoAbc(false)
    setDateCheck(false)
    setReiniciado(true)
  }

const filterHandle = event =>{
  const copyPresupuesto = [...presupuesto]
  const searchWord = event.target.value.toLowerCase()
  const filtro = copyPresupuesto.filter(item=>item.titulo.toLowerCase().includes(searchWord))
  setPresupuestoAbc(filtro)
}

//borrar presupuestos
const handleClear = event =>{
  setPresupuestoAbc([])
  setPresupuesto([])
}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className='row'>
      <div className="col">
        <Popup closingFunction={buttonPopFunction} contenido={contenidoWeb} trigger={buttonPupop} />
        <div className='mainContainer'>

          <form onSubmit={enviarDatos}>

            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="500" id="web" onChange={e => handleOnChangeOne(e)} checked={isCheckedOne} />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Una página web (€500)
              </label>
            </div>

            {/*Renderizado condicional, si está checkeado el primer checkbox*/}
            {isCheckedOne &&
              <Panell>
                {/* !!!!!!este div y su closing tag eran form*/}     <div className='d-flex flex-column'>
                  <label htmlFor="paginas" className='m-2'>Número de páginas:
                    <button type="button" className="btn btn-success" onClick={refFunctionRest}>-</button>  <NumInput referencia={refInput} valor={extraWeb.paginas} name={"paginas"} funcion={handlePagNum} /><button type="button" className="btn btn-success" onClick={refFunction}>+</button>
                    <FontAwesomeIcon onClick={() => buttonPopFunction("paginas")} id="1" className='infoBtn' icon={faInfoCircle} />
                  </label>
                  <label htmlFor="idiomas" className='m-2'>Número de idiomas:
                    <button type="button" className="btn btn-success" onClick={refFunctionRest2}>-</button> <NumInput referencia={refInput2} valor={extraWeb.idiomas} name={"idiomas"} funcion={handlePagNum} /><button type="button" className="btn btn-success" onClick={refFunction2}>+</button>
                    <FontAwesomeIcon onClick={() => buttonPopFunction("idiomas")} id="2" className='infoBtn' icon={faInfoCircle} />
                  </label>
                </div>
              </Panell>
            }
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="300" id="SEO" onChange={e => handleOnChangeTwo(e)} checked={isCheckedTwo} />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Una consultoría SEO (€300)
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="200" id="ads" onChange={e => handleOnChangeThree(e)} checked={isCheckedThree} />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Una campaña de Google Ads (€200)
              </label>
            </div>
            <div className='inputContainer'>
              <input type="text" className='form-control personalInput' name="nombre" placeholder='Insertar Nombre' onChange={e => handlePersonalInput(e)}></input>
              <input type="text" className='form-control personalInput' name="tituloPresupuesto" placeholder='Insertar Título Presupuesto' onChange={e => handlePersonalInput(e)}></input>
            </div>
            <div>
              <h5>Total : {total} </h5>
            </div>
            <div>
              <button className='btn btn-primary' type='submit'>Enviar</button>
            </div>
          </form>
        </div>
      </div>
      <div className="col">
        <div>
          <button type="button" className="m-1 btn btn-secondary btn-sm" onClick={sortBasicFunction}>Alfabèticament</button>
          <button type="button" className="m-1  btn btn-secondary btn-sm" onClick={sortDateFunction}>Per data</button>
          <button type="button" className="m-1  btn btn-secondary btn-sm" onClick={reiniciarFunction}>Reinicialitzar </button>
          <button className='m-1 btn btn-warning btn-sm' onClick={handleClear}><FontAwesomeIcon  id="1" className='infoBtn' icon={faTrashAlt} /> Clear List
</button>
          <div className='filtroPresupuestos'><input onChange={event=>filterHandle(event)} type="text" placeholder='Buscar presupuesto' className='form-control filtroPresupuestos' />
 </div>
        </div>
        {ordenadoAbc ?
          presupuestoAbc.map(item =>
            <Presupuesto nombre={item.nombre} titulo={item.titulo} pagWeb={item.pagWeb}
              paginas={item.extras.paginas} idiomas={item.extras.idiomas} seo={item.SEO}
              ads={item.ads} plus={item.plus} total={item.total} fecha={item.fecha} />

          ) : ""}
        {dateCheck ?
          presupuestoAbc.map(item =>
            <Presupuesto nombre={item.nombre} titulo={item.titulo} pagWeb={item.pagWeb}
              paginas={item.extras.paginas} idiomas={item.extras.idiomas} seo={item.SEO}
              ads={item.ads} plus={item.plus} total={item.total} fecha={item.fecha} />

          ) : ""
        }
        {reiniciado ?//acá mapeaba el presupuestoOriginal
          presupuestoAbc.map(item =>
            <Presupuesto nombre={item.nombre} titulo={item.titulo} pagWeb={item.pagWeb}
              paginas={item.extras.paginas} idiomas={item.extras.idiomas} seo={item.SEO}
              ads={item.ads} plus={item.plus} total={item.total} fecha={item.fecha} />

          ) : ""
        }
      </div>
    </div>
  );

}