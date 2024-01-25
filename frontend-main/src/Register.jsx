import { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const res = await response.json();
      if (!res.error) {
        navigate('/login')
        console.log(res)
      } else {
        setError("Людина з такою електронною поштою існує");
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
      <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} onSubmit={handleSubmitEvent}>
        <div>
          <h1>Створіть акаунт щоб продовжити</h1>
        </div>
        <div className="form_control">
          <label htmlFor="user-email">Емейл:</label>
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
          <label htmlFor="password">Пароль:</label>
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
        <Link to="/login">Ввійти</Link>
        <button className="btn-submit">Підтвердити</button>
      </form>
    </>
  );
};

export default Register;
