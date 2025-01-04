import { transporter } from "./config.js";

export const emails = {
  newValidateCode: async (userEmail, code) => {
    console.log("userEmail: " + userEmail, "code: " + code);

    const emailConfig = {
      from: process.env.EMAIL_SMTP,
      to: userEmail,
      subject: "Código de validación - Financial App",
      text: `Estimado usuario, su código de validación es: ${code}
      \nEste mensaje ha sido enviado a petición del usuario.`,
    };

    try {
      await transporter.sendMail(emailConfig);
    } catch (error) {
      console.log("error: " + error);
    }
  },

  newPasswordRecovery: async (userEmail, newPassword) => {
    const emailConfig = {
      from: process.env.EMAIL_SMTP,
      to: userEmail,
      subject: "Recordatorio de la contraseña - Financial App",
      text: `Estimado usuario, su nueva contraseña es: ${newPassword}
      \nLe recordamos que ingrese a la plataforma y cambie su contraseña para mantener su seguridad. \nEste mensaje ha sido enviado a petición del usuario.`,
    };

    try {
      await transporter.sendMail(emailConfig);
    } catch (error) {
      console.log("error: " + error);
    }
  },
};
