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
    return `INSERT INTO users (name, lastname, document, birth_date, email, password, is_validate) 
                VALUES ($1, $2, $3, $4, $5, $6, ${this.isValidate})`;
  }

  generateUpdateSQL(id) {
    return `UPDATE users 
                SET name = $1, lastname = $2, document = $3, email = $4, 
                    phone = $5, address = $6
                WHERE id = ${id}`;
  }

  generateUpdateValidate(id) {
    return `UPDATE users 
                SET is_validate = ${this.isValidate}
                WHERE id = ${id}`;
  }
}
