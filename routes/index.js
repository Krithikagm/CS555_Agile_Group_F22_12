const loginRoutes = require('./main');
const doctorRoutes = require('./doctors');

const constructorMethod = (app) => {
app.use('/', loginRoutes);
app.use('/', doctorRoutes);
app.use('*', (req, res) => {
    res.sendStatus(404);
});
};

module.exports = constructorMethod;