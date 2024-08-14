const { error } = require("console");
const db = require("../config/db");

const getProduct = (req, res) => {
  db.query("SELECT * FROM Products", (error, result) => {
    if (error) {
      console.error("Gettting error", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  });
};

const getProductById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM products WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching Products:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      res.json({
        message: "OK",
        data: result,
      });
    } else {
      res.json({
        message: "Products not found",
      });
    }
  });
};



const addProduct = (req, res) => {
  const { product_name, price, category_id,stock_quantity,gramms,description } = req.body;
  db.query(
    "INSERT INTO products (product_name, price, category_id,stock_quantity,gramms,description  )\
    VALUES(?, ?,?,?,?,?)",
    [product_name, price, category_id, stock_quantity, gramms, description],
    (error, result) => {
      if (error) {
        console.error("Error adding Products", error);
        return res.status(500).json({ message: "Internal Server error" });
      } else {
        res.json({
          message: "OK qo'shildi",
          products: result.insertId,
        });
      }
    }
  );
};



const DeleteProduct = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Products WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching data", error);
      return res.status(500).json({ message: "INternational server error" });
    }
    if (result.length > 0) {
      db.query("DELETE FROM Products WHERE id = ?", [id], (error, result) => {
        if (error) {
          console.error("Error deleted", error);
          return res
            .status(500)
            .json({ message: "INTERNATIONAL Server error" });
        } else {
          res.json({
            message: "products deleted successfuly",
          });
        }
      });
    } else {
      res.json({
        message: "products not found",
      });
    }
  });
};



const editProduct = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Products WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching Products:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      const {
        product_name,
        price,
        category_id,
        stock_quantity,
        gramms,
        description,
      } = req.body;
  
      db.query(
        "UPDATE Products SET product_name = ?, price = ? ,category_id = ?,stock_quantity = ?,gramms = ?,description = ?  WHERE id = ?",
        [product_name, price, category_id, stock_quantity, gramms, description,id],
        (error, result) => {
          if (error) {
            console.error("Error updating products:", error);
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
        message: "Products not found because this problem You have ",
      });
    }
  });
};


const soldProducts = (req,res) =>{
  const {date1,date2} = req.body;
  db.query(
    `SELECT p.product_name FROM products p
    LEFT JOIN contract c ON p.id = c.product_id
    WHERE c.contract_date BETWEEN  ? AND ?
  `,[date1,date2],(error,result) =>{
    if (error) {
      console.error("Error products:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    } 
    res.json(result);
  }
  );
}


const contractExpered = (req,res) =>{
  const {current_date} = req.body;
  db.query(
    `SELECT c.contract_date,p.product_name, i.months_rate as shartnoma_muddati,
    i.months as qoyilgan_foiz,p.price,
    ((p.price - pay.amount ) * (i.months / 100)) + p.price  as customer_tolashi_kerak,
    CURRENT_DATE() - DATE(c.contract_date) as otib_ketgan_kunlari FROM customers cus
    LEFT JOIN contract c ON cus.id = c.customer_id
    LEFT JOIN products p ON p.id = c.product_id
    LEFT JOIN installment_plans i ON c.installment_id = i.id
    LEFT JOIN Payments pay ON c.id = pay.contract_id
    WHERE c.contract_date < ?
    `,
    [current_date],
    (error, result) => {
      if (error) {
        console.error("Error products:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      res.json(result);
    }
  );

}



module.exports = {
  getProduct,
  getProductById,
  addProduct,
  DeleteProduct,
  editProduct,
  soldProducts,
  contractExpered
};
