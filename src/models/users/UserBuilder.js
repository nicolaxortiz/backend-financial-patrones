import { User } from "./User.js";

export class UserBuilder {
  constructor() {
    this.userData = {};
  }

  setName(name) {
    this.userData.name = name;
    return this;
  }

  setLastname(lastname) {
    this.userData.lastname = lastname;
    return this;
  }

  setDocument(document) {
    this.userData.document = document;
    return this;
  }

  setBirthDate(birthDate) {
    this.userData.birthDate = birthDate;
    return this;
  }

  setEmail(email) {
    this.userData.email = email;
    return this;
  }

  setPassword(password) {
    this.userData.password = password;
    return this;
  }

  setPhone(phone) {
    this.userData.phone = phone;
    return this;
  }

  setIsValidate(isValidate) {
    this.userData.isValidate = isValidate;
    return this;
  }

  setAddress(address) {
    this.userData.address = address;
    return this;
  }

  setRole(role) {
    this.userData.role = role;
    return this;
  }

  build() {
    const user = new User(this.userData);
    return user;
  }

  fromExisting(user) {
    this.userData = { ...user };
    return this;
  }
}
