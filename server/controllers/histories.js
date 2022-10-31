const History = require('../models').History;

module.exports = {
  /**
   * Creates a purchase history in the database
   * @param req the request sent by the frontend
   * @param res the response to send back to the frontend
   */
  create(req, res) {
    return History
      .create({
        influencerId: req.body.influencerId,
        quantity: req.body.quantity,
        size: req.body.size,
        total: req.body.total,
        userId: req.params.userId,
      })
      .then(history => res.status(parseInt(process.env.CREATED, 10)).send(history))
      .catch(error => res.status(parseInt(process.env.BAD_REQUEST, 10)).send(error));
  },
  /**
   * Gets the pruchase history of a user
   * @param req the request sent by the frontend
   * @param res the response to send back to the frontend
   */
  retrieveByUser(req, res) {
    return History
      .findAll({
        where: {
          userId: req.params.userId,
        },
      })
      .then(history => res.status(parseInt(process.env.OK, 10)).send(history))
      .catch(error => res.status(parseInt(process.env.BAD_REQUEST, 10)).send(error));
  },
  /**
   * Gets the history of an influencer
   * @param req the request sent by the frontend
   * @param res the response to send back to the frontend
   */
  retrieveByInfluencer(req, res) {
    return History
      .findAll({
        where: {
          influencerId: req.params.influencerId,
        },
      })
      .then(history => res.status(parseInt(process.env.OK, 10)).send(history))
      .catch(error => res.status(parseInt(process.env.BAD_REQUEST, 10)).send(error));
  },
  /**
   * Deletes a history from the database
   * @param req the request sent by the frontend
   * @param res the response to send back to the frontend
   */
  destroy(req, res) {
    return History
      .findByPk(req.params.historyId)
      .then(history => {
        if (!history) {
          return res.status(parseInt(process.env.NOT_FOUND, 10)).send({
            message: 'History Not Found',
          });
        }
        return history
          .destroy()
          .then(() => res.status(parseInt(process.env.OK, 10)).send({ message: 'User deleted successfully.' }))
          .catch(error => res.status(parseInt(process.env.BAD_REQUEST, 10)).send(error));
      })
      .catch(error => res.status(parseInt(process.env.BAD_REQUEST, 10)).send(error));
  }
};