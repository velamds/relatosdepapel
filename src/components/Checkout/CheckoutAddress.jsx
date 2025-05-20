import React from 'react'

const CheckoutAddress = () => {
return (    
    <div className="checkoutaddress">
      <h2 className="checkoutaddress__title">🚚 Envío</h2>
      <div className="checkoutaddress__grid">
        <select className="checkout__input">
          <option disabled>País</option>
          <option value="1">Colombia</option>
          <option value="2">España</option>
        </select>
        <input className="checkout__input" placeholder="Departamento / Región" />
        <input className="checkout__input" placeholder="Ciudad / Municipio" />
        <input className="checkout__input" placeholder="Dirección envío" />
        <input className="checkout__input" placeholder="Código postal" />
      </div>
    </div>
  );
};


export default CheckoutAddress