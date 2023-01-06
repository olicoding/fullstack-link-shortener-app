const express = require("express");
const router = express.Router();

const linkController = require("../controllers/linkController");

router.get("/list", linkController.list);
router.post("/validate", linkController.validate);
router.post("/add", linkController.add);
router.delete("/delete/:_id", linkController.delete);
router.get("/redirect/:shortUrl", linkController.redirectLink);

module.exports = router;
