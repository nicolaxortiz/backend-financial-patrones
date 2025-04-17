class Account {
  constructor(name, idUser, idAccountType) {
    this.id = null;
    this.name = name;
    this.earnings = 0;
    this.expenses = 0;
    this.updatedAt = new Date().toISOString();
    this.idUser = idUser;
    this.idAccountType = idAccountType;
  }

  generateInsertSQL() {
    return `INSERT INTO accounts (name, earnings, expenses, updated_at, id_user, id_account_type) 
                VALUES ($1, '${this.earnings}', '${this.expenses}', '${this.updatedAt}', $2, $3)`;
  }
}

export class PersonalSavingsAccount extends Account {
  constructor(name, idUser, idAccountType) {
    super(name, idUser, idAccountType);
  }
}

export class PersonalInvestmentAccount extends Account {
  constructor(name, idUser, idAccountType) {
    super(name, idUser, idAccountType);
  }
}

export class BusinessSavingsAccount extends Account {
  constructor(name, idUser, idAccountType) {
    super(name, idUser, idAccountType);
  }
}

export class BusinessInvestmentAccount extends Account {
  constructor(name, idUser, idAccountType) {
    super(name, idUser, idAccountType);
  }
}
