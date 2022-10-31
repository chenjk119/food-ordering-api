const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models").User;

module.exports = {
  /**
   * Creates a user in the database
   * @param req the request sent by the frontend
   * @param res the response to send back to the frontend
   */
  create(req, res) {
    return User
      .create({
        email: req.body.email,
        password: req.body.password,
        isInfluencer: req.body.isInfluencer,
      })
      .then(user => res.status(parseInt(process.env.CREATED, 10)).send(user))
      .catch(error => res.status(parseInt(process.env.BAD_REQUEST, 10)).send(error));
  },
  /**
   * Validates a request of logging in, compares the password and generates a jwt
   * @param req the request sent by the frontend
   * @param res the response to send to the frontend
   */
  validate(req, res) {
    return User
      .findOne({
        where: {
          email: req.body.email,
        },
      })
      .then(async(user) => {
        if (!user) {
          return res.status(parseInt(process.env.NOT_FOUND, 10)).send({
            message: 'User Not Found',
          });
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
          const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          user.token = token;

          return res.status(parseInt(process.env.OK, 10)).send(user);
        }
        return res.status(parseInt(process.env.UNAUTHORIZED, 10)).send({
          message: 'Invalid Credentials',
        });
      })
      .catch(error => res.status(parseInt(process.env.BAD_REQUEST, 10)).send(error));
  },
  /**
   * Gets all influencers from the database
   * @param req the request sent by the frontend
   * @param res the response to send to the frontend
   */
  listInfluencers(req, res) {
    return User
      .findAll({
        where: {
          isInfluencer: true,
        },
      })
      .then(users => res.status(parseInt(process.env.OK, 10)).send(users))
      .catch(error => res.status(parseInt(process.env.BAD_REQUEST, 10)).send(error));
  },
  /**
   * Updates the profile of a user, the photo is stored as a cloudinary image id
   * @param req the request sent by the frontend
   * @param res the response to send to the frontend
   */
  editProfile(req, res) {
    return User
      .findByPk(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(parseInt(process.env.NOT_FOUND, 10)).send({
            message: 'User Not Found',
          });
        }
        return user
          .update({
            firstName: req.body.firstName || user.firstName,
            lastName: req.body.lastName || user.lastName,
            address: req.body.address || user.address,
            photo: req.body.photo || user.photo,
            preference: req.body.preference || user.preference,
            allergy: req.body.allergy || user.allergy,
          })
          .then(() => res.status(parseInt(process.env.OK, 10)).send(user))
          .catch((error) => res.status(parseInt(process.env.BAD_REQUEST, 10)).send(error));
      })
      .catch((error) => res.status(parseInt(process.env.BAD_REQUEST, 10)).send(error));
  },
  /**
   * Updates the credit of a user
   * @param req the request sent by the frontend
   * @param res the response to send to the frontend
   */
  updateCredit(req, res) {
    return User
      .findByPk(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(parseInt(process.env.NOT_FOUND, 10)).send({
            message: 'User Not Found',
          });
        }
        return user
          .increment(
            { credit: + req.body.credit }
          )
          .then(() => res.status(parseInt(process.env.OK, 10)).send(user))
          .catch((error) => res.status(parseInt(process.env.BAD_REQUEST, 10)).send(error));
      })
      .catch((error) => res.status(parseInt(process.env.BAD_REQUEST, 10)).send(error));
  },
  /**
   * Gets the credit of a user
   * @param req the request sent by the frontend
   * @param res the response to send to the frontend
   */
  retrieveCredit(req, res) {
    return User
      .findByPk(req.params.userId)
      .then(user => res.status(parseInt(process.env.OK, 10)).send({credit: user.credit}))
      .catch(error => res.status(parseInt(process.env.BAD_REQUEST, 10)).send(error));
  },
  /**
   * Deletes a user from the database
   * @param req the request sent by the frontend
   * @param res the response to send to the frontend
   */
  destroy(req, res) {
    return User
      .findByPk(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(parseInt(process.env.NOT_FOUND, 10)).send({
            message: 'User Not Found',
          });
        }
        return user
          .destroy()
          .then(() => res.status(parseInt(process.env.OK, 10)).send({ message: 'User deleted successfully.' }))
          .catch(error => res.status(parseInt(process.env.BAD_REQUEST, 10)).send(error));
      })
      .catch(error => res.status(parseInt(process.env.BAD_REQUEST, 10)).send(error));
  },
};