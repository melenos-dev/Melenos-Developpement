import { createContext, useState } from "react";
export const QuoteContext = createContext();

export const QuoteProvider = ({ children }) => {
  const [answers, setAnswers] = useState({});

  const saveAnswers = (newAnswers) => {
    setAnswers({ ...answers, ...newAnswers });
  };

  return (
    <QuoteContext.Provider value={{ answers, saveAnswers }}>
      {children}
    </QuoteContext.Provider>
  );
};
