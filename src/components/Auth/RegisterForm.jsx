import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
const RegisterForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !password.trim()) {
            setError("Todos los campos son requeridos");
            return;
        }
        setError("");
        navigate("/home");
    }
    return (
        <form onSubmit={handleRegister}>
            <input 
                type="text" 
                placeholder="Nombre" 
                className="auth__input" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            <input 
                type="email" 
                placeholder="Email"
                className="auth__input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Contraseña" 
                className="auth__input" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="auth__button">Crear una cuenta</button>
            {error && <p className="auth__error">{error}</p>}
            <div className="auth__link">
                <Link to='/login' className="link__purple">Volver al login</Link>
            </div>
        </form>
    );
};

export default RegisterForm;
