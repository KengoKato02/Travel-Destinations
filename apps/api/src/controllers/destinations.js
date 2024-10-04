import mongoose from 'mongoose';

import Destination from '../schemas/Destination.js';

import { handleErrorResponse } from '../utils/errorHandler.js';

export async function getHomeRoute(req, res) {
  try {
    const message = await Destination.findOne({});

    res.json({
      message: message
        ? message.name
        : 'Welcome to the Travel Destinations Express API!'
    });
  } catch (error) {
    handleErrorResponse(res, 500, 'Error in home route', error);
  }
}

export async function getAllDestinations(req, res) {
  try {
    const destinations = await Destination.find({});

    if (destinations.length === 0) {
      return handleErrorResponse(res, 404, 'No destinations found');
    }

    res.status(200).json(destinations);
  } catch (error) {
    handleErrorResponse(res, 500, 'Error fetching destinations', error);
  }
}

export async function getDestinationById(req, res) {
  try {
    const destinationID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(destinationID)) {
      return handleErrorResponse(res, 400, 'Invalid destination ID');
    }

    const destination = await Destination.findById(destinationID).lean();

    if (!destination) {
      return handleErrorResponse(res, 404, 'Destination not found');
    }

    res.status(200).json(destination);
  } catch (error) {
    handleErrorResponse(res, 500, 'Error fetching destination', error);
  }
}

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
    // Handling Mongoose validation errors
    if (error.name === 'ValidationError') {
      return handleErrorResponse(res, 400, 'Validation errors', error);
    }

    handleErrorResponse(res, 500, 'Error creating destination', error);
  }
}

export async function updateDestination(req, res) {
  try {
    const destinationID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(destinationID)) {
      return handleErrorResponse(res, 400, 'Invalid destination ID');
    }

    const updatedDestination = await Destination.findByIdAndUpdate(
      destinationID,
      { $set: req.body },
      { new: true, runValidators: true } // Enable validation during update
    ).lean();

    if (!updatedDestination) {
      return handleErrorResponse(res, 404, 'Destination not found');
    }

    res.status(200).json(updatedDestination);
  } catch (error) {
    // Handling Mongoose validation errors
    if (error.name === 'ValidationError') {
      return handleErrorResponse(res, 400, 'Validation errors', error);
    }

    handleErrorResponse(res, 500, 'Error updating destination', error);
  }
}

export async function deleteDestination(req, res) {
  try {
    const destinationID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(destinationID)) {
      return handleErrorResponse(res, 400, 'Invalid destination ID');
    }

    const result = await Destination.deleteOne({ _id: destinationID });

    if (result.deletedCount === 0) {
      return handleErrorResponse(res, 404, 'Destination not found');
    }

    res.status(204).send();
  } catch (error) {
    handleErrorResponse(res, 500, 'Error deleting destination', error);
  }
}
