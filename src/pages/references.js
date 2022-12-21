import "../css/pages/references.scss";
import { motion } from "framer-motion";

export default function References() {
  return (
    <motion.div
      className="references page d-flex align-items-center flex-wrap justify-content-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Références</h1>
    </motion.div>
  );
}
