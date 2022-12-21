const { Model } = require("objection");

class QuizReplies extends Model {
  static get tableName() {
    return "quiz_replies";
  }

  static get relationMappings() {
    const QuizReplies = require("./QuizReplies");
    return {
      replies: {
        relation: Model.HasManyRelation,
        modelClass: QuizReplies,
        join: {
          from: "quiz.id",
          to: "quiz_replies.quiz_id",
        },
      },
    };
  }
}

module.exports = QuizReplies;
