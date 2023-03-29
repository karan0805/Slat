let router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/users", require("./users"));
router.use("/org", require("./org"));
router.use("/project", require("./project"));
router.use("/board", require("./board"));

module.exports = router;
