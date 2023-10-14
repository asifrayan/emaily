require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoDBStore = require('connect-mongodb-session')(session);
require('./models/User');
require('./services/passport');

const app = express();

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions',
  expires: 30 * 24 * 60 * 60 * 1000,
});

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

// server
const PORT = process.env.PORT || 5000;

const connectToDBAndStartServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`*** Connected to DB ***`);
    app.listen(PORT, () => {
      console.log(`*** Server started at PORT ${PORT} ***`);
    });
  } catch (err) {
    console.log(err);
  }
};

connectToDBAndStartServer();
