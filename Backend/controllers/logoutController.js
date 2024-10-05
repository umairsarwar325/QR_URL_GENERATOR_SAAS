const logoutController =  (req, res) => {
  console.log("object");
  res.cookie("token", "");

  res.json({
    logoutSuccess: true,
    message: "User logged out successfully",
  });
};

module.exports = logoutController;
