const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
  let parents = [];
  let parent = {};
  User.find({ role: "parent" })
    .then((result) => {
      result.map((data) => {
        parent.fullName = data.fullName;
        parent.email = data.email;
        parent.role = data.role;

        parents.push(parent);
      });
      res.status(200).json({ parents: parents });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
