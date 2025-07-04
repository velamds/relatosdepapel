import useCart from '../../hooks/cartHook';

const CheckoutItems = () => {
    const { cart } = useCart();
  
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return (
        <div className="checkoutitems">
          <h2 className="checkoutitems__title">🛒 Resumen de la Compra</h2>
          <ul className="checkoutitems__list">
            {cart.map((item) => (
              <li key={item} className="item__li">
                <div className="item__title">
                  <span>{item.title}({item.quantity})</span>
                </div>
                <span>$ {(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
            <div className="checkoutitems__total">
              Total compra: <span className="total__value">  ${total.toFixed(2)}</span>
            </div>
          </ul>
        </div>
      );
    };


export default CheckoutItems