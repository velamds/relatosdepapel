import React, { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    alert("Mensaje enviado con éxito");
    setFormData({ name: "", email: "", message: "" });
  };
  return (
    <div className="contact">
        <form onSubmit={handleSubmit} className="contact__form">
          <h2 className="form__title">Contáctanos</h2>
          <div>
            <label htmlFor="name" className="form__label">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="form__input"
            />
          </div>

          <div>
            <label htmlFor="email" className="form__label">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="form__input"
            />
          </div>

          <div>
            <label htmlFor="message" className="form__label">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              className="form__input"
            ></textarea>
          </div>

          <button
            type="submit"
            className="form__button"
          >
            Enviar
          </button>
      </form>
    </div>
  )
}

export default Contact