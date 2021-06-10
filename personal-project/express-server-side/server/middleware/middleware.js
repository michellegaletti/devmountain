module.exports = {
  auth: (req, res, next) => {
    const { userId } = req.params;
    console.log(req.params);
    if (!userId) {
      return res.status(511).send("User not logged in.");
    }
    next();
  },
};
