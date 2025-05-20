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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Carrito de compras</h2>

      {cart.length === 0 ? (
        <h2 className="text-center">El carrito está vacío.</h2>
      ) : (
        <div>
          <div className="space-y-2 mb-4">
            <div className="flex flex-row w-full gap-x-20 shadow-sm justify-center">
              <div className="flex-col w-50">Libro</div>
              <div className="flex-col w-50">Precio Unitario</div>
              <div className="flex-col w-50">Cantidad</div>
              <div className="flex-col w-50">Total</div>
            </div>
            {cart.map((item, index) => (
              <div key={index} className="flex flex-row w-full gap-x-20 shadow-sm justify-center">
                <p className="flex-col w-50 font-semibold">{item.titulo}</p>
                <p className="flex-col w-50">${item.precio.toFixed(2)}</p>
                <p className="flex-col w-50 text-sm text-gray-600">{item.cantidad}</p>
                <p className="flex-col w-50 text-purple-600 font-bold">
                   ${(item.precio * item.cantidad).toFixed(2)}
                   <button
                      className="text-red-600 hover:text-red-800 ml-4"
                      onClick={() => removeFromCart(item.id)}>
                      <FaTrash />
                    </button>
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-end mr-30 font-semibold text-lg mb-4">
            Total compra: <span className="text-purple-600">  ${total.toFixed(2)}</span>
          </div>

          <div className="flex justify-end mr-30">
            <button
              onClick={clearCart}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-4"
            >
              Vaciar carrito
            </button>
            <Link to='/checkout'>
              <button className="bg-purple-900 text-white px-4 py-2 rounded hover:bg-purple-600">
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