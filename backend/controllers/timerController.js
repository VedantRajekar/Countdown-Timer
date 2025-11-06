import Timer from '../models/Timer.js';

export const createTimer = async (req, res) => {
  const { title, targetDate } = req.body;
  const timer = await Timer.create({ title, targetDate, user: req.user._id });
  res.json(timer);
};

export const getTimers = async (req, res) => {
  const timers = await Timer.find({ user: req.user._id }).sort('-createdAt');
  res.json(timers);
};

export const deleteTimer = async (req, res) => {
  const t = await Timer.findById(req.params.id);
  if (!t) return res.status(404).json({ message: 'Not found' });
  if (t.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
  await t.remove();
  res.json({ message: 'Deleted' });
};
