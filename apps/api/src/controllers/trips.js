import Trip from '../schemas/Trip.js';

import { getUserByEmail } from './users.js';

function handleError(error, res, message) {
  console.error(`${message}:`, error);

  res.status(500).json({ error: `Internal Server Error. ${error}` });
}

export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find({}).lean();

    if (!trips.length) {
      return res.status(404).json({ message: 'No trips found' });
    }

    res.status(200).json(trips);
  } catch (error) {
    handleError(error, res, 'Error fetching trips');
  }
};

export const getTripById = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findById(id).lean();

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.status(200).json(trip);
  } catch (error) {
    handleError(error, res, 'Error fetching trip');
  }
};

export const createTrip = async (req, res) => {
  try {
    const user = await getUserByEmail(req.body.email);

    const { title, description, destinations, start_date, end_date } = req.body;

    if (!destinations || !start_date || !end_date || !title || !description) {
      return res.status(400).json({
        error:
          'All fields are required (Destinations, Start Date, End Date, Title, Description)'
      });
    }

    const newTrip = new Trip({
      user_id: user._id,
      title,
      description,
      destinations,
      start_date,
      end_date
    });

    const result = await newTrip.save();

    res.status(201).json(result);
  } catch (error) {
    handleError(error, res, 'Error creating trip');
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTrip = await Trip.findByIdAndDelete(id);

    if (!deletedTrip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    handleError(error, res, 'Error deleting trip');
  }
};

export const updateTrip = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, destinations, start_date, end_date } = req.body;

    if (!title || !destinations || !start_date || !end_date || !description) {
      return res.status(400).json({
        error:
          'All fields are required (Destinations, Start Date, End Date, Title, Description)'
      });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(id, req.body, {
      new: true,
      lean: true
    });

    if (!updatedTrip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res
      .status(200)
      .json({ message: 'Trip updated successfully', trip: updatedTrip });
  } catch (error) {
    handleError(error, res, 'Error updating trip');
  }
};

export const getTripsByUser = async (req, res) => {
  try {
    const { id } = req.params;

    const trips = await Trip.find({ user_id: id }).lean();

    if (!trips.length) {
      return res.status(404).json({ message: 'No trips found' });
    }

    res.status(200).json(trips);
  } catch (error) {
    handleError(error, res, 'Error fetching trips');
  }
};
