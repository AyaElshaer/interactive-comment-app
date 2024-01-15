/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import data from "../../data.json";
import PostContext from "../context/comments";
import ActionButton from "./ActionButton";
import { v1 as uuidv1 } from "uuid";

export function ReplayForm({
  commentId,
  replay,
  onFormOpen,
  isEdit,
  editData
}) {
  const { user } = replay;

  const currentUser = data.currentUser;
  const [replayContent, setReplayContent] = useState();

  const { addReplayToComment, editComment } = useContext(PostContext);

  useEffect(() => {
    if (isEdit) {
      setReplayContent(editData.content);
    }
  }, [isEdit, editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      editComment(commentId, replayContent, editData.id);
    } else {
      const newReplay = {
        id: uuidv1(),
        content: replayContent,
        score: 0,
        replyingTo: user.username,
        user: currentUser,
        createdAt: "2 days ago",
      };
      addReplayToComment(commentId, newReplay);
    }

    onFormOpen(false);
  };

  return (
    <div className="flex bg-white mb-4 rounded-lg p-5  gap-4 w-full">
      <img src={currentUser.image.png} className="avatar-img" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row items-end gap-4 w-[90%]"
      >
        <textarea
          className=" rounded-lg border-[1px] border-grayish-blue p-4 w-full min-h-[80px] resize-none h-fit"
          onChange={(e) => setReplayContent(e.target.value)}
          value={replayContent}
          placeholder="Add a replay..."
        />
        <ActionButton label={isEdit ? "edit" : "replay"} />
      </form>
    </div>
  );
}
