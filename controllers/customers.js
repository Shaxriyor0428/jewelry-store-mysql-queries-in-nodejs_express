const db = require("../config/db");

const getCustomer = (req, res) => {
  db.query("SELECT * FROM customers", (error, result) => {
    if (error) {
      console.error("Gettting error", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  });
};


const getCustomerById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM customers WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching flower:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      res.json({
        message: "OK",
        data: result,
      });
    } else {
      res.json({
        message: "Customer not found",
      });
    }
  });
};

const addCustomer = (req, res) => {
  const { full_name, email, phone, address ,passport_info} = req.body;
  db.query(
    "INSERT INTO customers(full_name, email, phone, address ,passport_info )\
    VALUES(?, ?, ?, ?, ?)",
    [full_name, email, phone, address, passport_info],
    (error, result) => {
      if (error) {
        console.error("Error adding customer", error);
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

const customerDeleteById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM customers WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching data", error);
      return res.status(500).json({ message: "INternational server error" });
    }
    if (result.length > 0) {
      db.query("DELETE FROM customers WHERE id = ?", [id], (error, result) => {
        if (error) {
          console.error("Error deleted", error);
          return res
            .status(500)
            .json({ message: "INTERNATIONAL Server error" });
        } else {
          res.json({
            message: "Customer deleted successfuly",
          });
        }
      });
    } else {
      res.json({
        message: "Customer not found",
      });
    }
  });
};


const editCustomerById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM customers WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching customers:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      const { full_name, email, phone, address, passport_info } = req.body;
      db.query(
        "UPDATE customers SET full_name = ?, email = ?, phone = ?,  address = ?, passport_info = ? WHERE id = ?",
        [full_name, email, phone, address, passport_info, id],
        (error, result) => {
          if (error) {
            console.error("Error updating customers:", error);
            return res.status(500).json({ message: "Internal Server Error" });
          } else {
            res.json({
              message: "Updated successfully",
            });
          }
        }
      );
    } else {
      res
        .status(404)
        .json({ message: "customer not found because this problem You have " });
    }
  });
};


module.exports = {
  getCustomer,
  getCustomerById,
  addCustomer,
  customerDeleteById,
  editCustomerById,
};