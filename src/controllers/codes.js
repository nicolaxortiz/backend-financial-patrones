import { randomNumber } from "../functions/randomNumber.js";
import { emails } from "../SMTP/sender.js";
import { DatabaseConnection } from "../db.js";

const pool = DatabaseConnection.getInstance();

export const codesController = {
  create: async (req, res) => {
    const { id_user, email } = req.body;

    try {
      const deleteResult = await pool.query(
        "DELETE FROM codes WHERE id_user = $1",
        [id_user]
      );

      const code = randomNumber();
      const result = await pool.query(
        "INSERT INTO codes(code, id_user) VALUES ($1, $2)",
        [code, id_user]
      );

      if (result.rowCount > 0) {
        emails.newValidateCode(email, code);
        return res.status(200).send({
          status: 200,
          message: "success",
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: `Server error, try again later, please`,
      });
    }
  },

  get: async (req, res) => {
    const { code, id_user } = req.body;

    try {
      const { rows } = await pool.query(
        "SELECT * FROM codes WHERE code = $1 and id_user = $2",
        [code, id_user]
      );

      if (rows.length === 0) {
        return res.status(404).send({
          status: 404,
          message: "Code not found",
        });
      }

      const deleteResult = await pool.query(
        "DELETE FROM codes WHERE id_user = $1",
        [id_user]
      );

      return res.status(200).send({
        status: 200,
        message: "success",
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: `Server error, try again later, please`,
      });
    }
  },
};
