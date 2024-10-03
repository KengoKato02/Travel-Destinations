import mongoose from 'mongoose';

import User from '../schemas/User.js';

import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

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
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: 'All fields are required (Username, Password, Email)' });
    }

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(400)
        .json({ errors: { email: 'Email already exists' } });
    }

    const newUser = await User.create(req.body);

    const token = jwt.sign(
      { user: newUser._id, email: newUser.email, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );

    res.status(201).json({
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin
      },
      token
    });
  } catch (error) {
    handleError(error, res, 'Error signing up');
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign(
          { user: user._id, email: user.email, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h'
          }
        );

        res.status(200).json({
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
          },
          token
        });
      } else {
        return res.status(400).json({ message: 'Incorrect password' });
      }
    } else {
      return res.status(400).json({ message: 'No user found with this email' });
    }
  } catch (error) {
    res.status(500).json(error, res, 'Login has failed');
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
