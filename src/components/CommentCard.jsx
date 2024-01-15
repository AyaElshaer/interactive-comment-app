/* eslint-disable react/prop-types */

import { useState } from "react";
import { ReplayForm } from "./ReplayForm";
import data from "../../data.json";
import DeleteModal from "./DeleteModal";

export function CommentCard({ comment, commentId, replayId }) {
  const { username } = data.currentUser;

  const { user, content, score, createdAt, replyingTo } = comment;

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [scoreValue, setScoreValue] = useState(score);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState();

  const handleEditComment = (data) => {
    setIsFormOpen(true);
    setIsEdit(true);
    setEditData(data);
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const [deletedCommentId, setDeleteCommentId] = useState("");
  const [deletedReplayId, setDeletedReplayId] = useState("");

  const handleDelete = (commentId, replayId) => {
    handleOpenDeleteModal();
    setDeleteCommentId(commentId);
    setDeletedReplayId(replayId);
  };

  return (
    <>
      <div className="relative bg-white mb-4 rounded-lg p-5 flex flex-col-reverse lg:flex-row gap-4">
        <div className=" w-[120px] p-2 lg:p-0 lg:w-[5%] lg:h-24 flex flex-row lg:flex-col justify-around items-center rounded-lg bg-very-light-gray  text-moderate-blue font-medium">
          <button
            onClick={() => setScoreValue(scoreValue + 1)}
            className="text-light-gray hover:text-moderate-blue "
          >
            <img src="images/icon-plus.svg" />
          </button>
          <p className="text-sm">{scoreValue}</p>
          <button
            onClick={() => setScoreValue(scoreValue - 1)}
            className="text-light-gray hover:text-moderate-blue "
          >
            <img src="images/icon-minus.svg" />
          </button>
        </div>

        <div className=" w-[90%]">
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-4 text-sm">
              <img src={user.image.png} className="avatar-img" />
              <p className="text-dark-blue font-medium">{user.username}</p>

              {username === user.username && (
                <div className=" bg-moderate-blue text-white text-xs rounded-sm px-[6px] py-[1px]">
                  you
                </div>
              )}

              <p className="text-grayish-blue">{createdAt}</p>
            </div>

            <div className="absolute bottom-[30px] lg:top-[20px] right-4 ">
              {username === user.username ? (
                <div className="flex gap-4">
                  <div className="flex gap-1 items-center hover:opacity-50">
                    <img src="images/icon-delete.svg" className="w-[10px]" />
                    <p
                      className=" text-soft-red text-sm font-medium"
                      onClick={() =>
                        handleDelete(commentId || comment.id, replayId)
                      }
                    >
                      Delete
                    </p>
                  </div>
                  <div className="flex gap-1 items-center hover:opacity-50">
                    <img src="images/icon-edit.svg" className="w-3" />
                    <p
                      className=" text-moderate-blue text-sm font-medium"
                      onClick={() => handleEditComment(comment, replayId)}
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
                  />
                  <button
                    onClick={() => {
                      setIsFormOpen(!isFormOpen);
                    }}
                  >
                    Replay
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className=" w-full lg:w-[90%] text-grayish-blue text-sm leading-5">
            {replyingTo && (
              <span className=" text-moderate-blue font-medium pr-1 inline-block">{`@${replyingTo}`}</span>
            )}
            {content}
          </p>
        </div>
      </div>

      {isFormOpen && (
        <ReplayForm
          commentId={commentId || comment.id}
          replay={comment}
          onFormOpen={setIsFormOpen}
          isEdit={isEdit}
          editData={editData}
          replayId={replayId}
        />
      )}

      <DeleteModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        commentId={deletedCommentId}
        replayId={deletedReplayId}
      />
    </>
  );
}
