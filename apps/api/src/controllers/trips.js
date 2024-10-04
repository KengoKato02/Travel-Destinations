import mongoose from "mongoose";

import Trip from "../schemas/Trip.js";
import { getUserByEmail } from "./users.js";

function handleError(error, res, message) {
  console.error(`${message}:`, error);
  res.status(500).json({ error: `Internal Server Error. ${error}` });
}

function validateObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find({});

    if (trips.length === 0) {
      return res.status(404).json({ message: "No trips found" });
    }

    res.status(200).json(trips);
  } catch (error) {
    handleError(error, res, "Error fetching trips");
  }
};

export const getTripById = async (req, res) => {
  try {
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid trip ID" });
    }

    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    res.status(200).json(trip);
  } catch (error) {
    handleError(error, res, "Error fetching trip");
  }
};

export const createTrip = async (req, res) => {
  try {
    const user = await getUserByEmail(req.body.email);
    const { title, description, destinations, start_date, end_date } = req.body;

    if (!destinations || !start_date || !end_date || !title || !description) {
      return res.status(400).json({
        error:
          "All fields are required (Destinations, Start Date, End Date, Title, Description)",
      });
    }

    const newTrip = new Trip({
      user_id: user._id,
      title,
      description,
      destinations,
      start_date,
      end_date,
    });

    const result = await newTrip.save();
    res.status(201).json(result);
  } catch (error) {
    handleError(error, res, "Error creating trip");
  }
};

export const deleteTrip = async (req, res) => {
  try {
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid trip ID" });
    }

    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    await Trip.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    handleError(error, res, "Error deleting trip");
  }
};

export const updateTrip = async (req, res) => {
  try {
    const { title, description, destinations, start_date, end_date } = req.body;

    if (!destinations || !start_date || !end_date || !title || !description) {
      return res.status(400).json({
        error:
          "All fields are required (Destinations, Start Date, End Date, Title, Description)",
      });
    }

    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid trip ID" });
    }

    const updatedTrip = req.body;
    await Trip.findByIdAndUpdate(req.params.id, updatedTrip);

    res.status(200).json({ message: "Trip updated successfully" });
  } catch (error) {
    handleError(error, res, "Error updating trip");
  }
};

export const getTripsByUser = async (req, res) => {
  try {
    if (!validateObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const trips = await Trip.find({ user_id: req.params.id });

    if (trips.length === 0) {
      return res.status(404).json({ message: "No trips found" });
    }

    res.status(200).json(trips);
  } catch (error) {
    handleError(error, res, "Error fetching trips");
  }
};
