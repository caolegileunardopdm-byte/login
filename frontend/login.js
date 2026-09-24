const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

const API_URL = "https://task-db-dtqg.onrender.com/api";

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  message.style.color = "";
  message.textContent = "Logging in...";

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      message.style.color = "red";
      message.textContent = data.message || "Login failed.";
      return;
    }

    localStorage.setItem("taskflowToken", data.token);
    localStorage.setItem("taskflowLoggedIn", "true");
    localStorage.setItem(
      "taskflowCurrentUser",
      JSON.stringify({
        email: email,
        name: (data.user && data.user.name) || email.split("@")[0],
      }),
    );

    message.style.color = "green";
    message.textContent = "Login successful! Opening dashboard...";

    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 800);
  } catch (err) {
    message.style.color = "red";
    message.textContent = "Cannot reach server. Try again in a moment.";
    console.error(err);
  }
});
