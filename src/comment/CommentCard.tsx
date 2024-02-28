import { useState } from "react";

import { useDisclosure, useBoolean } from "../hooks";
import { useComments } from "../context/comments";

import { EditForm, ReplayForm } from ".";
import DeleteModal from "../components/DeleteModal";
import { Comment, Reply } from "./types";

type CommentCardProps =
  | {
      as?: "comment";
      comment: Comment;
      parentCommentID?: never;
    }
  | {
      as: "reply";
      comment: Reply;
      parentCommentID: string;
    };

export function CommentCard(props: CommentCardProps) {
  const { currentUser } = useComments();
  const deleteModalDisclosure = useDisclosure();

  const { user, content, score, createdAt } = props.comment;

  const commentId =
    props.as === "reply" ? props.parentCommentID : props.comment.id;
  const replyID = props.as === "reply" ? props.comment.id : undefined;

  const [scoreValue, setScoreValue] = useState(score);

  const [isReplying, setIsReplying] = useBoolean();
  const [isEditing, setIsEditing] = useBoolean();

  const isMe = currentUser.username === user.username;

  return (
    <>
      <div className="comment w-full bg-white mb-4 rounded-lg p-4 lg:p-5 flex flex-col-reverse lg:flex-row gap-4">
        <div className="score-container flex flex-row lg:flex-col justify-around items-center h-8 lg:h-24 p-2 lg:p-0 w-auto rounded-lg bg-very-light-gray text-moderate-blue font-medium">
          <button
            onClick={() => setScoreValue(scoreValue + 1)}
            className="py-3 text-light-gray hover:text-moderate-blue "
          >
            <img src="images/icon-plus.svg" alt="" />
          </button>

          <p className="text-sm">{scoreValue}</p>

          <button
            onClick={() => setScoreValue(scoreValue - 1)}
            className=" py-3 text-light-gray hover:text-moderate-blue "
          >
            <img src="images/icon-minus.svg" alt="" />
          </button>
        </div>

        <div className="user-info flex gap-2 items-center">
          <img
            src={user.image.png}
            alt={user.username}
            className="avatar-img"
          />

          <p className="text-dark-blue font-medium">{user.username}</p>

          {isMe && (
            <div className=" bg-moderate-blue text-white text-xs rounded-sm px-1.5 py-px">
              you
            </div>
          )}
        </div>

        <div className="create-at flex items-center gap-4 text-sm">
          <p className="text-grayish-blue">{createdAt}</p>
        </div>

        <div className="actions flex justify-end">
          {isMe ? (
            <div className="flex gap-4">
              <div className="flex gap-1 items-center hover:opacity-50">
                <img src="images/icon-delete.svg" className="w-[10px]" />
                <p
                  className=" text-soft-red text-sm font-medium"
                  onClick={deleteModalDisclosure.onOpen}
                >
                  Delete
                </p>
              </div>

              <div className="flex gap-1 items-center hover:opacity-50">
                <img src="images/icon-edit.svg" className="w-3" />
                <p
                  className=" text-moderate-blue text-sm font-medium"
                  onClick={setIsEditing.toggle}
                >
                  Edit
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-moderate-blue text-sm font-medium hover:opacity-50	pointer">
              <img
                className="w-[12px] h-[12px] "
                src="images/icon-reply.svg"
                alt=""
              />

              <button onClick={setIsReplying.toggle}>Replay</button>
            </div>
          )}
        </div>

        <div className="content">
          {isEditing ? (
            <EditForm
              commentID={commentId}
              content={content}
              replyID={replyID}
              onFinish={() => setIsEditing.off()}
            />
          ) : (
            <p className=" w-full lg:w-[90%] text-grayish-blue text-sm leading-5">
              {props.as === "reply" && (
                <span className=" text-moderate-blue font-medium">
                  {`@${props.comment.replyingTo}`}
                </span>
              )}{" "}
              {content}
            </p>
          )}
        </div>
      </div>

      {isReplying && (
        <ReplayForm
          replyingTo={user.username}
          commentId={commentId}
          onFinish={setIsReplying.off}
        />
      )}

      <DeleteModal
        {...deleteModalDisclosure}
        commentId={commentId}
        replayId={replyID}
        closeOnOverlayClick={false}
        closeOnEscClick={false}
      />
    </>
  );
}
