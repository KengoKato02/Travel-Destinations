import { ObjectId } from 'mongodb';

function handleError(error, res, message) {
  console.error(`${message}:`, error);
  res.status(500).json({ error: 'Internal Server Error' });
}

export async function getHomeRoute(req, res, db) {
  try {
    const collection = db.collection('travel_destinations_collection');
    const message = await collection.findOne({});
    res.json({
      message: message
        ? message.name
        : 'Welcome to the Travel Destinations Express API!'
    });
  } catch (error) {
    handleError(error, res, 'Error in home route');
  }
}

export async function getAllDestinations(req, res, db) {
  try {
    const collection = db.collection('Destination');
    const filters = req.query;

    const query = Object.keys(filters).length ? getFilterQuery(filters) : {};
    const destinations = await collection.find(query).toArray();

    if (destinations.length === 0) {
      return res.status(404).json({ message: 'No destinations found' });
    }

    res.status(200).json(destinations);
  } catch (error) {
    handleError(error, res, 'Error fetching destinations');
  }
}

export async function getDestinationById(req, res, db) {
  try {
    const collection = db.collection('Destination');

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid destination ID' });
    }
    const destinationID = new ObjectId(req.params.id);
    const destination = await collection.findOne({ _id: destinationID });

    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    res.status(200).json(destination);
  } catch (error) {
    handleError(error, res, 'Error fetching destination');
  }
}

export async function createDestination(req, res, db) {
  try {
    const collection = db.collection('Destination');
    const newDestination = req.body;

    const { Title, DateFrom, DateTo, PictureURL, Country } = newDestination;

    if (!Title || !DateFrom || !DateTo || !PictureURL || !Country) {
      return res.status(400).json({ error: 'All fields required are not met' });
    }

    const result = await collection.insertOne(newDestination);

    res.status(201).json({ ...newDestination, _id: result.insertedId });
  } catch (error) {
    handleError(error, res, 'Error creating destination');
  }
}

export async function updateDestination(req, res, db) {
  try {
    const collection = db.collection('Destination');
    const updatedDestination = req.body;

    const { Title, DateFrom, DateTo, PictureURL, Country } = updatedDestination;

    if (!Title || !DateFrom || !DateTo || !PictureURL || !Country) {
      return res.status(400).json({ error: 'All fields required are not met' });
    }

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid destination ID' });
    }

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedDestination },
      { returnDocument: 'after' }
    );

    res.status(200).json(result.value);
  } catch (error) {
    handleError(error, res, 'Error updating destination');
  }
}

export async function deleteDestination(req, res, db) {
  try {
    const collection = db.collection('Destination');

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid destination ID' });
    }

    const result = await collection.deleteOne({
      _id: new ObjectId(req.params.id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    res.status(204).send();
  } catch (error) {
    handleError(error, res, 'Error deleting destination');
  }
}

function getFilterQuery(filters) {
  const query = {};
  const { name, location, travelDateFrom, travelDateTo, hasDescription } =
    filters;

  if (name) {
    query.name = name;
  }
  if (location) {
    query.location = location;
  }

  if (travelDateFrom || travelDateTo) {
    query.$and = [];
    if (travelDateFrom) {
      query.$and.push({ travelDateFrom: { $gte: travelDateFrom } });
    }
    if (travelDateTo) {
      query.$and.push({ travelDateTo: { $lte: travelDateTo } });
    }
  }

  if (hasDescription) {
    query.description = { $exists: hasDescription.trim() === 'true' };
  }

  return query;
}
