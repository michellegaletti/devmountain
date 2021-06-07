module.exports = {
  getEntry: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    db.entry
      .get_entry(id)
      .then(([diaryEntry]) => {
        res.status(200).send(diaryEntry);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  addToDiary: (req, res) => {
    const db = req.app.get("db");
    const { userId } = req.params;
    const {
      restaurant_name,
      entry_date,
      entry_meal,
      entry_alcohol,
      bathroom_experience,
      customer_experience,
      other,
      genre_id,
    } = req.body;
    if (!userId) {
      return res.status(511).send("User not logged in.");
    }
    db.entry
      .add_to_diary(
        restaurant_name,
        entry_date,
        entry_meal,
        entry_alcohol,
        bathroom_experience,
        customer_experience,
        other,
        genre_id,
        userId
      )
      .then((diaryEntry) => {
        console.log(diaryEntry);
        res.status(200).send(diaryEntry);
      })
      .catch((err) => {
        console.log(err);
        res.status(511).send(err);
      });
  },
  deleteEntry: (req, res) => {
    const db = req.app.get("db");
    const { entry_id, user_id } = req.query;
    if (!user_id) {
      return res.status(511).send("User not logged in.");
    }
    console.log(req.query);
    db.entry
      .delete_entry_from_diary(entry_id, user_id)
      .then((diaryEntry) => {
        console.log(diaryEntry);
        res.status(200).send(diaryEntry);
      })
      .catch((err) => {
        console.log(err);
        res.status(511).send(err);
      });
  },
  editEntry: (req, res) => {
    const db = req.app.get("db");
    const {
      entry_meal,
      entry_alcohol,
      bathroom_experience,
      customer_experience,
      other,
      entry_id,
    } = req.body;
    console.log(req.body);
    const { userId } = req.params;
    console.log(userId);
    if (!userId) {
      return res.status(511).send("User not logged in.");
    }
    db.entry
      .edit_entry(
        entry_meal,
        entry_alcohol,
        bathroom_experience,
        customer_experience,
        other,
        entry_id,
        userId
      )
      .then((diaryEntry) => {
        res.status(200).send(diaryEntry);
      })
      .catch((err) => {
        console.log(err);
        res.status(511).send(err);
      });
  },
};
