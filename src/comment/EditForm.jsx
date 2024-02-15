/* eslint-disable react/prop-types */
import { useContext, useState } from "react";

import PostContext from "../context/comments";

import { TextArea, ActionButton } from "../components";

export function EditForm({ commentID, content, replyID, onFinish }) {
  const [editedComment, setEditedComment] = useState(content);

  const { editComment } = useContext(PostContext);

  const onEdit = (e) => {
    e.preventDefault();

    editComment(commentID, editedComment, replyID);

    onFinish?.();
  };

  return (
    <form className="flex flex-col items-end gap-4 w-[90%]" onSubmit={onEdit}>
      <TextArea
        value={editedComment}
        onChange={(e) => setEditedComment(e.target.value)}
      />

      <ActionButton>update</ActionButton>
    </form>
  );
}
