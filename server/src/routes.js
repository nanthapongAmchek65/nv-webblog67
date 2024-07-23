const UserController = require('./components/UserController');

module.exports = (app) => {
    app.get('/users',UserController.index);
    app.get('/users/:userId',UserController.show);
    app.post('/user',UserController.create);
    app.put('/user/:userId',UserController.put);
    app.delete('/user/:userId',UserController.remove);
}