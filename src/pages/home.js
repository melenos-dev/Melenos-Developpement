import "../css/pages/home.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom/index";
import Melenos from "../img/melenos.png";

export default function Home() {
  return (
    <motion.div
      className="home page d-flex align-items-center flex-wrap justify-content-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="whoIsHe d-flex align-items-center">
        <img src={Melenos} alt="Web Développeur" />
        <div className="whoIsHe__why">
          <h1>Réaliser les projets d'un nouveau monde</h1>
          <p>
            Au délà du web, je souhaite participer à l'
            <b>éclosion de projets éthiques</b>.
            <span className="mt-2 mb-2 d-block">
              Et si tu le souhaites, j'adorerai aussi être acteur de la
              <b> réalisation de tes rêves</b>.
            </span>
            Pour cela je prendrai aussi le <b>rôle de conseillé, de coach.</b>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
