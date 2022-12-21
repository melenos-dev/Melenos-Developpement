const {
  faYenSign,
} = require("../../node_modules/@fortawesome/free-solid-svg-icons/index");
const QuizReplies = require("../models/QuizReplies");

// Get the quiz data
exports.quoteQuiz = (req, res, next) => {
  return res.send([
    {
      _id: 1,
      name: "Formulaire pour nouveau site",
      steps: [
        {
          _id: 1,
          stepTitle: "Dans les grandes lignes",
          replies: [
            {
              _id: 1,
              question: "Il s'agit d'un site :",
              answerOptions: [
                {
                  text: "Vitrine",
                  helper: "Présenter une activité",
                },

                {
                  text: "E-commerce",
                  helper: "Vente en ligne",
                },

                {
                  text: "Full codage",
                  helper: "Application complexe",
                  option: "redirect",
                },
              ],
            },
          ],
        },
        {
          _id: 2,
          stepTitle: "Côté développement",
          replies: [
            {
              _id: 2,
              question: "Pages du futur site :",
              answerOptions: [
                {
                  text: "textarea",
                  helper: "Accueil, contact, mes prestations...",
                },
              ],
            },
            {
              _id: 3,
              question: "Liste des fonctions nécéssaires :",
              answerOptions: [
                {
                  text: "textarea",
                  helper:
                    "Newsletter, calendrier, gestion d'articles de blog...",
                },
              ],
            },

            {
              _id: 4,
              question: "Les mots clés que je veux référencer sur google :",
              answerOptions: [
                {
                  text: "textarea",
                  helper: "Vente de bracelets dans le 44...",
                },
              ],
            },
          ],
        },
        {
          _id: 3,
          stepTitle: "Côté graphique",
          replies: [
            {
              _id: 5,
              question: "Besoin d'un logo ?",
              answerOptions: [
                {
                  text: "Oui",
                },

                {
                  text: "Non",
                },
              ],
            },

            {
              _id: 6,
              question: "D'une charte graphique ?",
              answerOptions: [
                {
                  text: "Oui",
                },

                {
                  text: "Non",
                },
              ],
            },
          ],
        },
        {
          _id: 4,
          stepTitle: "Essence de ce projet",
          replies: [
            {
              _id: 7,
              question: "Date de mise en ligne prévue :",
              answerOptions: [
                {
                  text: "textarea",
                },
              ],
            },

            {
              _id: 8,
              question: "Quelques mots pour représenter ses valeurs",
              answerOptions: [
                {
                  text: "textarea",
                  helper:
                    "Ces mots vont me servir à optimiser encore un peu plus votre réferencement, mais cela va aussi m'inspirer, m'aider à entrer dans votre tête et votre coeur, pour donner la meilleure image possible de votre projet.",
                },
              ],
            },

            {
              _id: 9,
              question: "Quel est votre budjet ?",
              answerOptions: [
                {
                  text: "textarea",
                  helper:
                    "Il y a tellement de possibilités de développement, que dans la majorité des cas, on arrive à trouver celle qui s'accorde à vos ressources.",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      _id: 2,
      name: "Formulaire pour site existant",
      steps: [
        {
          _id: 5,
          stepTitle: "Dans les grandes lignes",
          replies: [
            {
              _id: 1,
              question: "Il s'agit d'un site :",
              answerOptions: [
                {
                  text: "Vitrine",
                  helper: "Présenter une activité",
                },

                {
                  text: "E-commerce",
                  helper: "Vente en ligne",
                },

                {
                  text: "Full codage",
                  helper: "Application complexe",
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
};

// Get all quiz
exports.getAllQuiz = (req, res, next) => {
  QuizReplies.find({})
    .then((quotes) => {
      return res.status(200).json(quotes);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Get one quiz by params.id
exports.getQuizById = (req, res, next) => {
  QuizReplies.findOne({ _id: req.params.id })
    .then((quote) => res.status(200).json(quote))
    .catch((error) => res.status(404).json({ error }));
};

// Store quiz replies
exports.quoteQuizStoreReplies = (req, res, next) => {
  const repliesObject = Object.assign({}, req.body);

  let fileName = req.file !== undefined ? req.file.filename : "";

  QuizReplies.query()
    .insert({
      ...repliesObject,
      file_name: fileName,
    })
    .then(() =>
      res.status(201).json({ message: "Replies saved successfully !" })
    )
    .catch((error) => res.status(400).json({ error }));
};

// Delete quiz by params.id
exports.delete = (req, res, next) => {
  QuizReplies.findOne({ _id: req.params.id })
    .then((quote) => {
      // if the userId of post object is not the user authentified and if the user is not admin
      if (req.auth.roles[0] < 50)
        // Je devrais faire un indexOf à la place
        return res.status(401).json({ message: "Not authorized" });

      QuizReplies.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Quote deleted !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
