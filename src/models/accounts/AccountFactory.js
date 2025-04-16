import {
  PersonalSavingsAccount,
  PersonalInvestmentAccount,
} from "./Account.js";
import {
  BusinessSavingsAccount,
  BusinessInvestmentAccount,
} from "./Account.js";

class AccountFactory {
  createSavingsAccount(name, idUser, idAccountType) {
    throw new Error("Método createSavingsAccount debe ser implementado");
  }

  createInvestmentAccount(name, idUser, idAccountType) {
    throw new Error("Método createInvestmentAccount debe ser implementado");
  }
}

export class PersonalAccountFactory extends AccountFactory {
  static createPersonalAccount(name, idUser, idAccountType) {
    switch (idAccountType) {
      case 1:
        return new PersonalSavingsAccount(name, idUser, idAccountType);
      case 2:
        return new PersonalInvestmentAccount(name, idUser, idAccountType);
      default:
        throw new Error("Tipo de cuenta personal no válido");
    }
  }

  createMoveProcessor() {
    return {
      process: (move) =>
        console.log(`Procesando movimiento para cuenta personal: ${move.name}`),
    };
  }
}

export class BusinessAccountFactory extends AccountFactory {
  static createBusinessAccount(name, idUser, idAccountType) {
    switch (idAccountType) {
      case 3:
        return new BusinessSavingsAccount(name, idUser, idAccountType);
      case 4:
        return new BusinessInvestmentAccount(name, idUser, idAccountType);
      default:
        throw new Error("Tipo de cuenta empresarial no válido");
    }
  }

  createMoveProcessor() {
    return {
      process: (move) =>
        console.log(
          `Procesando movimiento para cuenta empresarial: ${move.name}`
        ),
    };
  }
}
