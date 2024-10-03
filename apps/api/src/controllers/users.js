import mongoose from 'mongoose';

import User from '../schemas/User.js';

function handleError(error, res, message) {
  console.error(`${message}:`, error);
  res.status(500).json({ error: `Internal Server Error. ${error}` });
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json(users);
  } catch (error) {
    handleError(error, res, 'Error fetching users');
  }
}

export async function getUserById(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    handleError(error, res, 'Error fetching user');
  }
}

export async function createUser(req, res) {
  try {
    const { username, password, email, isAdmin } = req.body;

    if (!username || !password || !email || !isAdmin) {
      return res
        .status(400)
        .json({ error: 'All fields are required (Username, Password, Email)' });
    }

    const newUser = new User({ username, password, email, isAdmin });
    const result = await newUser.save();

    res.status(201).json(result);
  } catch (error) {
    handleError(error, res, 'Error creating user');
  }
}

export async function updateUser(req, res) {
  try {
    const { username, password, email, isAdmin } = req.body;

    if (!username || !password || !email || !isAdmin) {
      return res
        .status(400)
        .json({ error: 'All fields are required (Username, Password, Email)' });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, password, email, isAdmin },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    handleError(error, res, 'Error updating user');
  }
}

export async function deleteUser(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const result = await User.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(204).send();
  } catch (error) {
    handleError(error, res, 'Error deleting user');
  }
}
