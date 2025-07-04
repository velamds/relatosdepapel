import React, { useState } from 'react'
import axios from 'axios'
import config from '../../config.js'
import useCart from '../../hooks/cartHook';
import { useNavigate } from 'react-router-dom';

const CheckoutPayment = () => {

  const { cart } = useCart();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = {
      userId: 1, // Assumimos este user id
      items: cart.map((item) => ({
        bookId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    try {
      const orderResponse = await axios.post(`${config.API_PAYMENT_PATH}/orders`, form);
      alert('Orden creada correctamente');

      await axios.post(`${config.API_PAYMENT_PATH}/${orderResponse.data.id}/pay`);
      alert('Pago procesado correctamente');
      
      navigate('/');
    } catch (error) {
      alert('Error al procesar el pago');
      console.error(error);
    }
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