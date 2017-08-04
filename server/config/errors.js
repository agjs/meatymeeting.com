const path = require('path');

module.exports = (error, req, res, next) => {
  if (error) {
    console.log(error);
    res.status(500).render(path.resolve(__dirname, '../views/500.handlebars'), {
      error: error
    });
  }
};
