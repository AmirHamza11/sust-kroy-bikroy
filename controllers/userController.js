exports.updateUser = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {},
  });
};

exports.getUser = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      param: req.params.id,
    },
  });
};
