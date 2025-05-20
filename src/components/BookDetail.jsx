import books from '../data/books.json'
import { useState } from 'react'
import { FaCartPlus } from 'react-icons/fa'
import useCart from "../hooks/cartHook"
import Modal from './Modal'

const BookDetail = ({id}) => {
  const book = books.find((b) => b.id == id);
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="bookdetail">
        <img src={book?.img_url} alt={book?.titulo} />
        <div className="bookdetail__item">
          <p>Titulo: <b>{book?.titulo}</b></p>
          <p>Autor: <b>{book?.autor}</b></p>
          <p>Descripción: <i>{book?.descripcion}</i></p>
          <p>Precio: $ {book?.precio}</p>
          <div className="relative group w-fit flex flex-row">
              Añadir al carrito
              <FaCartPlus     
                  className="pricerow__cart" 
                  onClick={(e) => {
                          e.stopPropagation();
                          addToCart(book);
                          setShowModal(true);
                      }
                  }
              />
              <span className="pricerow__tooltip">Añadir al carrito</span>
          </div>
        </div>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <h2 className="modal__title">¡Libro añadido!</h2>
          <p className="modal__message">El libro <b>{book.titulo}</b> fue añadido al carrito</p>
        </Modal>
    </div>
  )
}

export default BookDetail