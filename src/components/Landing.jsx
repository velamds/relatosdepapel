import { useEffect,useState } from 'react'
import { Link,useNavigate  } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate();
  const [cuenta, setCuenta] = useState(5);

  useEffect(() => {
    if (cuenta === 0) {
        navigate("/login");
        return;
    }
    const timer = setTimeout(() => {
        setCuenta((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate, cuenta]);
  
  return (
    <div className="landing">
        <section className="landing__content">
          <Link to='/login'>
            <h1 className="content__title">
              Bienvenido a Relatos de papel
            </h1>
            <p className="content__subtitle">
              Tienda de libros
            </p>
            <p className="text-lg text-gray-500">
                Redirigiendo al login en <span className="font-semibold">{cuenta}</span> segundos...
            </p>
          </Link>
        </section>
    </div>
  )
}

export default Landing