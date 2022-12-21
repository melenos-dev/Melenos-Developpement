import "../../css/components/backdrop.scss";
import { useFetch } from "../../hooks/useFetch";
import Quiz from "../Quiz";
import Backdrop from "../Backdrop";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";
import useMeasure from "react-use-measure";
import { FontAwesomeIcon } from "../../../node_modules/@fortawesome/react-fontawesome/index";

const dropIn = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 1500,
      damping: 25,
      duration: 0.1,
    },
  },
  exit: { y: "100vh", opacity: 0 },
};

export default function Modal({ handleClose, text }) {
  const [{ isLoading, fetchResponse, error }, fetchData] =
    useFetch("api/quote/quiz");

  const [quizId, setQuizId] = useState(0);
  let [quizRef, { height, width }] = useMeasure();

  if (error) {
    return <span>Oups il y a eu un problème</span>;
  }

  const ref = height !== 0 ? { height: height, width: width } : false;

  return (
    <>
      <Backdrop key={"quizModal"}>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="popup"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            onClick={handleClose}
            whileHover={{ scale: 1.2, rotate: "90deg" }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
            className="popup__close"
          >
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </motion.div>
          <AnimatePresence initial={false} mode="wait">
            {!isLoading ? (
              quizId !== 0 ? (
                <Quiz
                  key={"quiz"}
                  data={fetchResponse}
                  quizId={quizId}
                  from={ref}
                />
              ) : (
                <motion.div
                  key={"quizChoose"}
                  exit={{
                    opacity: 0,
                  }}
                  ref={quizRef}
                >
                  <div className="px-4 py-4">
                    <h2>Demande de devis (~ 5 / 10 mn max)</h2>
                    <span className="subTitle">Cette demande concerne :</span>
                    <div className="d-flex justify-content-center">
                      <Button
                        css="margin-right:1.3em"
                        onClick={() => setQuizId(2)}
                      >
                        Un site existant
                      </Button>

                      <Button onClick={() => setQuizId(1)}>
                        Un nouveau site
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )
            ) : (
              "Loading..."
            )}
          </AnimatePresence>
        </motion.div>
      </Backdrop>
    </>
  );
}
