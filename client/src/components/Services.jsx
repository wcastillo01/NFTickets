import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const ServiceCard = ({ color, title, icon, subtitle }) => {
  return (
    <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
      <div
        className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
      >
        {icon}
      </div>
      <div className="ml-5 flex flex-col flex-1">
        <h3 className="mt-2 text-white text-lg">{title}</h3>
        <p className="mt-1 text-white text-sm md:w-9/12">{subtitle}</p>
      </div>
    </div>
  );
};

const Services = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`flex w-full justify-center items-center gradient-bg-services-${theme}`}
    >
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 font-bold ">
            Servicios que
            <br />
            seguimos mejorando
          </h1>
          <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
            Explora la vanguardia de eventos con NFTickets. Continuamos
            innovando en accesibilidad y ofertas exclusivas, asegurando que tu
            experiencia sea segura, única y memorable.
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-start items-center">
          <ServiceCard
            color="bg-[#2952E3]"
            title="Seguridad garantizada"
            icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
            subtitle="Compra segura de tickets NFTs en blockchain. Autenticidad y exclusividad en cada entrada donde Protegemos tu inversión con la mejor tecnología."
            style={{ width: "300px" }}
          />
          <ServiceCard
            color="bg-[#8945F8]"
            title="Mejores transacciones"
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle="Adquiere tickets NFTs rápidamente, con una transacción segura, sin esperas y entradas garantizadas para eventos deportivos, conciertos, y más."
            style={{ width: "300px" }}
          />
          <ServiceCard
            color="bg-[#F84550]"
            title="Vive mejores experiencias"
            icon={<RiHeart2Fill fontSize={21} className="text-white" />}
            subtitle="Accede a eventos inolvidables con NFTickets. Cada compra eleva tu mundo de entretenimiento a un nivel superior. Calidad y satisfacción en cada evento."
            style={{ width: "300px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Services;