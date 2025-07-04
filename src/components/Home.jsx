import { useState, useEffect } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import useCart from "../hooks/cartHook";
import Modal from './Modal';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config.js';

const Home = () => {
    const { addToCart } = useCart();
    const [showModal, setShowModal] = useState(false);
    const [bookTitle, setBookTitle] = useState("");
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalBooks, setTotalBooks] = useState(0);
    const [loading, setLoading] = useState(false);
    const [facets, setFacets] = useState({}); // Estado para almacenar las facetas
    const [selectedFilters, setSelectedFilters] = useState({}); // Estado para los filtros seleccionados

    const fetchBooks = async (page = 1, loadMore = false, filters = selectedFilters) => {
        setLoading(true);
        try {
            const params = {
                page: page,
                limit: 10,
                ...filters // Añadir filtros a los parámetros de la solicitud
            };
            const response = await axios.get(`${config.API_SEARCH_PATH}/books`, { params });

            // Suponemos que la respuesta de Elasticsearch tiene un formato como:
            // { data: [libros], total: numeroTotalDeLibros, facets: {facetName: [{key: value, doc_count: count}]}}
            setBooks(prevBooks => loadMore ? [...prevBooks, ...response.data.data] : response.data.data);
            setTotalBooks(response.data.total);
            setFacets(response.data.facets || {}); // Guardar las facetas recibidas
            setCurrentPage(page);
        } catch (error) {
            console.error('Error al obtener libros de Elasticsearch:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks(1, false, selectedFilters); // Cargar la primera página con filtros actuales
    }, [selectedFilters]); // Recargar libros cuando cambian los filtros

    const handleLoadMore = () => {
        if (books.length < totalBooks) {
            fetchBooks(currentPage + 1, true, selectedFilters);
        }
    };

    const handleFilterChange = (facetName, value) => {
        setSelectedFilters(prevFilters => {
            const updatedFilters = { ...prevFilters };
            if (updatedFilters[facetName] && updatedFilters[facetName].includes(value)) {
                // Si el valor ya está seleccionado, quitarlo (deseleccionar)
                updatedFilters[facetName] = updatedFilters[facetName].filter(item => item !== value);
                if (updatedFilters[facetName].length === 0) {
                    delete updatedFilters[facetName]; // Eliminar el filtro si no quedan valores
                }
            } else {
                // Si el valor no está seleccionado, añadirlo
                updatedFilters[facetName] = [...(updatedFilters[facetName] || []), value];
            }
            return updatedFilters;
        });
        // No es necesario llamar a fetchBooks aquí directamente, el useEffect [selectedFilters] lo hará.
    };

    // Función para renderizar los filtros de facetas
    const renderFacets = () => {
        return Object.keys(facets).map(facetName => (
            <div key={facetName} className="facet-filter">
                <h3 className="facet-title">{facetName.replace(/_/g, ' ').toUpperCase()}</h3>
                <ul className="facet-options">
                    {facets[facetName].map(option => (
                        <li key={option.key} className="facet-option">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedFilters[facetName]?.includes(option.key) || false}
                                    onChange={() => handleFilterChange(facetName, option.key)}
                                />
                                {option.key} ({option.doc_count})
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        ));
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-6">
                <aside className="w-full md:w-1/4 p-5 border rounded-lg shadow-lg bg-white">
                    <h2 className="text-2xl font-bold mb-6 text-purple-700">Filtros</h2>
                    { Object.keys(facets).length > 0 ? renderFacets() : <p className="text-gray-500">No hay filtros disponibles.</p>}
                </aside>
                <main className="w-full md:w-3/4">
                    {loading && books.length === 0 && (
                        <div className="flex justify-center items-center h-64">
                            <p className="text-purple-600 text-xl">Cargando libros...</p> {/* Spinner o animación podría ir aquí */}
                        </div>
                    )}
                    {!loading && books.length === 0 && (
                         <div className="text-center py-10 px-4">
                            <p className="text-xl text-gray-700 mb-2">
                                {Object.keys(selectedFilters).length > 0
                                    ? "No se encontraron libros con los filtros seleccionados."
                                    : "No hay libros disponibles en este momento."
                                }
                            </p>
                            {Object.keys(selectedFilters).length > 0 && (
                                <button
                                    onClick={() => setSelectedFilters({})}
                                    className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                                >
                                    Limpiar filtros
                                </button>
                            )}
                        </div>
                    )}
                    {books.length > 0 && (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {
                            books.map((book, key) =>(
                                <li className="list__book flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl" key={book.id || key}>
                                    <Link to={`/books/${book.id}`} className="flex flex-col h-full">
                                        <img className="book__image w-full h-64 object-cover" src={book.image || 'public/images/portadalibro.png'} alt={book.title}/>
                                        <div className="p-4 flex flex-col flex-grow">
                                            <p className="book__title text-lg font-semibold text-purple-800 mb-1 truncate">{book.title}</p>
                                            <p className="text-sm text-gray-600 mb-2 flex-grow">{book.author}</p>
                                            <div className="book__pricerow mt-auto flex justify-between items-center">
                                                <span className="pricerow__price text-xl font-bold text-purple-700">${book.price}</span>
                                                <div className="relative group">
                                                    <FaCartPlus
                                                        className="pricerow__cart text-2xl text-purple-600 hover:text-purple-800 transition-colors cursor-pointer"
                                                        onClick={(e) => {
                                                                e.preventDefault(); // Prevenir navegación
                                                                e.stopPropagation();
                                                                addToCart(book);
                                                                setBookTitle(book.title);
                                                                setShowModal(true);
                                                            }
                                                        }
                                                    />
                                                    <span className="pricerow__tooltip absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">Añadir al carrito</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        }
                        </ul>
                    )}
                    {loading && books.length > 0 && (
                        <p className="text-center my-6 text-purple-600">Cargando más libros...</p>
                    )}
                    {!loading && books.length > 0 && books.length < totalBooks && (
                        <div className="text-center my-6">
                            <button
                                onClick={handleLoadMore}
                                className="load-more-button bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
                            >
                                Cargar más libros
                            </button>
                        </div>
                    )}
                </main>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <h2 className="text-2xl font-semibold text-purple-700 mb-3">¡Libro añadido!</h2>
                <p className="text-gray-700">El libro <b className="text-purple-600">{bookTitle}</b> fue añadido al carrito.</p>
            </Modal>
        </div>
    )
}

export default Home;