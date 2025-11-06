import mongoose from 'mongoose';

const timerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  targetDate: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Timer', timerSchema);
