import { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import useMeasure from "react-use-measure";
import { FontAwesomeIcon } from "../../node_modules/@fortawesome/react-fontawesome/index";
import { useFetch } from "../hooks/useFetch";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Quiz({ data, quizId, from }) {
  let [step, setStep] = useState("");
  const [question, setQuestion] = useState("");
  const [replies, setReplies] = useState({});
  const [enter, setEnter] = useState(false);
  const [answersText, setAnswersText] = useState({});
  const [text, setText] = useState({});
  const [toolTipShow, setToolTipShow] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState("");
  const [getInfos, setGetInfos] = useState(false);

  const [{ isLoading, fetchResponse, error }, fetchData] = useFetch();

  const controls = useAnimation();

  const quizIndex = data.findIndex((quiz) => quiz._id === quizId);

  step = step === "" ? 1 : step;

  const dataStepIndex = step - 1; // If we are in step 1, we want to read the 0 index of quiz.steps[]

  const questionIndex = question === "" ? 0 : question;

  const quiz = data[quizIndex];

  const quizStep = quiz.steps[dataStepIndex];

  const navigate = useNavigate();

  if (replies.length !== 0)
    window.onbeforeunload = function (e) {
      // Est ce une bonne idée de checker toute les state du site web d'un seul coup pour mettre ce code à sa racine  ?
      return "Don't leave";
    };

  function storeReplies() {
    const formData = new FormData();
    formData.append("answers", JSON.stringify(replies));
    formData.append("quiz_id", quizId);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("file", file);
    fetchData("api/quote/quiz/storeReplies", formData);
  }

  const saveReplies = (newReply) => {
    setReplies((previousReplies) => ({
      ...previousReplies,
      ...newReply,
    }));
  };

  function saveReply(question_id, answerOption) {
    controls.start("next");
    saveReplies({ [question_id]: answerOption.text });

    if (answerOption.option === "redirect")
      return navigate("/je-vous-rappelle");

    quizStep.replies[questionIndex + 1] === undefined // No more question in this step ? Go to next step or get contact infos
      ? quiz.steps[step] === undefined
        ? setGetInfos(true)
        : changeStep(step + 1)
      : setQuestion(questionIndex + 1);
  }

  function changeStep(next, previousQuestion = false) {
    setStep(next);
    setQuestion(previousQuestion ? quiz.steps[next - 1].replies.length - 1 : 0); // Change come from the back button ? Recover the last questionIndex of the previous step (j'aurai aimé que const quizStep soit à jour juste apres la fonction setStep et éviter de devoir faire le calcul ici)
  }

  function previousQuestion(next) {
    setToolTipShow({});
    controls.start("next");
    quizStep.replies[next] === undefined // No more question in this step ? Go to previous step
      ? changeStep(step - 1, true)
      : setQuestion(next);
  }

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (enter) {
        controls.start("hideEnter");
        setEnter(false);
      }
      setText({ value: undefined });
      saveReply(quizStep.replies[questionIndex]._id, {
        text: event.target.value,
      });
    }
  };

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  useEffect(() => {
    if (enter) controls.start("showEnter");
  }, [enter]);

  useEffect(() => {
    if (text.value !== undefined) {
      setAnswersText((previousTexts) => ({
        ...previousTexts,
        [text.name]: text.value,
      }));

      if (text.value.length === 1) setEnter(true);
    }
  }, [text]);

  const moveCaretAtEnd = (e) => {
    let temp_value = e.target.value;
    e.target.value = "";
    e.target.value = temp_value;
  };

  let [quizRef, { height, width }] = useMeasure();

  const animate = from
    ? {
        height: [from.height, height],
        width: [from.width, width],
      }
    : {
        opacity: [0, 1],
        height: height || "auto",
        width: width || "auto",
      };
  const exit = enter ? "hideEnter" : "";

  const toolTipHover = (event, index) => {
    setToolTipShow((previousToolTip) => {
      return {
        ...previousToolTip,
        [index]: true,
      };
    });
  };

  const toolTipOut = (event, index) => {
    setToolTipShow((previousToolTip) => {
      return {
        ...previousToolTip,
        [index]: false,
      };
    });
  };

  if (error) return "Oups erreur";

  return (
    <>
      <AnimatePresence>
        {quizStep.replies[questionIndex].answerOptions[0].text ===
          "textarea" && (
          <motion.div
            id="pressEnter"
            variants={keyVariants}
            animate={controls}
            exit={exit}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 394.24 394.24">
              <defs></defs>
              <g id="Calque_2" data-name="Calque 2">
                <g id="Calque_1-2" data-name="Calque 1">
                  <path
                    className="around"
                    d="M157.36,5.6H321.44a67.4,67.4,0,0,1,67.2,67.2V321.44a67.4,67.4,0,0,1-67.2,67.2H72.81a67.39,67.39,0,0,1-67.2-67.2V166.32"
                  />
                  <path
                    className="around"
                    d="M157.36,5.6v93a67.4,67.4,0,0,1-67.2,67.2H5.6"
                  />
                  <path
                    className="arrow"
                    d="M272.72,117v93a67.4,67.4,0,0,1-67.2,67.2h-84"
                  />
                  <path className="arrow" d="M121.52,277.2l30.8-30.8" />
                  <path className="arrow-line" d="M152.32,308l-30.8-30.8" />
                </g>
              </g>
            </svg>
            <p>Press Enter</p>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="quote__Quiz overflow-hidden"
        ref={quizRef}
        animate={animate}
      >
        <div ref={quizRef}>
          <motion.section variants={variants} animate={controls}>
            {!getInfos ? (
              <div>
                <h2>{quizStep.stepTitle}</h2>
                <span className="subTitle mb-2">
                  {quizStep.replies[questionIndex].question}
                </span>
                <div className="d-flex flex-row justify-content-between">
                  {quizStep.replies[questionIndex].answerOptions.map(
                    (answerOption, index) =>
                      answerOption.text !== "textarea" ? (
                        <Button
                          key={`button${index}`}
                          onMouseEnter={(e) => toolTipHover(e, index)}
                          onMouseLeave={(e) => toolTipOut(e, index)}
                          onClick={() =>
                            saveReply(
                              quizStep.replies[questionIndex]._id,
                              answerOption
                            )
                          }
                          className={answerOption.helper ? "tool" : ""}
                          isSelected={
                            replies[quizStep.replies[questionIndex]._id] ===
                            answerOption.text
                              ? 1
                              : 0
                          }
                        >
                          {answerOption.text}
                          {toolTipShow[index] && answerOption.helper && (
                            <motion.span
                              key={`toolTip${index}`}
                              className="toolTip"
                              animate={{ opacity: [0, 1], y: [-10, 1] }}
                              transition={{ delay: 1, duration: 1.3 }}
                            >
                              {answerOption.helper}
                            </motion.span>
                          )}
                        </Button>
                      ) : (
                        <textarea
                          key={quizStep.replies[questionIndex]._id}
                          name={`answerText${quizStep.replies[questionIndex]._id}`}
                          autoFocus
                          onFocus={moveCaretAtEnd}
                          onChange={(e) =>
                            setText({
                              name: e.target.name,
                              value: e.target.value,
                            })
                          }
                          onKeyDown={keyDownHandler}
                          value={
                            answersText[
                              `answerText${quizStep.replies[questionIndex]._id}`
                            ] || ""
                          }
                          placeholder={answerOption.helper}
                        ></textarea>
                      )
                  )}
                </div>
                <FontAwesomeIcon
                  className={`quote__Quiz__Previous ${
                    step > 1 || questionIndex > 0 ? "" : "disabled"
                  }`}
                  onClick={() => previousQuestion(questionIndex - 1)}
                  icon="fa-solid fa-circle-left"
                />
              </div>
            ) : (
              <div className="d-flex flex-column">
                <h2>Nous y sommes !</h2>
                <span className="d-block mb-2">Pour vous répondre...</span>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Nom, prénom"
                  autoFocus
                />

                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="E-mail"
                />

                <input
                  type="text"
                  name="phone"
                  id="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  placeholder="Téléphone"
                />

                <span className="d-block mb-2">
                  Un fichier supplémentaire à m'envoyer ?
                </span>

                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={handleChange}
                />

                <Button onClick={storeReplies}>Envoyer mes réponses</Button>
              </div>
            )}
            <div>
              <div className="quote__Quiz__Steps">
                {quiz.steps.map((test, index) => (
                  <span
                    key={`step${index}`}
                    className={step === index + 1 ? "current" : ""}
                  >
                    {index + 1}
                  </span>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </>
  );
}

export const variants = {
  next: {
    opacity: [0, 1],
    y: ["-4%", "0%"],

    transition: {
      duration: 0.5,
    },
  },
};

export const keyVariants = {
  showEnter: {
    y: [50, -30, 0],
    x: [-50, 0],
    opacity: [0, 1],
    transition: {
      duration: 0.2,
    },
  },
  hideEnter: {
    y: [0, -30, 50],
    x: [0, -50],
    opacity: [1, 1, 0],
    transition: {
      duration: 0.2,
    },
  },
};

export default Quiz;
