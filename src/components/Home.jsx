import { useState, useEffect } from 'react'
import { FaCartPlus } from 'react-icons/fa'
import useCart from "../hooks/cartHook"
import Modal from './Modal'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../config.js'

const Home = () => {
    const { addToCart } = useCart();
    const [showModal, setShowModal] = useState(false);
    const [bookTitle, setBookTitle] = useState("");
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get(`${config.API_CATALOGUE_PATH}`)
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error al obtener libros:', error));
    }, []);

    return (
        <div className="content">
            <ul className="content__list">
            {
                books.map((book, key) =>(
                    <li className="list__book" key={key}>
                        <Link to={`/book/${book.id}`}>
                            <img className="book__image" src={book.img_url} alt=""/>
                            <p className="book__title">{book.titulo}</p>
                            <p>{book.autor}</p>
                        </Link>
                        <div className="book__pricerow">
                            <span className="pricerow__price">${book.precio}</span>
                            <div className="relative group w-fit">
                                <FaCartPlus     
                                    className="pricerow__cart" 
                                    onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(book);
                                            setBookTitle(book.titulo);
                                            setShowModal(true);
                                        }
                                    }
                                />
                                <span className="pricerow__tooltip">Añadir al carrito</span>
                            </div>
                        </div>
                    </li>
                ))
            }
            </ul>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <h2 className="text-xl font-semibold">¡Libro añadido!</h2>
                <p className="text-gray-600">El libro <b>{bookTitle}</b> fue añadido al carrito</p>
            </Modal>
        </div>
    )
}

export default Home