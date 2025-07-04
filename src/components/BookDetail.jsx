import books from '../data/books.json'
import { useState , useEffect} from 'react'
import { FaCartPlus } from 'react-icons/fa'
import useCart from "../hooks/cartHook"
import Modal from './Modal'
import config from '../config.js'
import axios from 'axios'

const BookDetail = ({id}) => {
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`${config.API_BASE_URL}/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error('Error al obtener el libro:', error));
  }, [id]);

  if (!book) return <div>Cargando...</div>;

  return (
    <div className="bookdetail">
        <img src={book?.image} alt={book?.title} />
        <div className="bookdetail__item">
          <p>Titulo: <b>{book?.title}</b></p>
          <p>Autor: <b>{book?.author}</b></p>
          <p>Descripción: <i>{book?.descripcion}</i></p>
          <p>Precio: $ {book?.price}</p>
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
          <p className="modal__message">El libro <b>{book.title}</b> fue añadido al carrito</p>
        </Modal>
    </div>
  )
}

export default BookDetail