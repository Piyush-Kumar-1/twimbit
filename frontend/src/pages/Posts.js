import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../component/header";
import axios from "axios";

export default function Posts() {
  const router = useHistory();
  const [input, setInput] = useState("");
  const [detail, setDetail] = useState("");

  const uploadPost = () => {
    if (input.length < 1) {
      alert("please enter the post");
      return;
    }
    axios
      .post("http://localhost:5000/post", {
        post: input,
        username: "piyush",
        details: detail,
      })
      .then(() => {
        router.push("/");
        setInput("");
      });
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col mt-10 justify-center max-w-sm mx-auto">
        <input
          className="mb-4 border border-gray-500 h-8 p-2 rounded-md outline-none"
          type="text"
          placeholder="Enter heading"
          value={input}
          onChange={({ target }) => setInput(target.value)}
        />
        <textarea
          className="mb-4 border border-gray-500 h-16 p-2 rounded-md outline-none"
          type="text"
          placeholder="Enter post"
          value={detail}
          onChange={({ target }) => setDetail(target.value)}
        />
        <button
          onClick={uploadPost}
          className="flex bg-blue-200 h-8 p-2 items-center justify-center border-none w-32 mx-auto"
        >
          Post
        </button>
      </div>
    </div>
  );
}
