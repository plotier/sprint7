import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';

function App() {

  const [totalPrice, setTotalPrice] = useState([]);
  const [sumaPrecio, setSumaPrecio] = useState(0)
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

  useEffect(() => {
    if (totalPrice.length !== 0) {
      setSumaPrecio(totalPrice.reduce((a, b) => a + b))
    }
  })

  return (
    <div className='container m-5'>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="500" id="web" onChange={e => handleOnChangeOne(e)} checked={isCheckedOne} />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Una página web (€500)
        </label>
      </div>
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
        <h5>Total : {sumaPrecio}</h5>
      </div>

    </div>
  );
}

export default App;
