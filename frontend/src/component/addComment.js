import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

export default function AddComment({ post }) {
  axios.defaults.withCredentials = true;
  const router = useHistory();
  const [comment, setComment] = useState(undefined);
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .post("http://localhost:5000/me")
      .then((res) => {
        setUser(res.data.name);
      })
      .catch((err) => console.log(err));
  }, []);

  const postComment = (id) => {
    if (comment.length < 1) {
      alert("check comment");
      return;
    }
    axios
      .post("http://localhost:5000/comment", {
        id,
        user: user,
        comment,
      })
      .then((res) => {
        setComment(undefined);
      });
  };

  return (
    <div>
      <div>
        <input
          className="mt-4 outline-none border border-gray-300 w-1/2 mr-6"
          type="text"
          placeholder="Enter comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button
          className="bg-blue-400 w-1/6 outline-none"
          disabled={!comment}
          onClick={() => postComment(post._id)}
        >
          Comment
        </button>
      </div>
    </div>
  );
}
