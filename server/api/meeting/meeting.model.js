const mongoose = require('mongoose');
const slugs = require('mongoose-url-slugs');

const meetingSchema = new mongoose.Schema({
  name: {
    type: String
  },
  context: {
    type: String,
    required: false
  },
  agenda: {
    type: String,
    required: false
  },
  attendances: {
    type: Number,
    required: false
  },
  hours: {
    type: Number,
    required: false
  },
  rating: {
    type: Number,
    required: false
  }
});
meetingSchema.plugin(slugs('name', { field: 'slug' }));

module.exports = mongoose.model('Meeting', meetingSchema);
