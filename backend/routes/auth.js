const express = require("express")
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "mahajangood$boy";
//  Route 1 create usser using :post "/api/auth". doesnt require auth 
router.post("/createuser",
  [body("email").isEmail(),
  body("name", "enter valid name ").isLength({ min: 3 }),
  body("password").isLength({ min: 5 }),],
  async (req, res) => {
    let success=false;
    //if there are errors , return bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // check thhe user exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      // console.log(user);
      if (user) {
        return res.status(400).json({success, error: "sorry user with email already xits " })
      }
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      //create user
      user = await User.create({
        name: req.body.name,
        password: secpass,
        email: req.body.email,

      })
      //.then(user=>res.json(user))
      //.catch(err=>{console.log(err)
      //res.json({error:"enterr unique value "})})

      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log({ authtoken });
      // res.json(user)
      success=true;
      res.json({success, authtoken })
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error occur")
    }


  })

//  Route 2 authenticate user using :post "/api/auth/login" no login required
router.post("/login",
  [body("email", "enter the valid email").isEmail(),
  body("password", "password can not be blank ").exists()],

  async (req, res) => {
   let success=false
    //if there are errors , return bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false
        return res.status(400).json({ success,error: "please try to login with correct login " })
      }
      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        success=false
        return res.status(400).json({success, error: "please try to login with correct login " })
      }
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error occur")
    }


  })
// Route 3 get logged in user details using:post "api/auth/getuser" login required 
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;

    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    // res.status(500).send("internal server error occur")
  }
})
module.exports = router;