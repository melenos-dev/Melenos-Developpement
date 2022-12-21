import "../css/pages/formulas.scss";
import { motion } from "framer-motion";

export default function Formulas() {
  return (
    <motion.div
      className="formulas page d-flex align-items-center flex-wrap justify-content-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Formules</h1>
    </motion.div>
  );
}
