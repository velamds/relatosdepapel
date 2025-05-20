import React from 'react'

const CheckoutIdentity = () => {
return (
    <section className="checkoutidentity">
      <h2 className="checkoutidentity__title">🆔 Identificación</h2>
      <form className="checkoutidentity__form">
        <input className="checkout__input" placeholder="Correo" />
        <input className="checkout__input" placeholder="Nombre" />
        <input className="checkout__input" placeholder="Apellido" />
        <select className="checkout__input">
          <option disabled>Tipo Documento</option>
          <option value="1">CC</option>
          <option value="1">CE</option>
          <option value="2">Pasaporte</option>
        </select>
        <input className="checkout__input" placeholder="Número Documento" />
      </form>
    </section>
  );
};


export default CheckoutIdentity