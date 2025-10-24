// Año dinámico en el pie
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Conmutador de temas (Artesanal / Minimal / Vibrante)
  document.querySelectorAll("[data-swap-theme]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.body.setAttribute("data-theme", btn.dataset.swapTheme);
      localStorage.setItem("aac-theme", btn.dataset.swapTheme);
    });
  });
  const saved = localStorage.getItem("aac-theme");
  if (saved) document.body.setAttribute("data-theme", saved);

  // Observador simple para animaciones sutiles
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((el) => {
        if (el.isIntersecting) {
          el.target.style.transform = "translateY(0)";
          el.target.style.opacity = 1;
        }
      });
    },
    { threshold: 0.12 }
  );

  document
    .querySelectorAll(".card, .product, .feature, .testimonial")
    .forEach((el) => {
      el.style.transform = "translateY(10px)";
      el.style.opacity = 0;
      el.style.transition = "all .5s ease";
      io.observe(el);
    });
});

// Formulario con backend en Render
async function enviarFormulario(e) {
  e.preventDefault();

  const data = {
    nombre: e.target.nombre.value,
    email: e.target.email.value,
    mensaje: e.target.mensaje.value
  };

  try {
    const res = await fetch("/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    const st = document.getElementById("form-status");
    if (result.success) {
      st.textContent = "¡Gracias! Tu mensaje fue enviado con éxito 🚀";
      e.target.reset();
    } else {
      st.textContent = "Hubo un error al enviar el mensaje. Intenta de nuevo.";
    }
  } catch (err) {
    document.getElementById("form-status").textContent =
      "Error de conexión. Intenta más tarde.";
  }
}
window.enviarFormulario = enviarFormulario;

