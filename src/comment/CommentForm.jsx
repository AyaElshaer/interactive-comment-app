import { useContext, useState } from "react";
import { v1 as uuidv1 } from "uuid";

import data from "../../data.json";
import PostContext from "../context/comments";

import { ActionButton } from "../components";

export function CommentForm() {
  const currentUser = data.currentUser;

  const [content, setContent] = useState();

  const { addComment } = useContext(PostContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      id: uuidv1(),
      content: content,
      score: 0,
      user: currentUser,
      createdAt: "2 days ago",
      replies: [],
    };

    addComment(newComment);
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-[1fr_1fr] lg:grid-cols-[auto_1fr_auto] gap-3 bg-white mb-4 rounded-lg p-5 "
    >
      <img
        src={currentUser.image.png}
        className="avatar-img row-start-2 lg:row-start-1 self-center lg:self-auto"
      />

      <textarea
        className="rounded-lg border-[1px] border-light-gray  focus:border-grayish-blue placeholder:text-grayish-blue placeholder:text-sm p-4 w-full min-h-[80px] col-span-3 lg:col-span-1"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        placeholder="Add a comment..."
      />

      <ActionButton onSubmit={handleSubmit} className="col-start-3 ">
        send
      </ActionButton>
    </form>
  );
}
