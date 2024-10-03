import mongoose from 'mongoose';

import Destination from '../schemas/Destination.js';

function handleError(error, res, message) {
  console.error(`${message}:`, error);
  res.status(500).json({ error: `Internal Server Error. ${error}` });
}

export async function getHomeRoute(res) {
  try {
    const message = await Destination.findOne({});
    res.json({
      message: message
        ? message.name
        : 'Welcome to the Travel Destinations Express API!'
    });
  } catch (error) {
    handleError(error, res, 'Error in home route');
  }
}

export async function getAllDestinations(req, res) {
  try {
    const destinations = await Destination.find({});

    if (destinations.length === 0) {
      return res.status(404).json({ message: 'No destinations found' });
    }

    res.status(200).json(destinations);
  } catch (error) {
    handleError(error, res, 'Error fetching destinations');
  }
}

// Get a destination by ID
export async function getDestinationById(req, res) {
  try {
    const destinationID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(destinationID)) {
      return res.status(400).json({ error: 'Invalid destination ID' });
    }

    const destination = await Destination.findById(destinationID).lean();

    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    res.status(200).json(destination);
  } catch (error) {
    handleError(error, res, 'Error fetching destination');
  }
}

// Create a new destination
export async function createDestination(req, res) {
  try {
    const destination = new Destination({
      title: req.body.title,
      description: req.body.description,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      image_url: req.body.image_url,
      country: req.body.country
    });

    const result = await destination.save();
    res.status(201).json(result);
  } catch (error) {
    handleError(error, res, 'Error creating destination');
  }
}

// Update an existing destination
export async function updateDestination(req, res) {
  try {
    const destinationID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(destinationID)) {
      return res.status(400).json({ error: 'Invalid destination ID' });
    }

    const updatedDestination = req.body;

    const destination = await Destination.findByIdAndUpdate(
      destinationID,
      { $set: updatedDestination },
      { new: true, runValidators: true } // Return updated document, validate changes
    ).lean();

    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    res.status(200).json(destination);
  } catch (error) {
    handleError(error, res, 'Error updating destination');
  }
}

// Delete a destination
export async function deleteDestination(req, res) {
  try {
    const destinationID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(destinationID)) {
      return res.status(400).json({ error: 'Invalid destination ID' });
    }

    const result = await Destination.deleteOne({ _id: destinationID });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    res.status(204).send();
  } catch (error) {
    handleError(error, res, 'Error deleting destination');
  }
}
