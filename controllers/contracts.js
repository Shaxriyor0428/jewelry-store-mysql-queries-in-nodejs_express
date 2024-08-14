const db = require("../config/db");


const getContract = (req, res) => {
  db.query("SELECT * FROM Contract", (error, result) => {
    if (error) {
      console.error("Gettting error", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  });
};

const getcontractById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Contract WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching Contract:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      res.json({
        message: "OK",
        data: result,
      });
    } else {
      res.json({
        message: "Contract not found",
      });
    }
  });
};

const addContract = (req, res) => {
  const {
    status_id,
    customer_id,
    product_id,
    contract_date,
    initial_payment,
    installment_id,
    total_price,
    months_payment,
  } = req.body;
  db.query(
    "INSERT INTO contract (status_id,customer_id,product_id,contract_date,initial_payment,installment_id,total_price,months_payment)\
    VALUES(?, ?, ?, ?, ?,?,?,?)",
    [
      status_id,
      customer_id,
      product_id,
      contract_date,
      initial_payment,
      installment_id,
      total_price,
      months_payment,
    ],
    (error, result) => {
      if (error) {
        console.error("Error adding contract", error);
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

const contractDeletById = (req, res) => {
  const id = req.params.id;
  console.log("Salom");

  db.query("SELECT * FROM contract WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching data", error);
      return res.status(500).json({ message: "INternational server error" });
    }
    if (result.length > 0) {
      db.query("DELETE FROM contract WHERE id = ?", [id], (error, result) => {
        if (error) {
          console.error("Error deleted", error);
          return res
            .status(500)
            .json({ message: "INTERNATIONAL Server error" });
        } else {
          res.json({
            message: "contract deleted successfuly",
          });
        }
      });
    } else {
      res.json({
        message: "contract not found",
      });
    }
  });
};

const editContract = (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM contract WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.error("Error fetching contract:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      const {
        status_id,
        customer_id,
        product_id,
        contract_date,
        initial_payment,
        installment_id,
      } = req.body;
      db.query(
        `SELECT ((p.price - pay.amount) * (i.months / 100)) + p.price tolanishi_kerak,
        (((p.price - pay.amount) * (i.months / 100)) + p.price) / i.months_rate as oyma_oy FROM contract c 
        LEFT JOIN payments pay ON c.id = pay.contract_id
        LEFT JOIN installment_plans i ON c.installment_id = i.id
        LEFT JOIN products p ON p.id = c.product_id
        WHERE c.id = ?`,
        [id],
        (error, c_result) => {
          if (error) {
            console.error("Error reading:", error);
            return res.status(500).json({ message: "Internal Server Error" });
          }
          const months_payment = c_result[0].oyma_oy;
          const total_price = c_result[0].tolanishi_kerak;
          // console.log(months_payment,total_price);
          db.query(
            "UPDATE contract SET status_id = ?, customer_id = ?, product_id = ?,  contract_date = ?, initial_payment = ?, installment_id = ?,total_price = ?,months_payment = ? WHERE id = ?",
            [
              status_id,
              customer_id,
              product_id,
              contract_date,
              initial_payment,
              installment_id,
              total_price,
              months_payment,
              id,
            ],
            (error, result) => {
              if (error) {
                console.error("Error updating contract:", error);
                return res
                  .status(500)
                  .json({ message: "Internal Server Error" });
              } else {
                res.json({
                  message: "Updated successfully",
                });
              }
            }
          );
        }
      );
    } else {
      res
        .status(404)
        .json({ message: "contract not found because this problem You have " });
    }
  });
};



module.exports = {
  getContract,
  getcontractById,
  addContract,
  contractDeletById,
  editContract,
};

