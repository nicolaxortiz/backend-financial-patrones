// Interfaz para las estrategias de generación de SQL
class MoveStrategy {
  generateInsertSQL() {
    throw new Error("Método generateInsertSQL no implementado");
  }

  generateUpdateSQL() {
    throw new Error("Método generateUpdateSQL no implementado");
  }
}

// Estrategia para movimientos de tipo Ganancia
export class IncomeStrategy extends MoveStrategy {
  generateInsertSQL() {
    return `INSERT INTO moves (name, amount, date, type, id_account) VALUES ($1, $2, $3, 'Ganancia', $4)`;
  }

  generateUpdateSQL() {
    return `UPDATE moves SET name = $1, amount = $2, date = $3, type = 'Ganancia' WHERE id = $4`;
  }
}

// Estrategia para movimientos de tipo Gasto
export class ExpenseStrategy extends MoveStrategy {
  generateInsertSQL() {
    return `INSERT INTO moves (name, amount, date, type, id_account) VALUES ($1, $2, $3, 'Gasto', $4)`;
  }

  generateUpdateSQL() {
    return `UPDATE moves SET name = $1, amount = $2, date = $3, type = 'Gasto' WHERE id = $4`;
  }
}
