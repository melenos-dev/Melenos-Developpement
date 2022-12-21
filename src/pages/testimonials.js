import "../css/pages/testimonials.scss";
import { motion } from "framer-motion";

export default function Testimonials() {
  return (
    <motion.div
      className="testimonials page d-flex align-items-center flex-wrap justify-content-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Témoignages</h1>
    </motion.div>
  );
}
