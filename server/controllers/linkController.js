const Link = require("../models/Link");
const urlRegex = require("url-regex");
const axios = require("axios");

module.exports.list = async (req, res) => {
  try {
    const links = await Link.find();

    if (!links) return res.send({ success: false, errorId: 1 });

    // console.log("list handler - sending true: links -> ", links);
    res.send({ success: true, links: links });
  } catch (err) {
    console.log("Error on linkController.list: ", err.message);

    res.send({ success: false, error: err.message });
  }
};

module.exports.validate = async (req, res) => {
  try {
    let incomingLink = req.body.incomingLink;
    console.log("incomingLink -> ", incomingLink);

    let regex = urlRegex({ exact: true, strict: false });
    regex = new RegExp(regex.source, "s");

    if (regex.test(incomingLink)) {
      const response = await axios.get(incomingLink);
      if (response.status >= 200 && response.status < 300) {
        console.log("URL is valid and reachable");
        res.send({ success: true });
      } else {
        console.log("URL validation - link is not valid or reachable");
        res.send({ success: false });
      }
    } else {
      res.send({ success: false });
    }
  } catch (err) {
    console.log("Error on link validation: ", err.message);
    res.send({ success: false });
  }
};

module.exports.add = async (req, res) => {
  try {
    const newLink = await Link.create(req.body);

    if (!newLink) return res.send({ success: false, errorId: 1 });

    res.send({ success: true, newLink });
  } catch (err) {
    console.log("Error on linkController.add: ", err.message);
    res.send({ success: false, error: err.message });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const deletedLink = await Link.findByIdAndDelete(req.params._id);

    if (!deletedLink) return res.send({ success: false, errorId: 1 });

    res.send({ success: true });
  } catch (err) {
    console.log("Error on linkController.delete: ", err.message);
    res.send({ success: false, error: err.message });
  }
};

module.exports.redirectLink = async (req, res) => {
  try {
    const shortUrl = await Link.findOne({ shortUrl: req.params.shortUrl });

    if (!shortUrl)
      return res.status(404).send({ success: false, error: "Link not found" });

    shortUrl.clicks++;
    shortUrl.save();

    res.status(200).send({ redirectUrl: shortUrl.originalUrl });
  } catch (err) {
    console.log("Error on shortLink redirecting: ", err.message);
    res.status(500).send({ success: false, error: err.message });
  }
};
