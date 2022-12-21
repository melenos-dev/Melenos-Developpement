import "../css/pages/quote.scss";
import "../css/components/popup.scss";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Modal from "../components/Modal/index";

export default function Quote() {
  const [openModal, setOpenModal] = useState(false);

  const close = () => {
    /*window.confirm(
      "Les changements que vous avez effectué ne seront pas enregistrés."
    ) && */ setOpenModal(false);
  };
  const open = () => setOpenModal(true);

  return (
    <motion.div
      className="page d-flex flex-wrap align-items-center justify-content-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="quote">
        <h1>Pour rédiger un devis...</h1>
        <p>
          J'ai besoin de quelques informations sur tes besoins !<br />
          Si tu préfères tu peux carrément me contacter au
          <b> 07 49 78 13 66 </b>
          et on en parle directement, mais dans la majorité des cas, remplir un
          petit questionnaire avant le 1er contact téléphonique nous fera gagner
          beaucoup de temps. A toi de voir ;)
        </p>
        <button onClick={() => (openModal ? close() : open())}>
          Ouvrir le questionnaire
        </button>

        <AnimatePresence
          initial={false}
          mode="wait"
          onExitComplete={() => null}
        >
          {openModal && <Modal openModal={openModal} handleClose={close} />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
