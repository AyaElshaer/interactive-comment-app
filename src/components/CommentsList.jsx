
import { useComments } from "../context/comments";
import { CommentCard } from "./CommentCard";

export function CommentsList() {
  const { comments } = useComments();

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <CommentCard comment={comment} />

          <div className=" pl-4  lg:ml-12  lg:pl-8 border-l-2 border-light-gray rounded-sm">
            {comment.replies.map((replay) => (
              <CommentCard
                key={replay.id}
                commentId={comment.id}
                replayId={replay.id}
                comment={replay}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
