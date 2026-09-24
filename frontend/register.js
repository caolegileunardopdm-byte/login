const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = document.getElementById("name").value.trim();

  const email = document.getElementById("email").value.trim().toLowerCase();

  const password = document.getElementById("password").value;

  const confirmPassword = document.getElementById("confirmPassword").value;

  // Check password
  if (password.length < 6) {
    message.style.color = "red";

    message.textContent = "Password must contain at least 6 characters.";

    return;
  }

  // Check confirmation
  if (password !== confirmPassword) {
    message.style.color = "red";

    message.textContent = "Passwords do not match.";

    return;
  }

  // Check if an account already exists
  const existingUser = localStorage.getItem("taskflowUser");

  if (existingUser) {
    const user = JSON.parse(existingUser);

    if (user.email === email) {
      message.style.color = "red";

      message.textContent = "An account with this email already exists.";

      return;
    }
  }

  // Create user object
  const newUser = {
    name: name,

    email: email,

    password: password,
  };

  // Save user
  localStorage.setItem("taskflowUser", JSON.stringify(newUser));

  // Success message
  message.style.color = "green";

  message.textContent = "Registration successful! Redirecting to login...";

  // Go to login page
  setTimeout(function () {
    window.location.href = "login.html";
  }, 1500);
});
