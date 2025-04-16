import { Income, Expense } from "./Move.js";

export class MoveFactory {
  static createMove(name, amount, date, type, idAccount) {
    switch (type) {
      case "Ganancia":
        return new Income(name, amount, date, idAccount);
      case "Gasto":
        return new Expense(name, amount, date, idAccount);
      default:
        throw new Error(`Tipo de movimiento no válido: ${type}`);
    }
  }
}
