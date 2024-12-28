import { pool } from "../db.js";

export const movesController = {
  getByAccountId: async (req, res) => {
    const { id, filter } = req.params;
    let query = "";
    let newFilter = "";

    if (filter === "earnings") {
      newFilter = "Ganancia";
    } else if (filter === "expenses") {
      newFilter = "Gasto";
    }

    if (filter === "all") {
      query = "SELECT * FROM moves WHERE id_account = $1 ORDER BY date DESC";
    } else {
      query = `SELECT * FROM moves WHERE id_account = $1 AND type = '${newFilter}' ORDER BY date DESC`;
    }

    try {
      const { rows } = await pool.query(query, [id]);
      if (rows.length === 0) {
        return res.status(404).send({
          status: 404,
          message: "Moves not found",
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

        return res.status(200).send({
          status: 200,
          message: "Success",
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
};
