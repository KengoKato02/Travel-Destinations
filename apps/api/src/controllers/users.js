import User from '../schemas/User.js';

import { handleErrorResponse } from '../utils/errorHandler.js';

// Get all users
export async function getAllUsers(req, res) {
  try {
    const users = await User.find({}).select('-password -_id'); // Exclude password and _id

    if (users.length === 0) {
      return handleErrorResponse(res, 404, 'No users found');
    }

    res.status(200).json(users); // Return users without password and _id
  } catch (error) {
    handleErrorResponse(res, 500, 'Error fetching users', error);
  }
}

// Get user by email
export async function getUserByEmail(req, res) {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email }).select('-password -_id');

    if (!user) {
      return handleErrorResponse(res, 404, 'User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    handleErrorResponse(res, 500, 'Error fetching user', error);
  }
}

// Update user
export async function updateUser(req, res) {
  try {
    const { email } = req.params;

    const updatedUser = await User.findOneAndUpdate({ email }, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedUser) {
      return handleErrorResponse(res, 404, 'User not found');
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return handleErrorResponse(
        res,
        400,
        'There was an error with your submission',
        error
      );
    }

    console.log(error);

    handleErrorResponse(res, 500, 'Error updating user', error);
  }
}

// Delete user
export async function deleteUser(req, res) {
  try {
    const { email } = req.params; // Use email instead of user ID

    const result = await User.deleteOne({ email }); // Delete by email

    if (result.deletedCount === 0) {
      return handleErrorResponse(res, 404, 'User not found');
    }

    res.status(204).send();
  } catch (error) {
    handleErrorResponse(res, 500, 'Error deleting user', error);
  }
}
