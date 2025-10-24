const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 👉 Servir archivos estáticos desde la carpeta actual
app.use(express.static(path.join(__dirname, "public")));


// Ruta raíz: enviar el index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Ruta para procesar el formulario
app.post("/send", async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Atelier Ammy Croch" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT || process.env.EMAIL_USER,
      subject: "Nuevo mensaje desde la web",
      text: `Nombre: ${nombre}\nCorreo: ${email}\n\nMensaje:\n${mensaje}`
    });

    res.json({ success: true, message: "Correo enviado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al enviar correo" });
  }
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
