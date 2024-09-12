var admin = require("firebase-admin");

var serviceAccount = require("../expreso-tracking-firebase-adminsdk-pu9y9-d69e18dc84.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://expreso-tracking-default-rtdb.firebaseio.com/"
});

const db = admin.database();

module.exports = db;