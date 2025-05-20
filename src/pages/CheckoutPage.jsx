import CheckoutIdentity from "../components/Checkout/CheckoutIdentity"
import CheckoutAddress from "../components/Checkout/CheckoutAddress"
import CheckoutPayment from "../components/Checkout/CheckoutPayment"
import CheckoutItems from "../components/Checkout/CheckoutItems"

const CheckoutPage = () => {
  return (
    <div className="checkoutpage">
      <h1 className="checkoutpage__title">Finalizar Compra</h1>
      <div className="checkoutpage__wrapper">
        <CheckoutIdentity/>
        <CheckoutAddress/>
        <CheckoutPayment/>
        <CheckoutItems/>
      </div>
    </div>
  )
}

export default CheckoutPage