import React from "react";
import { Link } from "react-router-dom";
import BrujulaLogo from "../assets/brujulalogo.png";
const Footer = () => {
  return (
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
        <a className="link link-hover">Términos de uso</a>
        <a className="link link-hover">Política de privacidad</a>
      </nav>
      <nav>
        <h6 className="footer-title">Contacto</h6>
        <Link to="/nosotros" className="link link-hover">
          Sobre Nosotros
        </Link>
        <a className="link link-hover">Colabora.pe</a>
      </nav>
    </footer>
  );
};

export default Footer;
