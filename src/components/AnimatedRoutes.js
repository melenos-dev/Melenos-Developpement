import { Routes, Route, useLocation } from "react-router-dom/index";
import Home from "../pages/home.js";
import About from "../pages/about.js";
import Appointment from "../pages/appointment.js";
import References from "../pages/references.js";
import Formulas from "../pages/formulas.js";
import Quote from "../pages/quote.js";
import Testimonials from "../pages/testimonials.js";
import Login from "../pages/login.js";
import Signup from "../pages/signup.js";
import RequireAuth from "../components/RequireAuth";
import PersistLogin from "../components/PersistLogin";
import { AnimatePresence } from "framer-motion";
//import { QuoteProvider } from "../utils/context/QuoteContext";

const ROLES = {
  User: 10,
  Admin: 50,
  SuperAdmin: 99,
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence initial={false}>
      <Routes location={location} key={location.pathname}>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/qui-suis-je" element={<About />} />
        <Route path="/references" element={<References />} />
        <Route path="/formules" element={<Formulas />} />
        <Route path="/je-vous-rappelle" element={<Appointment />} />
        <Route path="/devis" element={<Quote />} />
        <Route path="/temoignages" element={<Testimonials />} />

        <Route element={<PersistLogin />}>
          {/* Protected user's routes */}
          <Route
            element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
          ></Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
