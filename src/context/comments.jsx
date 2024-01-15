/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";
import data from "../../data.json";

const CommentContext = createContext();

// eslint-disable-next-line react/prop-types
function Provider({ children }) {
  const [comments, setComments] = useState(data.comments);
  
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true)
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const addComment = (comment) => {
    setComments([...comments, comment]);
  };

  const deleteComment = (commentId, replayId) => {
    if (replayId) {
      const newComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: comment.replies.filter((replay) => replay.id !== replayId),
          };
        } else {
          return comment;
        }
      });
      setComments(newComments);
    } else {
      setComments(comments.filter((comment) => comment.id !== commentId));
    }

    setOpenDeleteModal(false)
  };

  const editComment = (commentId, content, replayId) => {
    if (replayId) {
      const newComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: comment.replies.map((replay) => {
            if (replay.id === replayId) {
              return {
                ...replay,
                content,
              };
            } else {
              return replay;
            }
          }),
        };
      } else {
        return comment;
      }
    });
    setComments(newComments);
    } else {
      setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            content,
          };
        } else {
          return comment;
        }
      })
    );
    }
    
  };

  const addReplayToComment = (commentId, replay) => {
    const newComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, replay],
        };
      } else {
        return comment;
      }
    });
    setComments(newComments);
  };

  const values = {
    comments,
    addComment,
    addReplayToComment,
    deleteComment,
    editComment,
    openDeleteModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };

  return (
    <CommentContext.Provider value={values}>{children}</CommentContext.Provider>
  );
}

export const useComments = () => useContext(CommentContext);

export { Provider };
export default CommentContext;
