const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load User model
const User = require("../../models/User");
const Customer = require("../../models/Customer");

// @route GET api/adilp / accounts;
// @desc Get all accounts linked with plaid for a specific user
// @access Private
// router.get(
//     "/account",
//     passport.authenticate("jwt", { session: false }),
//     (req, res) => {
//         Customer.find({ userId: req.user.id })
//             .then((accounts) => res.json(accounts))
//             .catch((err) => console.log(err));
//     }
// );

router.post(
  "/:id/bills",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("$$", res);

    // Customer.findOne({
    //   userId: req.body.customerId,
    // })
    Customer.findById(req.params.id)
      .then((account) => {
        if (account) {
          const newBill = new Bill({
            billData: req.body.billData,
          });

          newBill.save().then((bill) => res.json(bill));
        }
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;
