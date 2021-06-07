module.exports = {
  getAllEntries: (req, res) => {
    const db = req.app.get("db");
    const { userId } = req.params;
    db.diary
      .get_all_entries(userId)
      .then((allDiary) => {
        res.status(200).send(allDiary);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  },
};
