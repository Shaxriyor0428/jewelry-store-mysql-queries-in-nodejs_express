const db = require("../config/db");

const getCategory = (req, res) => {
  db.query("SELECT * FROM Categories", (error, result) => {
    if (error) {
      console.error("Gettting error", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  });
};

const getCategoryById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Categories WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching category:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      res.json({
        message: "OK",
        data: result,
      });
    } else {
      res.json({
        message: "category not found",
      });
    }
  });
};


const  addcategory = (req, res) => {
  const { name, description } = req.body;
  db.query(
    "INSERT INTO categories(name,description )\
    VALUES(?, ?)",
    [name, description],
    (error, result) => {
      if (error) {
        console.error("Error adding category", error);
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

const categroyDeleteById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM categories WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching data", error);
      return res.status(500).json({ message: "INternational server error" });
    }
    if (result.length > 0) {
      db.query("DELETE FROM categories WHERE id = ?", [id], (error, result) => {
        if (error) {
          console.error("Error deleted", error);
          return res
            .status(500)
            .json({ message: "INTERNATIONAL Server error" });
        } else {
          res.json({
            message: "Category deleted successfuly",
          });
        }
      });
    } else {
      res.json({
        message: "category not found",
      });
    }
  });
};

const editCategory = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM categories WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      const { name,description} = req.body;
      db.query(
        "UPDATE categories SET name= ?, description =?  WHERE id = ?",
        [name,description,id],
        (error, result) => {
          if (error) {
            console.error("Error updating categories:", error);
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
  getCategory,
  getCategoryById,
  addcategory,
  categroyDeleteById,
  editCategory
};
