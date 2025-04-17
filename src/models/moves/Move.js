class Move {
  constructor(name, amount, date, type, idAccount) {
    this.id = null;
    this.name = name;
    this.amount = amount;
    this.date = date;
    this.type = type;
    this.idAccount = idAccount;
  }

  generateInsertSQL() {
    return `INSERT INTO moves (name, amount, date, type, id_account) VALUES ($1, $2, $3, $4, $5)`;
  }
}

export class Income extends Move {
  constructor(name, amount, date, idAccount) {
    super(name, amount, date, "Ganancia", idAccount);
  }
}

export class Expense extends Move {
  constructor(name, amount, date, idAccount) {
    super(name, amount, date, "Gasto", idAccount);
  }
}
