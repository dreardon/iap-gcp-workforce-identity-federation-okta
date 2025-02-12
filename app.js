const { jwtDecode } = require('jwt-decode');
const cors = require("cors");

require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(path.join(__dirname,'public')));
app.use(cors({ origin: true }));

app.use(session({
  resave: true,
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false
}));

app.get('/', (req, res) => {
  var iap_user_id = req.headers["x-goog-authenticated-user-id"] || ""
  var iap_jwt_assertion = req.headers["x-goog-iap-jwt-assertion"] || ""
  if (iap_jwt_assertion) {
    var decoded_iap_jwt = jwtDecode(iap_jwt_assertion)
  } else {
    var decoded_iap_jwt = ""
  }
  res.render('login', { decoded_iap_jwt: decoded_iap_jwt, iap_user_id: iap_user_id });
});

const PORT = process.env.PORT || 8080;
var server = app.listen(PORT, function () {
  console.log('Listening on port %d', server.address().port)
});