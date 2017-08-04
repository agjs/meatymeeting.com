const path = require('path');
const meetingRouter = require('../api/meeting/meeting.router');
const errors = require('./errors');
module.exports = app => {
  app.use('/api/meetings', meetingRouter);
  app.all('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../../public/index.html'));
  });
  app.use(errors);
};
