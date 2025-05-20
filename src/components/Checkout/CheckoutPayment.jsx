import React from 'react'

const CheckoutPayment = () => {

const handleSubmit = (e) => {
  e.preventDefault();
  alert('Formulario Enviado...')
}

return (
    <div className="checkoutpayment">
      <h2 className="checkoutpayment__title">💳 Pago</h2>
      <form className="checkoutpayment__form">
        <input className="checkout__input" placeholder="Nombre de la tarjeta" />
        <input className="checkout__input" placeholder="Número de la tarjeta" />
        <div className="checkoutpayment__expdate">
          <input className="expdate__input" placeholder="Mes" />
          <input className="expdate__input" placeholder="Año" />
        </div>
        <input className="checkout__input" placeholder="Número cuotas" />
        <div className="checkoutpayment__type">
          <label className="type__label">
            <input type="radio" name="pago" /> Tarjeta Crédito
          </label>
          <label className="type__label">
            <input type="radio" name="pago" /> Pago al recibir
          </label>
        </div>
        <button className="checkoutpayment__button" onClick={handleSubmit}>
            Finalizar
        </button>
      </form>
    </div>
  );
};


export default CheckoutPayment