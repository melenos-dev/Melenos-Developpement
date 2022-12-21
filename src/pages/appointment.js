//import "../css/pages/appointment.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom/index";
export default function Appointment() {
  return (
    <motion.div
      className="appointment page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Appointment</h2>
    </motion.div>
  );
}
