import pg from "pg";

export class DatabaseConnection {
  static #instance = null;

  #pool = null;

  constructor() {
    if (DatabaseConnection.#instance) {
      throw new Error(
        "Use DatabaseConnection.getInstance() to get the singleton instance"
      );
    }
    this.#initializePool();
  }

  #initializePool() {
    this.#pool = new pg.Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      port: process.env.DB_PORT,
      // ssl: true,
    });

    this.#pool.on("error", (err) => {
      console.error("Error en el pool de conexiones:", err.message);
    });
  }

  static getInstance() {
    if (!DatabaseConnection.#instance) {
      DatabaseConnection.#instance = new DatabaseConnection();
    }
    return DatabaseConnection.#instance;
  }

  getPool() {
    return this.#pool;
  }

  async query(text, params = []) {
    try {
      const result = await this.#pool.query(text, params);
      return result;
    } catch (error) {
      console.error("Error al ejecutar consulta:", error.message);
      throw new Error(`Error en consulta: ${error.message}`);
    }
  }

  async close() {
    if (this.#pool) {
      await this.#pool.end();
      console.log("Conexión a la base de datos cerrada");
      DatabaseConnection.#instance = null;
      this.#pool = null;
    }
  }
}
