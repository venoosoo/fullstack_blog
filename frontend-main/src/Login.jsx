import { useState } from "react";
import Header from "./Header";
import { useUser } from "./AuthProvider";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUserData, getUserData } = useUser();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        });
        if (!response.ok) {
          // Handle non-2xx responses (e.g., show an error message)
          setError("Failed to log in. Please check your credentials.");
          return;
        }
        const res = await response.json();
        if (res === undefined) {
          setError("Wrong username or password"); // Set the error message
        } else {
          // Clear the error message if login is successful
          setError("");
          console.log('after login', res)
          setUserData(res)
          console.log("User data after setting:", getUserData());
          localStorage.setItem("site", res.token);
          navigate('/index')
        }
      } catch (err) {
        console.error(err);
        setError("Сталася помилка попробуйте ще раз"); // Set a generic error message
      }
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Header />
      <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'  }} onSubmit={handleSubmitEvent}>
        <div>
          <h1>Ввійти</h1>
        </div>
        <div className="form_control">
          <label htmlFor="user-email">логін:</label>
          <input
            type="email"
            id="user-email"
            name="username"
            placeholder="puma30"
            aria-describedby="user-email"
            aria-invalid="false"
            onChange={handleInput}
          />
        </div>
        <div className="form_control">
          <label htmlFor="password">пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            aria-describedby="user-password"
            aria-invalid="false"
            onChange={handleInput}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <Link to='/register'>Створити акаунт</Link>
        <button className="btn-submit">Підтвердити</button>
      </form>
    </>
  );
};

export default Login;
