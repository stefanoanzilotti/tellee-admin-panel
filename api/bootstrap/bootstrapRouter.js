import express from 'express';
import https from 'https';
import axios from 'axios';
import md5 from 'md5';
require('dotenv').config();

const BootstrapRouter = express.Router();

// -- Connect edge device to Channels --
BootstrapRouter.route('/create').post( async (req, res, next) => {

  const token = req.cookies.auth;
  const { mac, id, channels, name, firmware, cycle, state } = req.body;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };

  const pref_name = `zsse/${name}`;

  const newConnection = {
    "external_id": `${mac}`,
    "external_key": `${md5(mac.toLowerCase())}`,
    "thing_id": `${id}`,
    "name": `${name}`,
    "channels": typeof channels === "string"
      ? [channels]
      : channels,
    "content": `"firmware": ${JSON.stringify(firmware)}, "name": ${JSON.stringify(pref_name)}, "cycle": ${JSON.stringify(cycle)}`,
    "state": state
  };

  try {
    axios.post(`http://${process.env.MAINFLUX_URL}:8200/things/configs`, JSON.stringify(newConnection), config)
      .then( response => {
        res.sendStatus(response.status);
        next();
      })
      .catch( err => {
        return next(err);
      });
  } catch(err) {
    return next(err);
  };

});

// -- Get all confgis in Bootstrap --
BootstrapRouter.route('/').get( async (req, res, next) => {

  const token = req.cookies.auth;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };

  try {
    axios.get(`http://${process.env.MAINFLUX_URL}:8200/things/configs?offset=0&limit=100`, config)
      .then( response => {
        res.send(response.data.configs);
        next();
      })
      .catch( err => {
        return next(err);
      });
  } catch(err) {
    return next(err);
  };

});

// -- Get config by Id in Bootstrap --
BootstrapRouter.route('/:id').get( async (req, res, next) => {

  const hash = md5(req.params.id.toLowerCase())
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': hash,
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };

  try {
    axios.get(`http://${process.env.MAINFLUX_URL}:8200/things/bootstrap/${req.params.id}`, config)
      .then( response => {
        res.send(response.data);
        next();
      })
      .catch( err => {
        return next(err);
      });
  } catch(err) {
    return next(err);
  };

});

// -- Edit config's channels by it's mainflux_id in Bootstrap (channels***) --
BootstrapRouter.route('/edit/channels/:id').put( async (req, res, next) => {

  // Chech for JSON
  if(!req.is('application/json')) {
    next();
    throw new Error("Expects content-type 'application/json'");
  }

  const token = req.cookies.auth;
  const { mac, id, channels, name, firmware, cycle, state } = req.body;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    })
  };

  const pref_name = `zsse/${name}`;

  const editedConfig = {
    "external_id": `${mac}`,
    "external_key": `${md5(mac.toLowerCase())}`,
    "thing_id": `${id}`,
    "name": `${name}`,
    "channels": typeof channels === "string"
      ? [channels]
      : channels,
    "content": `"firmware": ${JSON.stringify(firmware)}, "name": ${JSON.stringify(pref_name)}, "cycle": ${JSON.stringify(cycle)}`,
    "state": state
  };

  try {
    axios.put(`http://${process.env.MAINFLUX_URL}:8200/things/configs/connections/${req.params.id}`,
    editedConfig, config)
      .then( response => {
        res.sendStatus(response.status);
        next();
      })
      .catch( err => {
        return next(err);
      });
  } catch(err) {
    return next(err);
  };

});

// -- Edit config info by it's mainflux_id in Bootstrap (name, content***) --
BootstrapRouter.route('/edit/info/:id').put( async (req, res, next) => {

  // Chech for JSON
  if(!req.is('application/json')) {
    next();
    throw new Error("Expects content-type 'application/json'");
  }

  const token = req.cookies.auth;
  const { mac, id, channels, name, firmware, cycle, state } = req.body;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    })
  };

  const pref_name = `zsse/${name}`;

  const editedConfig = {
    "external_id": `${mac}`,
    "external_key": `${md5(mac.toLowerCase())}`,
    "thing_id": `${id}`,
    "name": `${name}`,
    "channels": typeof channels === "string"
      ? [channels]
      : channels,
    "content": `"firmware": ${JSON.stringify(firmware)}, "name": ${JSON.stringify(pref_name)}, "cycle": ${JSON.stringify(cycle)}`,
    "state": state
  };

  try {
    axios.put(`http://${process.env.MAINFLUX_URL}:8200/things/configs/${req.params.id}`,
    editedConfig, config)
      .then( response => {
        res.sendStatus(response.status);
        next();
      })
      .catch( err => {
        return next(err);
      });
  } catch(err) {
    return next(err);
  };

});

// -- Edit config's state by it's mainflux_id in Bootstrap (name, content***) --
BootstrapRouter.route('/edit/state/:id').put( async (req, res, next) => {

  // Chech for JSON
  if(!req.is('application/json')) {
    next();
    throw new Error("Expects content-type 'application/json'");
  }

  const token = req.cookies.auth;
  const { mac, id, channels, name, firmware, cycle, state } = req.body;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    })
  };

  const pref_name = `zsse/${name}`;

  const editedConfig = {
    "external_id": `${mac}`,
    "external_key": `${md5(mac.toLowerCase())}`,
    "thing_id": `${id}`,
    "name": `${name}`,
    "channels": typeof channels === "string"
      ? [channels]
      : channels,
    "content": `"firmware": ${JSON.stringify(firmware)}, "name": ${JSON.stringify(pref_name)}, "cycle": ${JSON.stringify(cycle)}`,
    "state": state
  };

  try {
    axios.put(`http://${process.env.MAINFLUX_URL}:8200/things/state/${req.params.id}`,
    editedConfig, config)
      .then( response => {
        res.sendStatus(response.status);
        next();
      })
      .catch( err => {
        return next(err);
      });
  } catch(err) {
    return next(err);
  };

});

// -- Edit config's state by it's mainflux_id in Bootstrap (name, content***) --
BootstrapRouter.route('/remove/:id').delete( async (req, res, next) => {

  // Chech for JSON
  if(!req.is('application/json')) {
    next();
    throw new Error("Expects content-type 'application/json'");
  }

  const token = req.cookies.auth;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    })
  };

  try {
    axios.delete(`http://${process.env.MAINFLUX_URL}:8200/things/configs/${req.params.id}`, config)
      .then( response => {
        res.sendStatus(response.status);
        next();
      })
      .catch( err => {
        return next(err);
      });
  } catch(err) {
    return next(err);
  };

});

export default BootstrapRouter;