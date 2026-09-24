const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get login information
  const email = document.getElementById("email").value.trim().toLowerCase();

  const password = document.getElementById("password").value;

  // Get registered user
  const savedUser = localStorage.getItem("taskflowUser");

  // No registered account
  if (!savedUser) {
    message.style.color = "red";

    message.textContent = "No account found. Please register first.";

    return;
  }

  // Convert saved data to object
  const user = JSON.parse(savedUser);

  // Check login information
  if (email === user.email && password === user.password) {
    // Store login session
    localStorage.setItem("taskflowLoggedIn", "true");

    // Save current user
    localStorage.setItem("taskflowCurrentUser", JSON.stringify(user));

    message.style.color = "green";

    message.textContent = "Login successful! Opening dashboard...";

    // Go to dashboard
    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 800);
  } else {
    message.style.color = "red";

    message.textContent = "Incorrect email or password.";
  }
});
