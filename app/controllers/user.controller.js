exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.basicBoard = (req, res) => {
  res.status(200).send("Basic Content.");
};

exports.premiumBoard = (req, res) => {
  res.status(200).send("Premium Content.");
};
