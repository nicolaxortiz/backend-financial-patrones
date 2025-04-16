export class User {
  constructor({
    name,
    lastname,
    document,
    birthDate,
    email,
    password,
    phone,
    createdAt = null,
    isValidate = false,
    address = null,
    role = "client",
  }) {
    this.id = null;
    this.name = name;
    this.lastname = lastname;
    this.document = document;
    this.birthDate = birthDate;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.createdAt = createdAt;
    this.isValidate = isValidate;
    this.address = address;
    this.role = role;
  }

  generateInsertSQL() {
    return `INSERT INTO users (name, lastname, document, birth_date, email, password, phone, is_validate) 
                VALUES ('${this.name}', '${this.lastname}', '${this.document}', '${this.birthDate}', 
                        '${this.email}', '${this.password}', '${this.phone}', ${this.isValidate})`;
  }

  generateUpdateSQL(id) {
    return `UPDATE users 
                SET name = '${this.name}', lastname = '${this.lastname}', document = '${this.document}', email = '${this.email}', 
                    phone = '${this.phone}', address = '${this.address}'
                WHERE id = ${id}`;
  }

  generateUpdateValidate(id) {
    return `UPDATE users 
                SET is_validate = true
                WHERE id = ${id}`;
  }
}
