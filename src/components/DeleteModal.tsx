import { useComments } from "../context/comments";
import { Modal, type ModalProps } from "./Modal";

interface DeleteModalProps extends Omit<ModalProps, "children"> {
  commentId: string;
  replayId?: string;
}

export default function DeleteModal({
  commentId,
  replayId,
  ...props
}: DeleteModalProps) {
  const { deleteComment } = useComments();

  const handleDelete = () => {
    deleteComment(commentId, replayId);

    props.onClose();
  };

  return (
    <Modal {...props}>
      <Modal.Title>Delete comment</Modal.Title>

      <Modal.Description className="w-[90%] my-4">
        Are you want to delete this comment? This will remove the comment and
        can not be undone.
      </Modal.Description>

      <Modal.Footer>
        <button
          onClick={props.onClose}
          className="rounded-lg px-6 py-2 text-sm text-white bg-grayish-blue uppercase"
        >
          No, cancel
        </button>

        <button
          className="uppercase rounded-lg px-6 py-2 text-sm text-white bg-soft-red"
          onClick={handleDelete}
        >
          Yes, delete
        </button>
      </Modal.Footer>
    </Modal>
  );
}
