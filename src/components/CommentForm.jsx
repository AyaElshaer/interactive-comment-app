import { useContext, useState } from "react";
import data from "../../data.json";
import PostContext from "../context/comments";
import { v1 as uuidv1 } from "uuid";
import ActionButton from "./ActionButton";

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
    <div className="flex bg-white mb-4 rounded-lg p-5  gap-4 w-full justify-start">
      <img src={currentUser.image.png} className="avatar-img" />
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-4 w-[90%]">
        <textarea
          className=" rounded-lg border-[1px] border-light-gray  focus:border-grayish-blue p-4 w-full min-h-[80px] resize-none h-max placeholder:text-grayish-blue placeholder:text-sm items-end"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Add a comment..."
        />
        <ActionButton label={"send"} />
      </form>
    </div>
  );
}
