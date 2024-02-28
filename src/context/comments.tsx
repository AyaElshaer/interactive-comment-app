import { createContext, useContext, useState } from "react";

import type { Comment, Reply, User } from "../comment/types";
import data from "../../data.json";

interface CommentContext {
  comments: Comment[];
  currentUser: User;
  addComment: (comment: Comment) => void;
  addReplayToComment: (commentId: string, replay: Reply) => void;
  deleteComment: (commentId: string, replayId?: string) => void;
  editComment: (commentId: string, content: string, replayId?: string) => void;
}

const CommentContext = createContext<CommentContext | null>(null);

export function CommentProvider({ children }: { children: React.ReactNode }) {
  const [comments, setComments] = useState(data.comments);

  const addComment = (comment: Comment) => {
    setComments([...comments, comment]);
  };

  const deleteComment: CommentContext["deleteComment"] = (
    commentId,
    replayId
  ) => {
    if (!replayId) {
      setComments(comments.filter((comment) => comment.id !== commentId));
      return;
    }

    const newComments = comments.map((comment) => {
      if (comment.id !== commentId) return comment;

      return {
        ...comment,
        replies: comment.replies.filter((replay) => replay.id !== replayId),
      };
    });
    setComments(newComments);
  };

  const editComment: CommentContext["editComment"] = (commentId, content, replayId) => {
    if (!replayId) {
      setComments(
        comments.map((comment) =>
          comment.id === commentId ? { ...comment, content } : comment
        )
      );
      return;
    }

    const newComments = comments.map((comment) => {
      if (comment.id !== commentId) return comment;

      return {
        ...comment,
        replies: comment.replies.map((reply) =>
          reply.id === replayId ? { ...reply, content } : reply
        ),
      };
    });

    setComments(newComments);
  };

  const addReplayToComment = (commentId: string, replay: Reply) => {
    const newComments = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, replies: [...comment.replies, replay] }
        : comment
    );
    setComments(newComments);
  };

  const values: CommentContext = {
    comments,
    currentUser: data.currentUser,
    addComment,
    addReplayToComment,
    deleteComment,
    editComment,
  };

  return (
    <CommentContext.Provider value={values}>{children}</CommentContext.Provider>
  );
}

export const useComments = () => {
  const commentsContext = useContext(CommentContext);

  if (!commentsContext) {
    throw new Error(
      "the `useComment` hook must be used inside the `CommentProvider`."
    );
  }

  return commentsContext;
};

export default CommentContext;
