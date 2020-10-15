const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const router = express.Router();
const ReservationBook = require('../models/ReservationBook');
const ReservationProduct = require('../models/ReservationBook');

const User = require("../models/User");
const Group = require("../models/Group");

router.post("", async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(409).json({
      message: "student already exist",
    });
  }

  user = new User(
    _.pick(req.body, [
      "_id",
      "fullName",
      "email",
      "password",
      "role",
      "emailParent",
      "section",
      "group",
      "payement",
    ])
  );
  const saltRounds = 10;
  let salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(user.password, salt);

  await Group.findById(user.group)
    .then((group) => {
      if (group.students.indexOf(user._id) == -1) {
        group.students.push(user._id);
      }
      group.save();
    })
    .catch((err) => {
      console.log(err);
    });
  await user
    .save()
    .then((userCreated) => {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "askribilel123@gmail.com",
          pass: "bilel123express#",
        },
      });

      const email = req.body.email;
      var mailOptions = {
        from: "bilel123express#",
        to: email,
        subject: "Account Created Successfuly!!",
        html:
          "<h3> your account successfully created on education system application!!</h3> <br><br><strong> Email:</strong> " +
          req.body.email +
          "<br><strong> Password:</strong> " +
          req.body.password +
          "<br><strong> Role:</strong> " +
          req.body.role,
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent" + info.response);
        }
      });

      res.status(201).json({
        message: "student created",
        user: _.pick(userCreated, [
          "_id",
          "fullName",
          "email",
          "role",
          "emailParent",
          "section",
          "group",
          "payement",
        ]),
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('', (req, res) => {
  let count;
  let students = [];
  let student = {};
  User.countDocuments({role: 'student'}).then((result) => {
    count = result;
  })
  User.find({role: 'student'})
      .populate("section", "name")
      .populate("group", "name")
      .select("-password")
      .then((result) => {
        result.forEach((data) => {
          student.fullName = data.fullName;
          student.email = data.email;
          student.role = data.role;
          student.emailParent = data.emailParent;
          student._id = data._id;
          student.section = data.section.name;
          student.group = data.group.name;
          student.payement = data.payement;

          students.push(student);
          student = {};
        })
        res.status(200).json({students: students, count: count})
      }).catch(error => res.status(500).json({message: 'an error occurred'}))
});

// router.get("", (req, res) => {
//   const pageSize = +req.query.pagesize;
//   const currentPage = +req.query.page;
//   const filter = req.query.search;
//   const studentQuery = User.find({
//     $and: [
//       { role: "student" },
//       {
//         $or: [{ fullName: { $regex: filter } }, { email: { $regex: filter } }],
//       },
//     ],
//   })
//     .populate("section", "name")
//     .populate("group", "name");
//   let count;
//   User.countDocuments({ role: "student" }).then((result) => {
//     count = result;
//   });
//   let students = [];
//   let student = {};
//   if (pageSize && currentPage) {
//     studentQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
//   }
//   studentQuery
//     .then((result) => {
//       result.forEach((data) => {
//         student.fullName = data.fullName;
//         student.email = data.email;
//         student.role = data.role;
//         student.emailParent = data.emailParent;
//         student._id = data._id;
//         student.section = data.section.name;
//         student.group = data.group.name;
//         student.payement = data.payement;

//         students.push(student);
//         student = {};
//       });
//       res.status(200).json({
//         message: "student fetched successfuly!",
//         count: count,
//         students: students,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         message: 'can not find students'
//       });
//     });
// });

router.put("/:id", (req, res) => {
  console.log(req.params.id);
  User.findById(req.params.id).then((student) => {
    student.fullName = req.body.fullName;
    student.email = req.body.email;
    student.emailParent = req.body.emailParent;
    student.section = req.body.section;
    student.group = req.body.group;
    student.payement = req.body.payement;

    console.log(student);
    student
      .save()
      .then(() => {
        res.status(201).json({
          message: "student updated successfuly",
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "student not updated",
        });
      });
  });
});

router.delete("/:id", async (req, res) => {
  let reserBook;
  let reserProduct;

  await ReservationBook.findOne({user: req.params.id}).then((result) => {
    if(result) {
      reserBook = result
    }
    // console.log(result)
  }).catch(error => res.status(500).json({message: 'deleting user failed!'}))
 
  await ReservationProduct.findOne({user: req.params.id}).then((result2) => {
    if(result2) {
      reserProduct = result2
    }
    // console.log(result2);
   }).catch(error => res.status(500).json({message: 'deleting user failed'}))
     

  if(reserBook || reserProduct) {
    res.status(403).json({message: 'user has a reservation can not delete'})
  } else {
    await User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "student deleted successfuly",
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  
});

module.exports = router;
