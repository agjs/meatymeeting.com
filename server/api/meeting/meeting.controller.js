const Meeting = require('./meeting.model');

const create = async (req, res, next) => {
  try {
    const response = await Meeting.create(req.body);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
const meeting = async (req, res, next) => {
  try {
    const response = await Meeting.findOne({ slug: req.params.slug });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, meeting };
