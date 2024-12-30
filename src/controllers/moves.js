import { pool } from "../db.js";

export const movesController = {
  getByAccountId: async (req, res) => {
    const { id, filter, offset } = req.params;
    let query = "";
    let countQuery = "";
    let newFilter = "";

    if (filter === "earnings") {
      newFilter = "Ganancia";
    } else if (filter === "expenses") {
      newFilter = "Gasto";
    }

    if (filter === "all") {
      query =
        "SELECT * FROM moves WHERE id_account = $1 ORDER BY date DESC LIMIT 6 OFFSET $2";

      countQuery = "SELECT COUNT(*) FROM moves WHERE id_account = $1";
    } else {
      query = `SELECT * FROM moves WHERE id_account = $1 AND type = '${newFilter}' ORDER BY date DESC LIMIT 6 OFFSET $2`;
      countQuery = `SELECT COUNT(*) FROM moves WHERE id_account = $1 AND type = '${newFilter}'`;
    }

    try {
      const count = await pool.query(countQuery, [id]);

      if (count.rows[0].count === "0") {
        return res.status(404).send({
          status: 404,
          message: "Moves not found",
        });
      }

      const { rows } = await pool.query(query, [id, offset]);

      return res.status(200).send({
        status: 200,
        message: "success",
        count: count.rows[0].count,
        rows,
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: `Server error, try again later, please`,
      });
    }
  },

  getByName: async (req, res) => {
    const { id_account, name, offset } = req.body;

    try {
      const count = await pool.query(
        `SELECT COUNT(*) FROM moves WHERE id_account = $1 and name LIKE '%${name}%'`,
        [id_account]
      );

      if (count.rows[0].count === "0") {
        return res.status(404).send({
          status: 404,
          message: "Moves not found",
        });
      }

      const { rows } = await pool.query(
        `SELECT * FROM moves WHERE id_account = $1 and name LIKE '%${name}%' ORDER BY date DESC LIMIT 6 OFFSET $2`,
        [id_account, offset]
      );

      return res.status(200).send({
        status: 200,
        message: "success",
        count: count.rows[0].count,
        rows,
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: `Server error, try again later, please, ` + error,
      });
    }
  },

  create: async (req, res) => {
    const { name, amount, date, type, id_account } = req.body;

    try {
      const response = await pool.query(
        "INSERT INTO moves (name, amount, date, type, id_account) VALUES ($1, $2, $3, $4, $5)",
        [name, amount, date, type, id_account]
      );

      if (response.rowCount > 0) {
        const updateResponse = await pool.query(
          "UPDATE accounts SET updated_at = CURRENT_TIMESTAMP WHERE id = $1",
          [id_account]
        );

        if (updateResponse.rowCount > 0) {
          return res.status(200).send({
            status: 200,
            message: "Success",
          });
        } else {
          return res.status(404).send({
            status: 404,
            message: `Account not found`,
          });
        }
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

  update: async (req, res) => {
    const { id } = req.params;
    const { name, amount, date, type, id_account } = req.body;

    try {
      const response = await pool.query(
        "UPDATE moves SET name = $1, amount = $2, date = $3, type = $4 WHERE id = $5",
        [name, amount, date, type, id]
      );

      if (response.rowCount > 0) {
        const updateResponse = await pool.query(
          "UPDATE accounts SET updated_at = CURRENT_TIMESTAMP WHERE id = $1",
          [id_account]
        );

        if (updateResponse.rowCount > 0) {
          return res.status(200).send({
            status: 200,
            message: "Success",
          });
        } else {
          return res.status(404).send({
            status: 404,
            message: `Account not found`,
          });
        }
      } else {
        return res.status(404).send({
          status: 404,
          message: "Move not found",
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: `Server error, try again later, please`,
      });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const { id_account } = req.body;

    try {
      const response = await pool.query("DELETE FROM moves WHERE id = $1", [
        id,
      ]);

      if (response.rowCount > 0) {
        const updateResponse = await pool.query(
          "UPDATE accounts SET updated_at = CURRENT_TIMESTAMP WHERE id = $1",
          [id_account]
        );

        if (updateResponse.rowCount > 0) {
          return res.status(200).send({
            status: 200,
            message: "Success",
          });
        } else {
          return res.status(404).send({
            status: 404,
            message: `Account not found`,
          });
        }
      } else {
        return res.status(404).send({
          status: 404,
          message: "Move not found",
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: `Server error, try again later, please`,
      });
    }
  },
};
