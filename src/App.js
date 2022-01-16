import './App.css';
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { Panell } from './styled';
import { NumInput } from './components/NumInput.js'


function App() {

  //Array con los precios de los input
  const [totalPrice, setTotalPrice] = useState([]);
  //Precio de las paginas e idiomas en el primer checkbox
  const [extraWeb, setExtraWeb] = useState({
    paginas: 1,
    idiomas: 1
  })
  //Suma total de todos los precios, menos los plus del primer checkbox
  const [sumaPrecio, setSumaPrecio] = useState(0)
  //Suma de los precios por páginas e idiomas en el primer checkbox
  const [plusWeb, setPlusWeb] = useState(1)

  //Los tres estados y funciones para comprobar si está o no checkeado el checkbox
  const [isCheckedOne, setIsCheckedOne] = useState(false);
  const [isCheckedTwo, setIsCheckedTwo] = useState(false);
  const [isCheckedThree, setIsCheckedThree] = useState(false);

  const handleOnChangeOne = e => {
    setIsCheckedOne(!isCheckedOne);
    e.target.checked ? setTotalPrice([...totalPrice, parseInt(e.target.value)])
      :
      setTotalPrice(totalPrice => totalPrice.filter(item => item !== parseInt(e.target.value)))
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
  const refFunction = event => {
    if(refInput.current.value){
      refInput.current.value = parseInt(refInput.current.value) + 1
      setExtraWeb(
        {
          ...extraWeb,
         [ refInput.current.name]: parseInt(refInput.current.value)
        }
      )
    } 
}
  const refFunctionRest = event => {
    if(refInput.current.value && refInput.current.value>1){
      refInput.current.value = parseInt(refInput.current.value) - 1
      setExtraWeb(
        {
          ...extraWeb,
         [ refInput.current.name]: parseInt(refInput.current.value)
        }
      )
    } 
}
  const refInput2 = useRef(null);
  const refFunction2 = event => {
    if(refInput2.current.value){
      refInput2.current.value = parseInt(refInput2.current.value) + 1
      setExtraWeb(
        {
          ...extraWeb,
         [ refInput2.current.name]: parseInt(refInput2.current.value)
        }
      )
    } 
}
const refFunctionRest2 = event => {
  if(refInput2.current.value && refInput2.current.value>1){
    refInput2.current.value = parseInt(refInput2.current.value) - 1
    setExtraWeb(
      {
        ...extraWeb,
       [ refInput2.current.name]: parseInt(refInput2.current.value)
      }
    )
  } 
}



//Suma del plus del primer checkbox (paginas e idiomas) // Numero de pàgines * el numero d'idiomes * 30 €.
useEffect(() => {
  let cantPaginas = extraWeb.paginas
  let cantIdiomas = extraWeb.idiomas
  let resultado = cantIdiomas * cantPaginas * 30
  resultado > 30 ? resultado = resultado : resultado = 0;
  setPlusWeb(
    resultado
  )
}, [extraWeb])

//Suma total de todos los precios, sin el plus del primer checkbox
useEffect(() => {
  if (totalPrice.length !== 0) {
    setSumaPrecio(totalPrice.reduce((a, b) => a + b))
  }
})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
return (
  <div className='container m-5'>
    <div className="form-check">
      <input className="form-check-input" type="checkbox" value="500" id="web" onChange={e => handleOnChangeOne(e)} checked={isCheckedOne} />
      <label className="form-check-label" htmlFor="flexCheckDefault">
        Una página web (€500)
      </label>
    </div>

    {/*Renderizado condicional, si está checkeado el primer checkbox*/}
    {isCheckedOne &&
      <Panell>
        <form className='d-flex flex-column'>
          <label htmlFor="paginas" className='m-2'>Número de páginas:
            <button type="button" className="btn btn-success" onClick={refFunctionRest}>-</button>  <NumInput referencia={refInput} valor={extraWeb.paginas} name={"paginas"} funcion={handlePagNum} /><button type="button" className="btn btn-success" onClick={refFunction}>+</button>
          </label>
          <label htmlFor="idiomas" className='m-2'>Número de idiomas:
          <button type="button" className="btn btn-success" onClick={refFunctionRest2}>-</button> <NumInput referencia={refInput2}  valor={extraWeb.idiomas} name={"idiomas"} funcion={handlePagNum} /><button type="button" className="btn btn-success" onClick={refFunction2}>+</button>
          </label>
        </form>
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
    <div>
      <h5>Total : {sumaPrecio + plusWeb} </h5>
    </div>

  </div>
);
}

export default App;
