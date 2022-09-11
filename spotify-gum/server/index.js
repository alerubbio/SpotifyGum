require('dotenv').config();
const express = require('express')
const request = require('request');
const queryString = require('query-string');
const axios = require('axios');

const port = 5000

var access_token = ''

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

const payload = spotify_client_id + ":" + spotify_client_secret;
const encodedPayload = Buffer.from(payload).toString("base64");

var spotify_redirect_uri = 'http://localhost:3000/api/callback'

var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var app = express();

app.get('/api/login', (req, res) => {

  var scope = "streaming user-read-email user-read-private user-modify-playback-state " +
    "user-read-recently-played user-read-playback-position playlist-read-collaborative " +
    "user-read-playback-state streaming user-top-read user-read-currently-playing " +
    "user-library-read playlist-read-private playlist-modify-public "

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

app.get('/api/callback', (req, res) => {

  var code = req.query.code || null;
  var state = req.query.state || null;

    axios(
    {
      method: 'POST',
      url:'https://accounts.spotify.com/api/token',
      data: queryString.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: spotify_redirect_uri
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + encodedPayload
      }},
    )
    .then(response => {
      if(response.status === 200){
        access_token = response.data.access_token
        res.redirect('/')
      }
    })
    .catch(error => console.log(error.response))
  }
)


app.get('/api/token', (req, res) => {
  res.json({ access_token: access_token })
})

app.get('/api/top/tracks', (req, res) => {
  
  axios({
    method: 'GET',
    url: 'https://api.spotify.com/v1/me/top/tracks',
    data: queryString.stringify({
      limit: 30,
      offset: 0,
      time_range: 'medium_term'
    }),
    headers: {
      'Authorization': 'Basic ' + encodedPayload,
      'Content-type': 'application/json',
    }
  }).then(response => {
    console.log(response.data)
    res.json(response.data)
  }).catch(error => console.log(error.response))
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})