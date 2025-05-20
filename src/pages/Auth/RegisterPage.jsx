import RegisterForm from '../../components/Auth/RegisterForm';

const RegisterPage = () => {
    return (
        <div className="content__auth">
            <div className="auth__wrapper">
                <div className="auth__image"></div>
                <div className="auth__formcontainer">
                    <div className="auth__box">
                        <h2 className="auth__title">Crear una cuenta</h2>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
