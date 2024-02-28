import { useState, FormEvent, ChangeEvent } from "react";

import { useComments } from "../context/comments";

import { TextArea, ActionButton } from "../components";

type Props = {
  commentID: string;
  content: string;
  replyID?: string ;
  onFinish: () => void;
};

export function EditForm({ commentID, content, replyID, onFinish }: Props) {
  const [editedComment, setEditedComment] = useState(content);

  const { editComment } = useComments();

  const onEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    editComment(commentID, editedComment, replyID);

    onFinish?.();
  };

  return (
    <form className="flex flex-col items-end gap-4 w-[90%]" onSubmit={onEdit}>
      <TextArea
        value={editedComment}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setEditedComment(e.target.value)
        }
      />

      <ActionButton>update</ActionButton>
    </form>
  );
}
