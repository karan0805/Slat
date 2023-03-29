let mongoose = require("mongoose");
let router = require("express").Router();
const Org = require("../../models/OrganizationModel");
const User = require("../../models/UserModel");
const Event = require("../../models/EventModel");

let {
  OkResponse,
  BadRequestResponse,
  UnauthorizedResponse,
} = require("express-http-response");
const { isAuth } = require("../../validation");
const mail = require("./../../config/mailer");

router.post("/addOrg", isAuth, async function (req, res, next) {
  let user = await User.findById(req.user._id);
  let newOrg = new Org();
  newOrg.orgName = req.body.orgName;
  newOrg.orgDesc = req.body.orgDesc;
  newOrg.owner = req.user._id;
  newOrg.members = [req.user._id];

  newOrg
    .save()
    .then(function (org) {
      user.org.push(org._id);
      user
        .save()
        .then(function (user) {
          next(new OkResponse({}));
        })
        .catch(function (err) {
          console.log(err);
          next(new BadRequestResponse("Something went wrong.", 422));
        });
    })
    .catch(function (err) {
      console.log(err);
      next(new BadRequestResponse("Something went wrong.", 422));
    });
});

router.post("/switchOrg", isAuth, async function (req, res, next) {
  try {
    let org = await Org.findById(req.body.orgId).populate(
      "projects",
      "name image"
    );
    let active = await Org.findById(req.body.orgId).select("_id orgName owner");

    next(
      new OkResponse({
        activeOrg: active,
        orgDetails: org,
      })
    );
  } catch (err) {
    console.log(err);
    next(new BadRequestResponse("Something went wrong.", 422));
  }
});

router.post("/joinOrg", isAuth, async function (req, res, next) {
  let user = await User.findById(req.user._id);
  let org = await Org.findById(req.body.orgId);

  if (!org.members.includes(req.user._id)) {
    org.members.push(user._id);
    org
      .save()
      .then(function (org) {
        user.org.push(org._id);
        user
          .save()
          .then(function (user) {
            next(new OkResponse({}));
          })
          .catch(function (err) {
            console.log(err);
            next(new BadRequestResponse("Something went wrong.", 422));
          });
      })
      .catch(function (err) {
        console.log(err);
        next(new BadRequestResponse("Something went wrong.", 422));
      });
  } else {
    next(
      new BadRequestResponse(
        "You are already a member of this Organization",
        422
      )
    );
  }
});

router.post("/deleteOrg", isAuth, async function (req, res, next) {
  if (req.user._id == req.body.activeOrg.owner) {
    try {
      let org = await Org.findById(req.body.activeOrg._id);

      if (org.canDelete) {
        let user = await User.findById(req.user._id);

        org.members.forEach(async (member) => {
          let user = await User.findById(member);
          user.org.splice(user.org.indexOf(req.body.orgId), 1);
          await user.save();
        });

        await org.remove();
        next(new OkResponse({}));
      } else {
        next(new BadRequestResponse("You Can Remove Personal Workspace", 422));
      }
    } catch (err) {
      console.log(err);
      next(new BadRequestResponse("Something went wrong.", 422));
    }
  } else {
    next(new UnauthorizedResponse("Unauthorized", 401));
  }
});

router.post("/orgsettings", isAuth, async function (req, res, next) {
  if (req.user._id == req.body.activeOrg.owner) {
    try {
      let org = await Org.findById(req.body.activeOrg._id);
      org.orgName = req.body.orgName;
      org.orgDesc = req.body.orgDesc;
      req.body.activeOrg.orgName = req.body.orgName;
      org.save();
      next(new OkResponse({ activeOrg: req.body.activeOrg, orgDetails: org }));
    } catch (err) {
      console.log(err);
      next(new BadRequestResponse("Something went wrong.", 422));
    }
  } else {
    next(new UnauthorizedResponse("Unauthorized", 401));
  }
});

router.post("/getmembers", isAuth, async function (req, res, next) {
  try {
    console.log(req.body);
    let org = await Org.findById(req.body.activeOrg._id);
    let users = await User.find({ _id: { $in: org.members } }).select(
      "_id username fullName email image"
    );
    next(new OkResponse(users));
  } catch (err) {
    console.log(err);
    next(new BadRequestResponse("Something went wrong.", 422));
  }
});

router.post("/getprojects", isAuth, async function (req, res, next) {
  try {
    console.log(req.body);
    let org = await Org.findById(req.body.activeOrg._id).populate({
      path: "projects",
      populate: {
        path: "lead",
      },
    });
    next(new OkResponse(org.projects));
  } catch (err) {
    console.log(err);
    next(new BadRequestResponse("Something went wrong.", 422));
  }
});

router.post("/inviteOrg", (req, res) => {
  console.log(req.body);

  try {
    mail.sendInvite({
      from: " Slat - A Workflow Management System <slat@karan0805.me>",
      to: req.body.Email,
      subject: "Invitation to Join Organization",
      templateObj: {
        variables: req.body,
      },
    });
    res.send(new OkResponse({}));
  } catch (err) {
    console.log(err);
  }
});

router.post("/addEvent", isAuth, async function (req, res, next) {
  console.log(req.body);
  try {
    let org = await Org.findById(req.body.activeOrg._id);
    let newEvent = new Event();
    newEvent.title = req.body.title;
    newEvent.type = req.body.type;
    newEvent.org = org._id;
    if (req.body.type == "custom") {
      newEvent.start = req.body.eventDate[0];
      newEvent.end = req.body.eventDate[1];
    } else {
      newEvent.start = req.body.eventDate;
      newEvent.end = req.body.eventDate;
    }
    await org.save();
    await newEvent.save();
    next(new OkResponse({}));
  } catch (err) {
    console.log(err);
    next(new BadRequestResponse("Something went wrong.", 422));
  }
});

router.post("/getEvents", isAuth, async function (req, res, next) {
  try {
    let org = await Org.findById(req.body.activeOrg._id);
    let events = await Event.find({ org: org._id });
    next(new OkResponse(events));
  } catch (err) {
    console.log(err);
    next(new BadRequestResponse("Something went wrong.", 422));
  }
});

module.exports = router;
