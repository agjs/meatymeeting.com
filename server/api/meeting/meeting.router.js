const router = require('express').Router();
const { meeting, create } = require('./meeting.controller');
router.route('/').post(create);
router.route('/:slug').get(meeting);

module.exports = router;
