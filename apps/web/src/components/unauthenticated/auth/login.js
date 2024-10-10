import { setUserSession, getUserSession } from "../../../utils/auth.js";
import { loginUser } from "../../../utils/authService.js";

export const initLogin = () => {
  const loginForm = document.getElementById("loginForm");

  if (!loginForm) {
    console.error("Login form not found");

    return;
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const formObject = Object.fromEntries(formData);

    try {
      const data = await loginUser(formObject);

      setUserSession(
        data.user.email,
        data.user.username,
        data.token,
        data.user.isAdmin
      );

      window.location.href = "/authenticated/trips";
    } catch (error) {
      console.error("Error during login:", error);

      alert("Login failed. Please check your credentials and try again.");
    }
  });
};
