const router = require('express').Router();
const db = require('../db/db');

router.post('/user', async (req, res) => {
    const newUser = {
      email: req.body.email,
      location: {
        latitude: req.body.latitude,
        longitude: req.body.longitude
      },
      role: req.body.role,
      route: req.body.route
    };
  
    try {
      const userRef = db.ref('users').push();
      await userRef.set(newUser);
      res.status(201).send('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error);  // Log detailed error
      res.status(500).send('Error adding user: ' + error.message);
    }
});

router.get('/user-by-email/:email', async (req, res) => {
  const email = req.params.email;
  
  try {
    const usersRef = db.ref('users').orderByChild('email').equalTo(email);
  
    usersRef.once('value', (snapshot) => {
    if (snapshot.exists()) {
      const users = snapshot.val();
      const userId = Object.keys(users)[0]; // Get the user ID (key)
      
      res.status(200).json({userData: users[userId] });
    } else {
      res.status(404).send('User not found');
    }
    });
  } catch (error) {
    res.status(500).send('Error retrieving user: ' + error.message);
  }
});

router.put('/update-location', async (req, res) => {
  const { email, latitude, longitude } = req.body;

  try {
    // Reference to the 'users' node
    const usersRef = db.ref('users');

    // Query for the user with the specified email
    const snapshot = await usersRef.orderByChild('email').equalTo(email).once('value');

    if (snapshot.exists()) {
      // Assuming there's only one user with that email
      const userKey = Object.keys(snapshot.val())[0];
      const userRef = usersRef.child(userKey);

      // Update user's location
      await userRef.update({
        location: {
          latitude: latitude,
          longitude: longitude
        }
      });

      res.status(200).send('User location updated successfully');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error updating user location:', error);
    res.status(500).send('Error updating user location: ' + error.message);
  }
});


module.exports = router;