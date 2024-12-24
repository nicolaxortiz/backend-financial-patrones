import { pool } from "../db.js";

export const accountsController = {
  create: async (req, res) => {
    const { name, id_user } = req.body;

    try {
      const result = await pool.query(
        "INSERT INTO accounts(name, id_user) VALUES ($1, $2)",
        [name, id_user]
      );

      if (result.rowCount > 0) {
        return res.status(200).send({
          status: 200,
          message: "success",
        });
      }
    } catch (error) {
      if (error.code === "23505") {
        const field = error.constraint.split("_")[1];
        return res.status(500).send({
          status: 500,
          message: `The ${field} is already registered`,
        });
      } else if (error.code === "23502") {
        return res.status(500).send({
          status: 500,
          message: `${error.column} cannot be an empty field`,
        });
      } else {
        return res.status(500).send({
          status: 500,
          message: `Server error, try again later, please`,
        });
      }
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const { rows } = await pool.query(
        `SELECT * FROM accounts WHERE id_user = $1 ORDER BY updated_at DESC`,
        [id]
      );

      if (rows.length === 0) {
        return res.status(404).send({
          status: 404,
          message: "Accounts not found",
        });
      }

      return res.status(200).send({
        status: 200,
        message: "success",
        rows,
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: `Server error, try again later, please`,
      });
    }
  },

  update: async (req, res) => {
    const { name, id } = req.body;

    try {
      const result = await pool.query(
        "UPDATE accounts SET name=$1  WHERE id=$2",
        [name, id]
      );

      if (result.rowCount > 0) {
        return res.status(200).send({
          status: 200,
          message: "success",
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: `Server error, try again later, please`,
        error: error,
      });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const result = await pool.query("DELETE FROM accounts WHERE id=$1", [id]);

      if (result.rowCount > 0) {
        return res.status(200).send({
          status: 200,
          message: "success",
        });
      } else {
        return res.status(404).send({
          status: 404,
          message: "Account not found",
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: `Server error, try again later, please`,
        error: error,
      });
    }
  },
};
