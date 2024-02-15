/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";

import data from "../../data.json";

const CommentContext = createContext();

// eslint-disable-next-line react/prop-types
export function CommentProvider({ children }) {
  const [comments, setComments] = useState(data.comments);

  const addComment = (comment) => {
    setComments([...comments, comment]);
  };

  const deleteComment = (commentId, replayId) => {
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

  const editComment = (commentId, content, replayId) => {
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

  const addReplayToComment = (commentId, replay) => {
    const newComments = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, replies: [...comment.replies, replay] }
        : comment
    );
    setComments(newComments);
  };

  const values = {
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

export const useComments = () => useContext(CommentContext);

export default CommentContext;
