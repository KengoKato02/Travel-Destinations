import { ObjectId } from 'mongodb';

function handleError(error, res, message) {
  console.error(`${message}:`, error);
  res.status(500).json({ error: 'Internal Server Error' });
}

export async function getAllUsers(req, res, db) {
  try {
    const collection = db.collection('User');
    const users = await collection.find({}).toArray();

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json(users);
  } catch (error) {
    handleError(error, res, 'Error fetching users');
  }
}

export async function getUserById(req, res, db) {
  try {
    const collection = db.collection('User');

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    const userId = new ObjectId(req.params.id);
    const user = await collection.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    handleError(error, res, 'Error fetching user');
  }
}

export async function createUser(req, res, db) {
  try {
    const collection = db.collection('User');
    const newUser = req.body;

    const { Username, Password, Email } = newUser;

    if (!Username || !Password || !Email) {
      return res
        .status(400)
        .json({ error: 'All fields are required (Username, Password, Email)' });
    }

    const result = await collection.insertOne(newUser);

    res.status(201).json({ ...newUser, _id: result.insertedId });
  } catch (error) {
    handleError(error, res, 'Error creating user');
  }
}

export async function updateUser(req, res, db) {
  try {
    const collection = db.collection('User');
    const updatedUser = req.body;

    const { Username, Password, Email } = updatedUser;

    if (!Username || !Password || !Email) {
      return res
        .status(400)
        .json({ error: 'All fields are required (Username, Password, Email)' });
    }

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedUser },
      { returnDocument: 'after' }
    );

    res.status(200).json(result.value);
  } catch (error) {
    handleError(error, res, 'Error updating user');
  }
}

export async function deleteUser(req, res, db) {
  try {
    const collection = db.collection('User');

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(204).send();
  } catch (error) {
    handleError(error, res, 'Error deleting user');
  }
}
