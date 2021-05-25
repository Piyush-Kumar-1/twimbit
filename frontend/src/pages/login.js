import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import Header from "../component/header";

export default function Login() {
  axios.defaults.withCredentials = true;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useHistory();

  const signIn = async () => {
    if (!email.includes("@" && ".")) {
      setError("check email");
      return;
    }

    if (password.length === 0) {
      setError("check password");
    }
    await axios
      .post(
        "http://localhost:5000/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          credentials: "same-origin",
        }
      )
      .then((response) => {
        if (response.data.cookie) {
          router.replace("/");
          return;
        } else if (response.data?.includes("length")) {
          setError("password must be of 6 digits");
          return;
        } else if (response.data?.includes("password")) {
          setError("check password");
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
      <div className="flex flex-col mt-20 w-min mx-auto">
        <input
          className={`my-4 border border-gray-500 h-8 p-2 rounded-md outline-none ${
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
          className={`mb-4 border border-gray-500 h-8 p-2 rounded-md outline-none ${
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
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="flex bg-blue-200 h-8 p-2 items-center justify-center border-none"
          onClick={signIn}
        >
          Sign In
        </button>
        <div className="flex mt-4 flex-col">
          <p
            className="flex h-8 p-2 items-center mx-auto cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            New user ? Register
          </p>
        </div>
      </div>
    </div>
  );
}
