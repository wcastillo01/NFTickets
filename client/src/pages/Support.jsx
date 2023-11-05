import React, { useState } from "react";

const Support = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para enviar el mensaje de soporte
    console.log("Correo:", email);
    console.log("Mensaje:", message);
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div
        className="white-glassmorphism w-full max-w-xl bg-blue-glassmorphism p-4 rounded-lg border border-gradient-bg-welcome-dark shadow-lg"
        style={{marginTop: "-250px" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Escríbenos</h2>
          <div className="text-right">
            <h3 className="text-xl font-bold text-white">Contacto</h3>
            <p className="text-sm text-white">info@nftickets.com</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2 text-sm mt-2"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <textarea
            className="w-full h-32 bg-gray-100 border border-gray-300 rounded-lg p-2 text-sm mt-2"
            placeholder="Escribe tu mensaje..."
            value={message}
            onChange={handleMessageChange}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-2 mt-4 rounded-lg hover:bg-blue-600"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
};

export default Support;
