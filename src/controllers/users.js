import { pool } from "../db.js";
import { passwordTools } from "../functions/password.js";

export const usersController = {
  create: async (req, res) => {
    const { name, lastname, document, birth_date, email, password, phone } =
      req.body;

    const newPassword = await passwordTools.hashPassword(password);

    try {
      const result = await pool.query(
        `INSERT INTO users(name, lastname, document, birth_date, email, password, phone) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [name, lastname, document, birth_date, email, newPassword, phone]
      );

      if (result.rowCount > 0) {
        return res.status(200).send({
          status: 200,
          message: "success",
        });
      }
    } catch (err) {
      if (err.code === "23505") {
        const field = err.constraint.split("_")[1];
        return res.status(500).send({
          status: 500,
          message: `The ${field} is already registered`,
        });
      } else if (err.code === "23502") {
        return res.status(500).send({
          status: 500,
          message: `${err.column} cannot be an empty field`,
        });
      } else {
        return res.status(500).send({
          status: 500,
          message: `Server error, try again later, please`,
        });
      }
    }
  },

  get: async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM users");

    if (rows.length === 0) {
      return res.status(404).send({
        message: "Users not found",
      });
    }

    return res.status(200).send({
      message: "success",
      rows,
    });
  },

  getbyEmailAndPassword: async (req, res) => {
    const { email, password } = req.body;

    try {
      const { rows } = await pool.query("SELECT *  FROM users WHERE email=$1", [
        email,
      ]);

      if (rows.length === 0) {
        return res.status(404).send({
          status: 404,
          message: "Incorrect email or password",
        });
      }

      const verification = await passwordTools.comparePassword(
        password,
        rows[0].password
      );

      if (verification) {
        return res.status(200).send({
          status: 200,
          message: "success",
          row: {
            id: rows[0].id,
            name: rows[0].name,
            lastname: rows[0].lastname,
            document: rows[0].document,
            birth_date: rows[0].birth_date,
            email: rows[0].email,
            phone: rows[0].phone,
          },
        });
      } else {
        return res.status(404).send({
          status: 404,
          message: "Incorrect email or password",
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: "Server error, try again later, please",
      });
    }
  },
};
