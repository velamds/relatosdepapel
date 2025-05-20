const AuthForm = ({ title, children }) => {
    return (
        <div className="auth__container">
            <h2 className="auth__title">{title}</h2>
            {children}
        </div>
    );
};

export default AuthForm;
