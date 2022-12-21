const { Model } = require("objection");

class QuizReplies extends Model {
  static get tableName() {
    return "quiz_replies";
  }

  static get idColumn() {
    return ["id"];
  }

  static get relationMappings() {
    const Quiz = require("./Quiz");
    return {
      quiz: {
        relation: Model.BelongsToOneRelation,
        modelClass: Quiz,
        join: {
          from: "quiz_replies.id",
          to: "quiz.id",
        },
      },
    };
  }
}

module.exports = QuizReplies;
