const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load User model
const User = require("../../models/User");
const Customer = require("../../models/Customer");
const Bills = require("../../models/bills");
// @route GET api/adilp / accounts;
// @desc Get all accounts linked with plaid for a specific user
// @access Private
router.get(
  "/account",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Customer.find({ userId: req.user.id })
      .then((accounts) => res.json(accounts))
      .catch((err) => console.log(err));
  }
);

router.get(
  "/account/:id/bills",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Bills.find({ userId: req.params.id })
      .then((bills) => res.json(bills))
      .catch((err) => console.log(err));
  }
);

router.post(
  "/account/:id/bills",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Customer.findOne({
    //   userId: req.body.customerId,
    // })
    const userId = req.params.id;

    Customer.findById(req.params.id)
      .then((account) => {
        if (account) {
          const newBill = new Bill({
            userId: userId,
            billData: req.body,
          });

          newBill.save().then((bill) => res.json(bill));
        }
      })
      .catch((err) => console.log(err));
  }
);

// @route POST api/plaid/accounts/add
// @desc Trades public token for access token and stores credentials in database
// @access Private
router.post(
  "/account/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // PUBLIC_TOKEN = req.body.public_token;
    // console.log("##", res);
    const userId = req.user.id;

    // Check if account already exists for specific user
    Customer.findOne({
      userId: req.body.userId,
      // institutionId: institution_id,
    })
      .then((account) => {
        if (account) {
          console.log("Account already exists");
        } else {
          const newAccount = new Account({
            userId: userId,
            name: req.body.name,
            number: req.body.moNumber,
            bills: req.body.bills,
          });

          newAccount.save().then((account) => res.json(account));
        }
      })
      .catch((err) => console.log(err)); // Mongo Error
  }
);

// @route DELETE api/plaid/accounts/:id
// @desc Delete account with given id
// @access Private
router.delete(
  "/account/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Customer.findById(req.params.id).then((account) => {
      // Delete account
      account.remove().then(() => res.json({ success: true }));
    });
  }
);

module.exports = router;
