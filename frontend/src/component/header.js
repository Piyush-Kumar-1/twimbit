import axios from "axios";

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

export default function Header() {
  axios.defaults.withCredentials = true;
  const router = useHistory();
  const [user, setUser] = useState("");
  useEffect(() => {
    axios
      .post("http://localhost:5000/me")
      .then((res) => {
        if (res.data) {
          setUser(res.data.name);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const logout = () => {
    axios.post("http://localhost:5000/logout").then(() => {
      window.location.reload();
      setUser(null);
    });
  };

  return (
    <header className="items-center sticky top-0 z-50">
      {user ? (
        <div className="flex flex-row justify-between  w-full h-10 p-2 bg-blue-600 ">
          <p onClick={() => router.push("/")} className="cursor-pointer">
            Twimbit
          </p>
          <div className="flex flex-row justify-between w-60 align-">
            <p>Hello, {user}</p>
            <p onClick={() => router.push("/posts")} className="cursor-pointer">
              Post
            </p>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-between  w-full h-10 p-2 bg-blue-600 sticky top-0">
          <p onClick={() => router.push("/")} className="cursor-pointer">
            Oneistox
          </p>
          <button onClick={() => router.push("login")}>Login</button>
        </div>
      )}
    </header>
  );
}
