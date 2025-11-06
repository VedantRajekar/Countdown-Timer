import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User exists' });
  const user = await User.create({ name, email, password });
  res.json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await user.matchPassword(password)) {
    return res.json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
  }
  res.status(401).json({ message: 'Invalid credentials' });
};

export const guestLogin = async (req, res) => {
  const guestEmail = `guest_${Date.now()}@guest.local`;
  const guest = await User.create({ name: 'Guest', email: guestEmail, password: 'guestpass', guest: true });
  res.json({ _id: guest._id, name: 'Guest', email: guest.email, token: generateToken(guest._id) });
};
