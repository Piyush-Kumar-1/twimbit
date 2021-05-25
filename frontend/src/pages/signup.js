import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import Header from "../component/header";

export default function Register() {
  const router = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const register = async () => {
    if (!email.includes("@" && ".")) {
      setError("check email");
      return;
    }

    if (password.length < 6) {
      setError("password length must be 6");
      return;
    }
    await axios
      .post("http://localhost:5000/register", {
        email: email,
        password: password,
        name: name,
      })
      .then((response) => {
        if (response.data.cookie) {
          router.replace("/");
          return;
        } else if (response.data.includes("password")) {
          setError("check password");
          return;
        } else if ((response.data = "email exists")) {
          setError("email exists");
          return;
        } else if (response.data?.includes("email")) {
          setError("check email");
          return;
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Header />
      <div className="flex flex-col  mx-auto mt-20 w-min">
        <input
          className={`my-4 border border-gray-500 h-8 p-2 rounded-md outline-none  ${
            error?.includes("name") && "border border-red-500"
          }`}
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <input
          className={`mb-4 border border-gray-500 h-8 p-2 rounded-md outline-none  ${
            error?.includes("email") && "border border-red-500"
          }`}
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={({ target }) => {
            setError(null);
            setEmail(target.value);
          }}
        />
        <input
          className={`mb-4 border border-gray-500 h-8 p-2 rounded-md outline-none  ${
            error?.includes("password") && "border border-red-500"
          }`}
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={({ target }) => {
            setError(null);
            setPassword(target.value);
          }}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          className="flex bg-blue-200 h-8 p-2 items-center justify-center rounded-md"
          onClick={register}
        >
          Register
        </button>
        <div className="flex mt-4 flex-col">
          <p
            className="flex h-8 p-2 items-center mx-auto cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Already have an account? Login
          </p>
        </div>
      </div>
    </div>
  );
}
