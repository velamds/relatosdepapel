import LoginForm from '../../components/Auth/LoginForm';

const LoginPage = () => {
    return (
        <div className="content__auth">
            <div className="auth__wrapper">
                <div className="auth__image"></div>
                <div className="auth__formcontainer">
                    <div className="auth__box">
                        <h2 className="auth__title">Iniciar sesión</h2>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
