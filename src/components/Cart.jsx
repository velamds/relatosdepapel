import useCart from "../hooks/cartHook";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const { cart, clearCart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  return (
    <div className="cart">
      <h2 className="cart__title">Carrito de compras</h2>

      {cart.length === 0 ? (
        <h2 className="cart__empty">El carrito está vacío.</h2>
      ) : (
        <div>
          <div className="cart__table">
            <div className="table__head">
              <div className="head__title">Libro</div>
              <div className="head__title">Precio Unitario</div>
              <div className="head__title">Cantidad</div>
              <div className="head__title">Total</div>
            </div>
            {cart.map((item, index) => (
              <div key={index} className="table__row">
                <p className="row__title">{item.titulo}</p>
                <p className="row__price">${item.precio.toFixed(2)}</p>
                <p className="row__quantity">{item.cantidad}</p>
                <p className="row__totalitem">
                   ${(item.precio * item.cantidad).toFixed(2)}
                   <button
                      className="row__removebutton"
                      onClick={() => removeFromCart(item.id)}>
                      <FaTrash />
                    </button>
                </p>
              </div>
            ))}
          </div>

          <div className="cart__total">
            Total compra: <span className="text-purple-600">  ${total.toFixed(2)}</span>
          </div>

          <div className="cart__buttons">
            <button
              onClick={clearCart}
              className="buttons__clear"
            >
              Vaciar carrito
            </button>
            <Link to='/checkout'>
              <button className="buttons__checkout">
                Proceder al Pago
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart