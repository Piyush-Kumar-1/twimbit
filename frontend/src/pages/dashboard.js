import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "../component/header";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import AddComment from "../component/addComment";

export default function Dashboard() {
  axios.defaults.withCredentials = true;
  const router = useHistory();
  const [post, setPost] = useState(null);
  const ref = useRef(0);

  let disable = false;
  useEffect(() => {
    axios
      .post("http://localhost:5000/getAll", {
        min: ref.current,
        max: ref.current + 3,
      })
      .then((res) => {
        if (res.data.includes("not")) {
          router.push("/login");
          return;
        }
        if (res.data.length < 3) {
          disable = true;
        }
        if (res.data.length === 3) {
          res.data.pop();
        }
        setPost(res.data);
      });
  }, []);

  const like = (id) => {
    axios.post("http://localhost:5000/like", { id });
  };

  const updateRef = () => {
    ref.current = ref.current + 2;
    axios
      .post("http://localhost:5000/getAll", {
        min: ref.current,
        max: ref.current + 2,
      })
      .then((res) => {
        if (res.data.includes("not")) {
          router.push("/login");
          return;
        }
        setPost([...post, ...res.data]);
      });
  };

  return (
    <div>
      <Header />
      {post
        ? post?.map((item) => (
            <div
              key={item._id}
              className="flex flex-col bg-gray-100 mb-10 mt-5 mx-auto max-w-xl p-5"
            >
              <h2 className="text-xl mb-4">{item.username}</h2>
              <Link to={`/post/${item._id}`} className="mb-4">
                {item.post}
              </Link>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 cursor-pointer `}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={() => like(item._id)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                <p className="mr-4">{item.likes.length}likes</p>
              </div>
              <AddComment post={item} />
              {item?.comments.length > 0 && <p className="mt-4">Comments - </p>}
              {item?.comments.map((individualComment, index) =>
                index < 3 ? (
                  <p key={index}>
                    <span className="mr-4 font-bold">
                      {individualComment.user}
                    </span>
                    {individualComment.comment}
                  </p>
                ) : null
              )}
            </div>
          ))
        : null}
      <button
        onClick={updateRef}
        disabled={disable}
        className="flex bg-blue-200 w-1/10 outline-none mx-auto mt-4 p-2 mb-2"
      >
        Load more
      </button>
    </div>
  );
}
