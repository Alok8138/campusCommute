//current status : pending 

const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus'); // Import the Bus model

// Get unique city names from the database
router.get('/getcities', async (req, res) => {
  try {
    const cities = await Bus.distinct('city'); // Fetch unique city names
    res.json(cities); // Send the city list as a response
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ message: 'Server error while fetching cities' });
  }
});

module.exports = router;
