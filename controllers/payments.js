const db = require("../config/db");

const getPayment = (req, res) => {
  db.query("SELECT * FROM payments", (error, result) => {
    if (error) {
      console.error("Gettting error", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  });
};

const getPaymentById = (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM payments WHERE id = ?",
    [id],
    (error, result) => {
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
          message: "Payments not found",
        });
      }
    }
  );
};


const addPayment = (req, res) => {
  const { contract_id, payment_date,amount } = req.body;
  db.query(
    "INSERT INTO payments (contract_id, payment_date,amount )\
    VALUES(?, ?,?)",
    [contract_id, payment_date, amount],
    (error, result) => {
      if (error) {
        console.error("Error adding payments", error);
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

const deletePayment = (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM payments WHERE id = ?",
    [id],
    (error, result) => {
      if (error) {
        console.error("Error fetching data", error);
        return res.status(500).json({ message: "INternational server error" });
      }
      if (result.length > 0) {
        db.query(
          "DELETE FROM payments WHERE id = ?",
          [id],
          (error, result) => {
            if (error) {
              console.error("Error deleted", error);
              return res
                .status(500)
                .json({ message: "INTERNATIONAL Server error" });
            } else {
              res.json({
                message: "payments deleted successfuly",
              });
            }
          }
        );
      } else {
        res.json({
          message: "payments not found",
        });
      }
    }
  );
};


const editpayments = (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM payments WHERE id = ?",
    [id],
    (error, result) => {
      if (error) {
        console.error("Error fetching Payments:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.length > 0) {
        const { contract_id, payment_date,amount } = req.body;
        db.query(
          "UPDATE payments SET contract_id = ?, payment_date =? ,amount = ? WHERE id = ?",
          [contract_id, payment_date,amount, id],
          (error, result) => {
            if (error) {
              console.error("Error updating Payments:", error);
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
          message: "payments not found because this problem You have ",
        });
      }
    }
  );
};

module.exports = {
  getPayment,
  getPaymentById,
  addPayment,
  deletePayment,
  editpayments,
};
