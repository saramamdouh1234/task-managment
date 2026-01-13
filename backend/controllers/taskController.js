const { Task, User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = async (req) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    return user || null;
  } catch {
    return null;
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  const user = await verifyToken(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const tasks = await Task.findAll({ where: { userId: user.id } });
  res.json(tasks);
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  const user = await verifyToken(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const task = await Task.findOne({ where: { id: req.params.id, userId: user.id } });
  if (!task) return res.status(404).json({ error: 'Task not found' });

  res.json(task);
};

// Create task
exports.createTask = async (req, res) => {
  const user = await verifyToken(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  let { title, description, status } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  if (!['pending', 'in_progress', 'done'].includes(status)) status = 'pending';

  const task = await Task.create({ title, description, status, userId: user.id });
  res.json(task);
};

// Update task
exports.updateTask = async (req, res) => {
  const user = await verifyToken(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.params;
  let { title, description, status } = req.body;

  const task = await Task.findOne({ where: { id, userId: user.id } });
  if (!task) return res.status(404).json({ error: 'Task not found' });

  if (title) task.title = title;
  if (description !== undefined) task.description = description;
  if (['pending', 'in_progress', 'done'].includes(status)) task.status = status;

  await task.save();
  res.json(task);
};

// Delete task
exports.deleteTask = async (req, res) => {
  const user = await verifyToken(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.params;
  const task = await Task.findOne({ where: { id, userId: user.id } });
  if (!task) return res.status(404).json({ error: 'Task not found' });

  await task.destroy();
  res.json({ message: 'Task deleted' });
};
