let mongoose = require("mongoose");
let router = require("express").Router();
const Org = require("../../models/OrganizationModel");
const Project = require("../../models/ProjectModel");
const User = require("../../models/UserModel");
const Board = require("../../models/BoardModel");
const Ticket = require("../../models/TicketModel");
const Comment = require("../../models/CommentModel");

let {
  OkResponse,
  BadRequestResponse,
  UnauthorizedResponse,
} = require("express-http-response");
const { isAuth } = require("../../validation");

router.post("/getBoardTickets", isAuth, async function (req, res, next) {
  console.log(req.body);
  try {
    let tickets = await Board.findById(req.body.boardId)
      .select(
        "waitingforApproval backlog design todos inprogress inreview testing completed -_id"
      )
      .populate({
        path: "waitingforApproval backlog design todos inprogress inreview testing completed",
        populate: {
          path: "assignees",
        },
      });
    next(new OkResponse(tickets));
  } catch (err) {
    console.log(err);
    next(new BadRequestResponse("Something went wrong.", 422));
  }
});

router.post("/getBoardData", isAuth, async function (req, res, next) {
  //console.log(req.body);
  try {
    let board = await Board.findById(req.body.boardId).populate({
      path: "project",
      populate: {
        path: "lead maintainers members",
      },
    });
    console.log(board);
    next(new OkResponse(board));
  } catch (err) {
    console.log(err);
    next(new BadRequestResponse("Something went wrong.", 422));
  }
});

router.post("/addTicket", isAuth, async function (req, res, next) {
  try {
    let ticket = new Ticket();
    ticket.title = req.body.title;
    ticket.description = req.body.description;
    ticket.status = req.body.status;
    ticket.priority = req.body.priority;
    ticket.type = req.body.type;
    ticket.dueDate = req.body.dueDate;
    ticket.createdBy = req.body.userId;
    ticket.skills = req.body.skills;
    ticket.comments = [];
    ticket.labels = [];
    ticket.assignees = [];
    ticket.board = req.body.boardId;

    ticket
      .save()
      .then((ticket) => {
        Board.findById(req.body.boardId).then(async function (board) {
          console.log("##", board.tickets);
          await board.waitingforApproval.push(ticket._id);
          console.log("##", board.tickets);
          board.save().then(function () {
            next(new OkResponse(ticket));
          });
        });
      })
      .catch((err) => {
        console.log(err);
        next(new BadRequestResponse("Something went wrong.", 422));
      });
  } catch (err) {
    next(new BadRequestResponse("Something went wrong.", 422));
  }
});

router.post("/addComment", isAuth, async function (req, res, next) {
  console.log(req.body);
  try {
    let ticket = await Ticket.findById(req.body.ticketId);
    let comment = new Comment();
    comment.text = req.body.comment;
    comment.user_id = req.user._id;
    comment.ticket_id = req.body.ticketId;

    comment
      .save()
      .then((comment) => {
        ticket.comments.unshift(comment._id);
      })
      .then(() => {
        ticket.save().then(() => {
          next(new OkResponse(comment));
        });
      });
  } catch (err) {
    console.log(err);
    next(new BadRequestResponse("Something went wrong.", 422));
  }
});

router.post("/getComments", isAuth, async function (req, res, next) {
  try {
    let ticket = await Ticket.findById(req.body.ticketId).populate({
      path: "comments",
      populate: {
        path: "user_id",
      },
    });
    next(new OkResponse(ticket.comments));
  } catch (err) {
    console.log(err);
    next(new BadRequestResponse("Something went wrong.", 422));
  }
});

router.post("/deleteTicket", isAuth, async function (req, res, next) {
  try {
    let ticket = await Ticket.findById(req.body.ticketId);
    ticket.isDeleted = true;
    ticket.save().then(() => {
      next(new OkResponse("Ticket deleted successfully."));
    });
  } catch (err) {
    console.log(err);
    next(new BadRequestResponse("Something went wrong.", 422));
  }
});

router.post(
  "/updateBoardTicketsSameLevel",
  isAuth,
  async function (req, res, next) {
    //console.log(req.body);
    try {
      let board = await Board.findById(req.body.boardId);

      let source = req.body.result.source;
      let destination = req.body.result.destination;

      const sourceColumn = board[source.droppableId];
      const sourceItems = [...sourceColumn];
      const [removed] = sourceItems.splice(source.index, 1);
      sourceItems.splice(destination.index, 0, removed);

      board[source.droppableId] = sourceItems;

      board.save().then(function () {
        next(new OkResponse({}));
      });
    } catch (err) {
      console.log(err);
      next(new BadRequestResponse("Something went wrong.", 422));
    }
  }
);

router.post("/updateBoardTickets", isAuth, async function (req, res, next) {
  //console.log(req.body);
  try {
    let board = await Board.findById(req.body.boardId);

    let source = req.body.result.source;
    let destination = req.body.result.destination;

    const sourceColumn = board[source.droppableId];
    const destinationColumn = board[destination.droppableId];
    const sourceItems = [...sourceColumn];
    const destItems = [...destinationColumn];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    board[source.droppableId] = sourceItems;
    board[destination.droppableId] = destItems;

    board.save().then(function () {
      next(new OkResponse({}));
    });
  } catch (err) {
    console.log(err);
    next(new BadRequestResponse("Something went wrong.", 422));
  }
});

router.post("/assignTicket", isAuth, async function (req, res, next) {
  try {
    let ticket = await Ticket.findById(req.body.ticketId);
    ticket.assignees = [req.body.member];
    ticket.status = "in progress";
    ticket.save().then(() => {
      next(new OkResponse({}));
    });
  } catch (err) {
    console.log(err);
    next(new BadRequestResponse("Something went wrong.", 422));
  }
});

router.post("/autoAssign", isAuth, async function (req, res, next) {
  try {
    let tickets = await Ticket.find({ board_id: req.body.boardId });
    console.log(tickets);
    tickets.map((ticket) => {
      if (ticket.assignees == []) {
        ticket.assignees = [req.user._id];
        ticket.save().then(() => {
          next(new OkResponse({}));
        });
      } else {
        next(new OkResponse({}));
      }
    });
    next(new OkResponse({}));
  } catch (err) {
    console.log(err);
    next(new BadRequestResponse("Something went wrong.", 422));
  }
});

module.exports = router;
