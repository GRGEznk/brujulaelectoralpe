import React from "react";
import { Link } from "react-router-dom";
import { Brain, Scale, ChartNoAxesCombined } from "lucide-react";
import ImgBanner from "../../assets/hero-banner.png";
import ImgPortal from "../../assets/home-portal.png";
import Card from "../../components/Card.jsx";

const METRICS = [
  { value: "50,000+", label: "Quizzes completados" },
  { value: "10,000+", label: "Votantes informados" },
  { value: "20", label: "Partidos analizados" },
];

const COMPARISON_ROWS = [
  {
    topic: "Educación",
    a: "Becas y univ. públicas",
    b: "Infraestructura rural",
    c: "Evaluación docente",
  },
  {
    topic: "Salud",
    a: "Clínicas móviles",
    b: "Historias digitales",
    c: "Atención gratuita",
  },
  {
    topic: "Economía",
    a: "Incentivos MYPES",
    b: "Reducción impuestos",
    c: "Inversión infra.",
  },
  {
    topic: "Seguridad",
    a: "Más comisarías",
    b: "Patrullaje",
    c: "Prevención delito",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full overflow-hidden">
      <section className="w-full bg-fondos py-8 px-4 flex justify-center">
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12 p-8 md:p-16">
          <div className="flex-1 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-negro font-argentum mb-4">
              Descubre qué candidato piensa como tú
            </h1>
            <img
              src={ImgBanner}
              alt="Ilustración cívica"
              className="block md:hidden w-full max-w-[360px] my-8"
            />
            <p className="text-lg text-negro font-argentum mb-8">
              Compara ideas, responde preguntas y vota informado para las
              elecciones 2026
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                to="/quiz"
                className="btn bg-red text-white border-none hover:bg-red-700 font-argentum"
              >
                Hacer el quiz electoral
              </Link>
              <Link
                to="/comparador"
                className="btn btn-outline border-2 border-blue text-blue hover:bg-blue hover:text-white font-argentum"
              >
                Comparar Partidos
              </Link>
            </div>
          </div>
          <div className="hidden md:block shrink-0">
            <img
              src={ImgBanner}
              alt="Ilustración cívica"
              className="w-full max-w-[400px]"
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-negro font-argentum">
          ¿Cómo funciona Brújula Electoral?
        </h2>
        <p className="mt-2 mb-12 text-negro font-argentum">
          Te ayudamos a tomar una decisión informada en 3 pasos simples
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-6xl mx-auto">
          <Card
            ico={<Brain size={80} className="text-blue" />}
            titulo="Responde el Quiz Electoral"
            texto="Preguntas rápidas sobre temas nacionales clave"
          />
          <Card
            ico={<ChartNoAxesCombined size={80} className="text-blue" />}
            titulo="Conoce tus afinidades"
            texto="Descubre qué candidatos comparten tus ideas"
          />
          <Card
            ico={<Scale size={80} className="text-blue" />}
            titulo="Compara las propuestas"
            texto="Analiza las plataformas de los candidatos en temas que te importan"
          />
        </div>
      </section>

      <section className="w-full bg-red py-20 px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          ¿Listo para votar informado?
        </h2>
        <p className="mb-8 font-argentum max-w-2xl mx-auto">
          Toma el quiz electoral y descubre qué candidato se alinea más con tus
          ideas.
        </p>
        <Link
          to="/quiz"
          className="btn bg-white text-red border-none hover:bg-gray-100 font-argentum px-8"
        >
          Hacer el quiz electoral
        </Link>
      </section>

      <section className="w-full bg-fondos py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-negro font-argentum">
          Compara propuestas en segundos
        </h2>
        <p className="mt-2 mb-12 text-negro font-argentum">
          Analiza las propuestas de los partidos y candidatos para tomar una
          decisión informada
        </p>
        <div className="overflow-x-auto w-full max-w-4xl mx-auto mb-10 shadow-xl rounded-xl bg-white">
          <table className="table w-full text-center">
            <thead className="bg-cards text-red font-argentum text-base">
              <tr>
                <th>Eje temático</th>
                <th>Partido A</th>
                <th>Partido B</th>
                <th>Partido C</th>
              </tr>
            </thead>
            <tbody className="font-argentum font-light">
              {COMPARISON_ROWS.map((row, index) => (
                <tr key={index} className="hover">
                  <td className="font-bold text-blue text-right">
                    {row.topic}
                  </td>
                  <td>{row.a}</td>
                  <td>{row.b}</td>
                  <td>{row.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link
          to="/comparador"
          className="btn btn-outline border-2 border-blue text-blue hover:bg-blue hover:text-white font-argentum rounded-2xl"
        >
          Comparar Partidos
        </Link>
      </section>

      <section className="w-full bg-cards py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
          {METRICS.map((metric, index) => (
            <div key={index}>
              <h3 className="text-4xl font-bold text-red font-argentum mb-2">
                {metric.value}
              </h3>
              <p className="text-negro font-argentum">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full bg-negro text-white min-h-screen flex flex-col justify-center py-12 px-4 md:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold font-argentum text-center mb-12">
            Portal de Transparencia
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <img
              src={ImgPortal}
              alt="Portal transparencia"
              className="w-full max-w-md mx-auto"
              loading="lazy"
            />
            <div className="flex-1 text-center md:text-left">
              <p className="text-lg md:text-xl font-argentum leading-relaxed opacity-90">
                Accede a datos abiertos sobre financiamiento de campañas,
                historial de votaciones y más. Promovemos la transparencia
                electoral para fortalecer la democracia.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center opacity-70 text-sm font-argentum">
            <p>
              Todos los datos provienen del{" "}
              <a
                href="https://portal.jne.gob.pe/portal"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-300 transition-colors"
              >
                Jurado Nacional de Elecciones (JNE)
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
