import "../css/pages/about.scss";
import { motion } from "framer-motion";
import { Link } from "react-router-dom/index";
export default function About() {
  return (
    <motion.div
      className="about page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/" className="item">
        Home
      </Link>
    </motion.div>
  );
}
