import React, { useState } from "react";
import { Link } from "react-router-dom";
import BrujulaLogo from "../assets/brujulalogo.png";
import Modal from "./Modal";
import { TERMS_OF_USE, PRIVACY_POLICY } from "./data/legal";

const Footer = () => {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    content: "",
  });

  const openModal = (title, content) => {
    setModalConfig({
      isOpen: true,
      title,
      content,
    });
  };

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <aside className="flex flex-col items-center">
          <img src={BrujulaLogo} alt="Decide.pe Logo" className="h-22 w-auto" />
          <p>Decide con rumbo</p>
        </aside>
        <nav>
          <h6 className="footer-title">Herramientas</h6>
          <Link to="/quiz" className="link link-hover">
            Quiz Electoral
          </Link>
          <Link to="/comparador" className="link link-hover">
            Comparador
          </Link>
          <Link to="/portal" className="link link-hover">
            Portal de Transparencia
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <button
            onClick={() => openModal("Términos de Uso", TERMS_OF_USE)}
            className="link link-hover"
          >
            Términos de uso
          </button>
          <button
            onClick={() => openModal("Política de Privacidad", PRIVACY_POLICY)}
            className="link link-hover"
          >
            Política de privacidad
          </button>
        </nav>
        <nav>
          <h6 className="footer-title">Contacto</h6>
          <Link to="/nosotros" className="link link-hover">
            Sobre Nosotros
          </Link>
          <a className="link link-hover">Colabora.pe</a>
        </nav>
      </footer>

      {modalConfig.isOpen && (
        <Modal
          title={modalConfig.title}
          content={modalConfig.content}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Footer;
