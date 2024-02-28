import { FormEvent, useState, ChangeEvent } from "react";

import { useComments } from "../context/comments";

import { ActionButton, TextArea } from "../components";

type Props = {
  commentId: string ;
  replyingTo: string;
  onFinish: () => void;
};

export function ReplayForm({ replyingTo, commentId, onFinish }: Props) {
  const [reply, setReply] = useState("");

  const { addReplayToComment, currentUser } = useComments();

  const onReply = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newReplay = {
      id: generateID(),
      content: reply,
      score: 0,
      replyingTo,
      user: currentUser,
      createdAt: "2 days ago",
    };
    addReplayToComment(commentId, newReplay);

    onFinish?.();
  };

  return (
    <form
      onSubmit={onReply}
      className="grid grid-cols-[1fr_1fr] lg:grid-cols-[auto_1fr_auto] gap-3 bg-white mb-4 rounded-lg p-5 "
    >
      <img
        className="avatar-img row-start-2 lg:row-start-1 self-center lg:self-auto"
        src={currentUser.image.png}
        alt={currentUser.username}
      />
      <TextArea
        value={reply}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setReply(e.target.value)
        }
        placeholder="Add a replay..."
        className="col-span-3 lg:col-span-1"
      />

      <ActionButton className="col-start-3">Reply</ActionButton>
    </form>
  );
}

const generateID = () => Math.floor(Math.random() * 1000).toString();
