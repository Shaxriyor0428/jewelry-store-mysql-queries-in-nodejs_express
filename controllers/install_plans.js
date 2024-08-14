const db = require("../config/db");

const getInstall = (req, res) => {
  db.query("SELECT * FROM Installment_Plans", (error, result) => {
    if (error) {
      console.error("Gettting error", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  });
};

const getInstallById = (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM Installment_Plans WHERE id = ?",
    [id],
    (error, result) => {
      if (error) {
        console.error("Error fetching Installment_Plans:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.length > 0) {
        res.json({
          message: "OK",
          data: result,
        });
      } else {
        res.json({
          message: "Installment_Plans not found",
        });
      }
    }
  );
};


const addInstallPlan = (req, res) => {
  const { months, months_rate } = req.body;
  db.query(
    "INSERT INTO Installment_Plans(months,months_rate )\
    VALUES(?, ?)",
    [months, months_rate],
    (error, result) => {
      if (error) {
        console.error("Error adding Installment_Plans", error);
        return res.status(500).json({ message: "Internal Server error" });
      } else {
        res.json({
          message: "OK qo'shildi",
          customer_id: result.insertId,
        });
      }
    }
  );
};

const deleteInstallPlan = (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM Installment_Plans WHERE id = ?",
    [id],
    (error, result) => {
      if (error) {
        console.error("Error fetching data", error);
        return res.status(500).json({ message: "INternational server error" });
      }
      if (result.length > 0) {
        db.query(
          "DELETE FROM Installment_Plans WHERE id = ?",
          [id],
          (error, result) => {
            if (error) {
              console.error("Error deleted", error);
              return res
                .status(500)
                .json({ message: "INTERNATIONAL Server error" });
            } else {
              res.json({
                message: "Installment_Plans deleted successfuly",
              });
            }
          }
        );
      } else {
        res.json({
          message: "Installment_Plans not found",
        });
      }
    }
  );
};

const editInstallPlans = (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM Installment_Plans WHERE id = ?",
    [id],
    (error, result) => {
      if (error) {
        console.error("Error fetching Installment_Plans:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.length > 0) {
        const { months, months_rate } = req.body;
        db.query(
          "UPDATE Installment_Plans SET months= ?, months_rate =?  WHERE id = ?",
          [months, months_rate, id],
          (error, result) => {
            if (error) {
              console.error("Error updating Installment_Plans:", error);
              return res.status(500).json({ message: "Internal Server Error" });
            } else {
              res.json({
                message: "Updated successfully",
              });
            }
          }
        );
      } else {
        res.status(404).json({
          message: "Installment_Plans not found because this problem You have ",
        });
      }
    }
  );
};

module.exports = {
  getInstall,
  getInstallById,
  addInstallPlan,
  deleteInstallPlan,
  editInstallPlans,
};
