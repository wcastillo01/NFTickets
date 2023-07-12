import React, { useState } from "react";
import { RiMailLine, RiUserLine, RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineUser, AiOutlineFileText } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    confirmEmail: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    agreedTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // DConnect data
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div
        className="bg-white w-full max-w-md bg-blue-glassmorphism p-6 rounded-lg border shadow-lg"
        style={{ marginTop: "-150px" }}
      >
        <h2 className="text-2xl font-bold mb-8">Crear cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <RiMailLine className="mr-2 text-xl" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded-lg"
              placeholder="Correo electrónico"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <RiMailLine className="mr-2 text-xl" />
            <input
              type="email"
              name="confirmEmail"
              value={formData.confirmEmail}
              onChange={handleChange}
              className="w-full p-2 rounded-lg"
              placeholder="Confirmar correo electrónico"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <RiUserLine className="mr-2 text-xl" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 rounded-lg"
              placeholder="Nombre de usuario"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <AiOutlineUser className="mr-2 text-xl" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 rounded-lg"
              placeholder="Nombre"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <AiOutlineUser className="mr-2 text-xl" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 rounded-lg"
              placeholder="Apellido"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <RiLockPasswordLine className="mr-2 text-xl" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded-lg"
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <RiLockPasswordLine className="mr-2 text-xl" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 rounded-lg"
              placeholder="Confirmar contraseña"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="checkbox"
              name="agreedTerms"
              checked={formData.agreedTerms}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label className="text-sm">Acepto los términos y condiciones</label>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
