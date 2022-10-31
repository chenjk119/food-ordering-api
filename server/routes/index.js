const usersController = require('../controllers').users;
const historiesController = require('../controllers').histories;
const auth = require('../../middleware/auth');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Food Ordering API!',
  }));

  app.post('/api/users', usersController.create);
  app.post('/api/users/login', usersController.validate);
  app.get('/api/users/influencers', auth, usersController.listInfluencers);
  app.put('/api/users/profile/:userId', auth, usersController.editProfile);
  app.put('/api/users/credit/:userId', auth, usersController.updateCredit);
  app.get('/api/users/credit/:userId', auth, usersController.retrieveCredit);
  app.delete('/api/users/delete/:userId', usersController.destroy);

  app.post('/api/histories/users/:userId', auth, historiesController.create);
  app.get('/api/histories/users/:userId', auth, historiesController.retrieveByUser);
  app.get('/api/histories/influencers/:influencerId', auth, historiesController.retrieveByInfluencer);
  app.delete('/api/histories/delete/:historyId', historiesController.destroy);

};