/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Tile = require("./models/tile");
const WaterProfile = require("./models/waterProfile");

const wu = require('./waterUtil');
// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
// const socket = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

// router.post("/initsocket", (req, res) => {
//   // do nothing if user not logged in
//   if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
//   res.send({});
// });

router.get("/test", (req, res) => {
  res.send({message:"hello world"});
});

router.get("/tilesByUser", (req, res) => {
  Tile.find({creator_id: req.query.creator_id}).then((tiles) => {
    res.send(tiles);
  });
});

router.get("/tileIDsByUser", (req, res) =>{
  Tile.find({creator_id:req.query.creator_id}).select('_id').then((tileIDs) => {
    res.send(tileIDs);
  });
});

router.get("/tileByID", (req, res) =>{
  Tile.findById({_id:req.query.tileID}).then((tile) =>
    res.send(tile))
});

router.get("/all_tiles", (req, res) => {
  Tile.find({}).then((tiles) => {
    res.send(tiles);
    res.send("tiles printed in console");
  });
});

router.post("/updateTile", (req, res) =>{
  try {
    Tile.findByIdAndUpdate(req.body.id, req.body.updateObj).then(()=>{
      Tile.findById({_id:req.body.id}).then((obj)=>console.log(obj));
    });
  }
  catch(err){
    res.sendStatus(500);
    res.send({error:err})
  }
});
router.post("/newTile", (req,res) => {
  const newTile = new Tile({
    creator_id:req.body.creator_id,
    xGrid: req.body.tile.xGrid,
    zGrid: req.body.tile.zGrid,
    flower: req.body.tile.flower,
    growthState:req.body.tile.growthState,
  });
  newTile.save().then((tile) => res.send(tile));
});

router.post("/setWaterProfile", (req, res)=> {
  console.log(req.body);
  const userProfile = {
    weight:parseInt(req.body.weight),
    activity:parseInt(req.body.activity),
    age:parseInt(req.body.age),
    cupSize:parseInt(req.body.cupSize)
  };
  console.log("user info: ", userProfile);
  const waterProfile = new WaterProfile({
    ...userProfile,
    waterPerDay:wu.ozWaterPerDay(userProfile),
    waterConsumedToday:0,
  });
  waterProfile.save().then(()=> {
    res.send(waterProfile);
    console.log("added new waterProfile: ", waterProfile)});
});
router.post("/updateWaterConsumed", (req, res) =>{
  try {
    WaterProfile.findOneAndUpdate({userId:req.body.userId}, req.body.updatedWaterProfile).then(()=>{
      WaterProfile.findOne({userId:req.body.userId}).then((profile)=>console.log("updated water profile: ", profile))
    });
  }
  catch(err){
    res.sendStatus(500);
    res.send({error:err})
  }
});

router.get("/getWaterProfile", (req, res) =>{
  WaterProfile.findOne({userId: req.body.userId}).then(waterProfile => res.send(waterProfile))
});
// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
