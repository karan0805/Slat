let mongoose = require("mongoose");
let router = require("express").Router();
const Org = require("../../models/OrganizationModel");
const Project = require("../../models/ProjectModel");
const User = require("../../models/UserModel");
const Board = require("../../models/BoardModel");

let {
  OkResponse,
  BadRequestResponse,
  UnauthorizedResponse,
} = require("express-http-response");
const { isAuth } = require("../../validation");
const mail = require("./../../config/mailer");

router.post("/addProject", isAuth, async function (req, res, next) {
  console.log(req.body);
  let newProject = new Project();
  newProject.name = req.body.projectName;
  newProject.description = req.body.projectDescription;
  newProject.image = `https://avatars.dicebear.com/api/identicon/${req.body.projectName}.svg`;
  newProject.startDate = new Date();
  newProject.endDate = req.body.endDate;
  newProject.status = "Not Started";
  newProject.org = req.body.orgId;
  newProject.lead = req.body.lead;

  newProject
    .save()
    .then(function (project) {
      Org.findById(req.body.orgId).then(function (org) {
        org.projects.push(project._id);
        org.save().then(function (org) {
          next(new OkResponse({}));
        });
      });
    })
    .catch(function (err) {
      console.log(err);
      next(new BadRequestResponse("Something went wrong.", 422));
    });
});

router.post("/getProjectDetails", isAuth, async function (req, res, next) {
  console.log(req.body);
  try {
    let project = await Project.findById(req.body.projectId).populate(
      "lead fullName"
    );
    next(new OkResponse(project));
  } catch (err) {
    console.log(err);
    next(new BadRequestResponse("Something went wrong.", 422));
  }
});

router.post("/getMembers", isAuth, async function (req, res, next) {
  console.log(req.body);
  try {
    let projects = await Project.findById(req.body.projectId)
      .select("name lead members maintainers")
      .populate("lead")
      .populate("members")
      .populate("maintainers");
    next(new OkResponse(projects));
  } catch (err) {
    console.log(err);
    next(new BadRequestResponse("Something went wrong.", 422));
  }
});

router.post("/addMember", isAuth, async function (req, res, next) {
  console.log(req.body);
  try {
    let project = await Project.findById(req.body.projectId);
    let role = req.body.role;
    if (role === "maintainer") {
      if (project.maintainers.includes(req.body.userId)) {
        next(new BadRequestResponse("Already a maintainer"));
      } else {
        project.members.remove(req.body.userId);
        project.maintainers.push(req.body.userId);
      }
    } else if (role === "member") {
      if (project.members.includes(req.body.userId)) {
        next(new BadRequestResponse("Already a member"));
      } else {
        project.maintainers.remove(req.body.userId);
        project.members.push(req.body.userId);
      }
    }
    project.save().then(function (project) {
      next(new OkResponse({}));
    });
  } catch (err) {
    console.log(err);
    next(new BadRequestResponse("Something went wrong.", 422));
  }
});

router.post("/addProjectBoard", isAuth, async function (req, res, next) {
  console.log(req.body);
  let newBoard = new Board();
  newBoard.name = req.body.boardName;
  newBoard.description = req.body.boardDescription;
  newBoard.image = `https://avatars.dicebear.com/api/initials/${req.body.boardName}.svg`;
  newBoard.project = req.body.projectId;

  newBoard
    .save()
    .then(function (board) {
      Project.findById(req.body.projectId).then(function (project) {
        project.boards.push(board._id);
        project.status = "In Progress";
        project.save().then(function () {
          next(new OkResponse({}));
        });
      });
    })
    .catch(function (err) {
      console.log(err);
      next(new BadRequestResponse("Something went wrong.", 422));
    });
});

router.post("/getProjectBoards", isAuth, async function (req, res, next) {
  console.log(req.body);

  Project.findById(req.body.projectId)
    .populate("boards")
    .then(function (project) {
      next(new OkResponse(project.boards));
    });
});

module.exports = router;
