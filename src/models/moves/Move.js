import { IncomeStrategy, ExpenseStrategy } from "./MoveStrategy.js";

class Move {
  constructor(name, amount, date, idAccount, strategy) {
    this.id = null;
    this.name = name;
    this.amount = amount;
    this.date = date;
    this.idAccount = idAccount;
    this.strategy = strategy;
  }

  generateInsertSQL() {
    return this.strategy.generateInsertSQL();
  }

  generateUpdateSQL() {
    return this.strategy.generateUpdateSQL();
  }
}

export class Income extends Move {
  constructor(name, amount, date, idAccount) {
    super(name, amount, date, idAccount, new IncomeStrategy());
  }
}

export class Expense extends Move {
  constructor(name, amount, date, idAccount) {
    super(name, amount, date, idAccount, new ExpenseStrategy());
  }
}
