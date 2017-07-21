const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skeletonSchema = new Schema({
  skeleton: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

const Skeleton = mongoose.model('Skeleton', skeletonSchema);
module.exports = Skeleton;
