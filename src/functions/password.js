import bcrypt from "bcrypt";

export const passwordTools = {
  hashPassword: async (password) => {
    try {
      const hash = await bcrypt.hash(password, 12);
      return hash;
    } catch (error) {
      console.log("Error encriptando la contraseña:", error);
      throw error;
    }
  },

  comparePassword: async (password, hash) => {
    try {
      const result = await bcrypt.compare(password, hash);
      return result;
    } catch (error) {
      console.log("Error comparando las contraseñas:", error);
      throw error;
    }
  },

  randomPassAndHash: async () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    try {
      const hash = await bcrypt.hash(password, 12);
      return { password, hash };
    } catch (error) {
      console.log("Error encriptando la contraseña:", error);
      throw error;
    }
  },
};
