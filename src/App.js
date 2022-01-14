import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Panell } from './styled';
function App() {

  //Array con los precios de los input
  const [totalPrice, setTotalPrice] = useState([]);

  //Precio de las paginas e idiomas en el apartado web
  const[extraWeb, setExtraWeb]=useState({
    paginas:1,
    idiomas:1
  })

  //Suma total de todos los precios
  const [sumaPrecio, setSumaPrecio] = useState(0)
  const [plusWeb, setPlusWeb] = useState(1)


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

  //Funcion para calcular precio web con numero de paginas e idiomas
  // Numero de pàgines * el numero d'idiomes * 30 €.
  const handlePagNum=(event)=>{
    let value = parseInt(event.target.value);
    let newValue = (Number.isNaN(value) ? 1 : value);
    setExtraWeb(
      {
      ...extraWeb,
      [event.target.name]:newValue}
    )      
  }

//Suma total de todos los precios
  useEffect(() => {
    if (totalPrice.length !== 0) {
      setSumaPrecio(totalPrice.reduce((a, b) => a + b))
    }
  })
  useEffect(() => {
    let cantPaginas = extraWeb.paginas
    let cantIdiomas = extraWeb.idiomas 
    let resultado =  cantIdiomas*cantPaginas*30
    resultado !=30?resultado=resultado:resultado=0;
    setPlusWeb(
      resultado
    )},[extraWeb])


  return (
    <div className='container m-5'>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="500" id="web" onChange={e => handleOnChangeOne(e)} checked={isCheckedOne} />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Una página web (€500)
        </label>
      </div>

      {/*////Renderizado condicional*/}
    {isCheckedOne && 
          <Panell>
          <form className='d-flex flex-column'>
            <label htmlFor="paginas" className='m-2'>Número de páginas:
              <input type='number' name='paginas' className='costumeInput' onChange={handlePagNum} placeholder="1"></input>
            </label>
            <label htmlFor="idiomas" className='m-2'>Número de idiomas:
              <input type='number' name='idiomas' className='costumeInput' onChange={handlePagNum} placeholder="1"></input>
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
        <h5>Total : {sumaPrecio+plusWeb} </h5>
      </div>

    </div>
  );
}

export default App;
