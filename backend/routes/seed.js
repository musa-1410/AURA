const express = require('express');
const Resource = require('../models/Resource');

const router = express.Router();

// Seed resources (one-time use endpoint)
router.post('/resources', async (req, res) => {
  try {
    // Allow seeding without secret for initial setup
    // You can add authentication later if needed

    const resources = [
      // Sports Facilities - Grounds
      {
        name: 'Football Ground',
        type: 'ground',
        capacity: 5000,
        location: 'Sports Complex',
        description: 'Main football ground for matches and events'
      },
      {
        name: 'Cricket Ground',
        type: 'ground',
        capacity: 3000,
        location: 'Sports Complex',
        description: 'Cricket ground for matches and tournaments'
      },
      {
        name: 'Cricket Nets',
        type: 'ground',
        capacity: 20,
        location: 'Sports Complex',
        description: 'Cricket practice nets for training sessions'
      },
      {
        name: 'Tennis Court',
        type: 'ground',
        capacity: 50,
        location: 'Sports Complex',
        description: 'Tennis court for sports activities'
      },
      {
        name: 'Outdoor Basketball Court',
        type: 'ground',
        capacity: 200,
        location: 'Sports Complex',
        description: 'Outdoor basketball court for games and practice'
      },
      {
        name: 'Indoor Multipurpose Court',
        type: 'ground',
        capacity: 300,
        location: 'Sports Complex',
        description: 'Indoor multipurpose court for various sports activities'
      },
      {
        name: 'Squash Courts',
        type: 'ground',
        capacity: 20,
        location: 'Sports Complex',
        description: 'Squash courts for individual and group sessions'
      },
      // Academic Block Facilities
      {
        name: 'Academic Block - Lecture Halls',
        type: 'lecture_hall',
        capacity: 200,
        location: 'Academic Block',
        description: 'Lecture halls in Academic Block for classes and events'
      },
      {
        name: 'Academic Block - Labs',
        type: 'lecture_hall',
        capacity: 50,
        location: 'Academic Block',
        description: 'Laboratory facilities in Academic Block'
      },
      // FCSE Facilities
      {
        name: 'FCSE - Lecture Halls',
        type: 'lecture_hall',
        capacity: 150,
        location: 'FCSE Building',
        description: 'Lecture halls in FCSE building for classes and seminars'
      },
      {
        name: 'FCSE - Labs',
        type: 'lecture_hall',
        capacity: 40,
        location: 'FCSE Building',
        description: 'Laboratory facilities in FCSE building'
      },
      // FBS Facilities
      {
        name: 'FBS - Lecture Halls',
        type: 'lecture_hall',
        capacity: 150,
        location: 'FBS Building',
        description: 'Lecture halls in FBS building for classes and seminars'
      },
      {
        name: 'FBS - Labs',
        type: 'lecture_hall',
        capacity: 40,
        location: 'FBS Building',
        description: 'Laboratory facilities in FBS building'
      },
      // FME Facilities
      {
        name: 'FME - Lecture Halls',
        type: 'lecture_hall',
        capacity: 150,
        location: 'FME Building',
        description: 'Lecture halls in FME building for classes and seminars'
      },
      {
        name: 'FME - Labs',
        type: 'lecture_hall',
        capacity: 40,
        location: 'FME Building',
        description: 'Laboratory facilities in FME building'
      },
      // FMCE Facilities
      {
        name: 'FMCE - Lecture Halls',
        type: 'lecture_hall',
        capacity: 150,
        location: 'FMCE Building',
        description: 'Lecture halls in FMCE building for classes and seminars'
      },
      {
        name: 'FMCE - Labs',
        type: 'lecture_hall',
        capacity: 40,
        location: 'FMCE Building',
        description: 'Laboratory facilities in FMCE building'
      },
      // Brabers Building Facilities
      {
        name: 'Brabers Building - Lecture Halls',
        type: 'lecture_hall',
        capacity: 200,
        location: 'Brabers Building',
        description: 'Lecture halls in Brabers Building for classes and events'
      },
      {
        name: 'Brabers Building - Seminar Halls',
        type: 'lecture_hall',
        capacity: 100,
        location: 'Brabers Building',
        description: 'Seminar halls in Brabers Building for presentations and meetings'
      },
      {
        name: 'Brabers Building - Exam Halls',
        type: 'lecture_hall',
        capacity: 300,
        location: 'Brabers Building',
        description: 'Examination halls in Brabers Building'
      },
      // Incubation Centre Facilities
      {
        name: 'Incubation Centre - Seminar Halls',
        type: 'lecture_hall',
        capacity: 80,
        location: 'Incubation Centre',
        description: 'Seminar halls in Incubation Centre for workshops and presentations'
      }
    ];

    // Clear existing resources
    await Resource.deleteMany({});
    console.log('Cleared existing resources');

    // Insert new resources
    await Resource.insertMany(resources);
    console.log(`Successfully seeded ${resources.length} resources`);

    res.json({
      message: `Successfully seeded ${resources.length} resources`,
      count: resources.length
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

