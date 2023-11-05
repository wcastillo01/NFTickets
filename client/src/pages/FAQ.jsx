import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqData = [
    {
      question: "¿Qué son los NFTs?",
      answer:
        "Los NFTs, o Tokens No Fungibles, son activos digitales únicos que representan la propiedad o prueba de autenticidad de un objeto o pieza de contenido en la cadena de bloques. ",
    },
    {
      question:
        "¿Cómo puedo estar seguro de que el NFT que estoy comprando es auténtico?",
      answer:
        "Nuestra plataforma utiliza la tecnología blockchain, que garantiza la autenticidad y la propiedad de los NFTs. Cada NFT tiene un registro único en la cadena de bloques que no puede ser alterado, asegurando su legitimidad.",
    },
    {
      question: "¿Es seguro conectar mi billetera?",
      answer:
        "Sí, conectar tu monedero es seguro. Utilizamos protocolos de seguridad estándar para garantizar que tus datos y activos estén protegidos. Sin embargo, siempre debes asegurarte de que estás en el sitio web correcto y no en una página de phishing.",
    },

    {
      question: "¿Qué es una billetera de criptomonedas y por qué lo necesito?",
      answer:
        "Un monedero de criptomonedas es una herramienta digital que te permite almacenar, enviar y recibir criptomonedas y NFTs. Lo necesitas para interactuar con nuestra plataforma y gestionar tus activos digitales.",
    },
    {
      question: "¿En caso de que tenga una duda, que hago?",
      answer: "En este caso puede dirigirse a una pestaña de soporte, y enviarnos un correo con la duda que usted presente.",
    },
  ];

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div
        className="white-glassmorphism w-full max-w-md p-4 rounded-lg border border-gradient-bg-welcome-dark shadow-lg"
        style={{ color: "white", marginTop: "-250px" }}
      >
        <h2 className="text-2xl font-bold mb-8">
          Preguntas Frecuentes
        </h2>
        {faqData.map((item, index) => (
          <div
            key={index}
            className="mb-4 cursor-pointer"
            onClick={() => handleAccordionClick(index)}
          >
            <h3 className="text-lg font-extrabold">{item.question}</h3>
            {activeIndex === index && (
              <p className="mt-2 text-sm font-light text-justify">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;