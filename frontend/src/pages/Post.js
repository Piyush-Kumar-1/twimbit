import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AddComment from "../component/addComment";
import Header from "../component/header";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:5000/get", {
        id,
      })
      .then((res) => {
        if (res.data === false) {
          return;
        }
        setPost(res.data);
      });
  }, [id]);

  const like = (id) => {
    axios.post("http://localhost:5000/like", { id });
  };

  return (
    <div>
      <Header />
      {post ? (
        <div
          key={post._id}
          className="flex flex-col bg-gray-100 mb-10 mt-5 mx-auto max-w-xl p-5"
        >
          <h2 className="text-xl mb-4">{post.username}</h2>
          <p className="mb-4">{post.post}</p>
          <p className="mb-4">{post.details}</p>

          <div className="flex posts-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => like(post._id)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            <p className="mr-4">{post.likes.length}likes</p>
          </div>
          <AddComment post={post} />
          {post?.comments.length > 0 && <p>Comments</p>}
          {post?.comments.map((individualComment, index) => (
            <p key={index}>
              <span className="mr-4 font-bold">{individualComment.user}</span>
              {individualComment.comment}
            </p>
          ))}
        </div>
      ) : (
        <p>not found</p>
      )}
    </div>
  );
}
