require('dotenv').config();
const express = require('express')
const request = require('request');
const queryString = require('query-string');

const port = 5000

var access_token = ''

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

const payload = spotify_client_id + ":" + spotify_client_secret;
const encodedPayload = Buffer.from(payload).toString("base64");

var spotify_redirect_uri = 'http://localhost:3000/auth/callback'

var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var app = express();

app.get('/auth/login', (req, res) => {

  var scope = "streaming user-read-email user-read-private"
  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state
  })

  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
})

app.get('/auth/callback', (req, res) => {

  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      queryString.stringify({
        error: 'state_mismatch'
      }));
  } else {
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' 
        + encodedPayload,
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      form: {
        code: code,
        redirect_uri: spotify_redirect_uri,
        grant_type: 'authorization_code'
      },
      json: true
    };
    
    console.log("before: " + access_token)
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      console.log("after: " + access_token)
      res.redirect('/')
    }
  });

  app.get('/auth/token', (req, res) => {
    console.log("retrieval: " + access_token)
    res.json({ access_token: access_token})
  })
}})


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})