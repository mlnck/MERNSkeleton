//_This will only be created if 'Start with Sample' option is chosen from CLI setup_

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const skeletonSchema = new Schema({
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Skeleton', skeletonSchema);
