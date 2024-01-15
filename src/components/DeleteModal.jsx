import { useContext } from "react";
import CommentContext from "../context/comments";


// eslint-disable-next-line react/prop-types
export default function DeleteModal({ open, onClose, commentId, replayId }) {
    const { deleteComment } = useContext(CommentContext);

  const handleDelete = () => {
    deleteComment(commentId, replayId)
  }
  return (
    <div
      className={`${
        open ? "absolute" : "hidden"
      }  top-0 left-0 bottom-0 right-0 bg-black bg-opacity-60 w-full lg:min-h-screen flex justify-center items-center`}
    >
      <div className=" w-[90%] lg:w-[25%] h-[200px] bg-white rounded-lg p-6">
        <p className="text-lg text-dark-blue font-medium pb-4">
          Delete comment
        </p>

        <p className=" w-[90%] text-sm text-grayish-blue pb-4">
          Are you want to delete this comment? This will remove the comment and
          can not be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="rounded-lg px-6 py-2 text-sm text-white bg-grayish-blue"
          >
            NO,CANCEL
          </button>
          <button
            className=" rounded-lg px-6 py-2 text-sm text-white bg-soft-red"
            onClick={handleDelete}
          >
            YES,DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
