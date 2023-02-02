const { request } = require('express');
const express = require('express')
const router = express.Router();
const userModel = require('./Model')
const successResponse = ({ message, data }) => ({ success: true, data: data ? data : null, message });
const failResponse = ({ message, data }) => ({ success: false, data: data ? data : null, message });

router.get('/', (req, res) => {
  res.send('server is running')
})
router.post('/create', async (req, res) => {
  const user = await userModel.find({ email: req.body.email });
  if (user.length < 1) {
    try {
      let requestBody = {
        name: req.body.name,
        email: req.body.email,
      }
      const newCompany = new userModel(requestBody);
      await newCompany.save();
      res.status(200).send(
        successResponse({
          message: 'User Created Successfully!',
        })
      );
    } catch (err) {
      res.status(500).send(
        failResponse({
          message: err ? err.message : "User Not Created!"
        })
      );
    }
  }
  else {
    try {
      if (user.length > 0) {
        userModel.updateOne(
          { email: req.body.email },
          {
            $set: {
              name: req.body.name,
              email: req.body.email,
              type: req.body.type,
              socketid: req.body.socketid
            }
          },
          function (err, result) {
            if (err) throw err;
            else {
              res.send(result)
            }
          }
        );
      }
    } catch (err) {
      res.status(500).send(
        "Failed"
      );
    }

  }
})
router.get('/getusers', async (req, res) => {
  try {
    const users = await userModel.find({}).sort({ _id: -1 });
    res.status(200).send(
      successResponse({
        message: 'Users Retrieved Successfully!',
        data: users
      })
    )
  } catch (err) {
    res.status(500).send(
      failResponse({
        message: err ? err.message : "Users Not Fetched!"
      })
    );
  }
})
router.delete('/user/:email', async(req, res) => {
  console.log(req.params)
  try{
    const users = await userModel.findOneAndDelete({email:req.params.email}).sort({ _id: -1 });
  res.status(200).send(
    successResponse({
      message: 'Users Deleted Successfully!',
      data: users
    })
  )
  }
  catch (err) {
    res.status(500).send(
      failResponse({
        message: err ? err.message : "Users Not Deleted!"
      })
    );
  }
});



module.exports = router