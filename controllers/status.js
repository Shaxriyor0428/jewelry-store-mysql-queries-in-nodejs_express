const db = require("../config/db");

const getStatus = (req, res) => {
  db.query("SELECT * FROM status", (error, result) => {
    if (error) {
      console.error("Gettting error", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  });
};

const getStatusById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM status WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching Payments:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      res.json({
        message: "OK",
        data: result,
      });
    } else {
      res.json({
        message: "status not found",
      });
    }
  });
};

const addStatus = (req, res) => {
  const { name, contract_status } = req.body;
  db.query(
    "INSERT INTO status (name, contract_status )\
    VALUES(?, ?)",
    [name, contract_status],
    (error, result) => {
      if (error) {
        console.error("Error adding status", error);
        return res.status(500).json({ message: "Internal Server error" });
      } else {
        res.json({
          message: "OK qo'shildi",
          status: result.insertId,
        });
      }
    }
  );
};


const deleteStatus = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM status WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching data", error);
      return res.status(500).json({ message: "INternational server error" });
    }
    if (result.length > 0) {
      db.query("DELETE FROM status WHERE id = ?", [id], (error, result) => {
        if (error) {
          console.error("Error deleted", error);
          return res
            .status(500)
            .json({ message: "INTERNATIONAL Server error" });
        } else {
          res.json({
            message: "status deleted successfuly",
          });
        }
      });
    } else {
      res.json({
        message: "status not found",
      });
    }
  });
};



const editStatus = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM status WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching status:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      const { name, contract_status } = req.body;
      db.query(
        "UPDATE status SET name = ?, contract_status =?  WHERE id = ?",
        [name, contract_status, id],
        (error, result) => {
          if (error) {
            console.error("Error updating Status:", error);
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
        message: "Status not found because this problem You have ",
      });
    }
  });
};

module.exports = {
  getStatus,
  getStatusById,
  addStatus,
  deleteStatus,
  editStatus,
};
