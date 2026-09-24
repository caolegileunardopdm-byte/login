const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

const API_URL = "https://task-db-dtqg.onrender.com/api";

registerForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password.length < 6) {
    message.style.color = "red";
    message.textContent = "Password must contain at least 6 characters.";
    return;
  }

  if (password !== confirmPassword) {
    message.style.color = "red";
    message.textContent = "Passwords do not match.";
    return;
  }

  message.style.color = "";
  message.textContent = "Creating account...";

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      message.style.color = "red";
      message.textContent = data.message || "Registration failed.";
      return;
    }

    message.style.color = "green";
    message.textContent = "Registration successful! Redirecting to login...";

    setTimeout(function () {
      window.location.href = "login.html";
    }, 1500);
  } catch (err) {
    message.style.color = "red";
    message.textContent = "Cannot reach server. Try again in a moment.";
    console.error(err);
  }
});
