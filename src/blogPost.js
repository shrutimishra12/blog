import { useState } from "react";
import Comment from "./comments";
import "./App.css";

function BlogPost({ post, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({ ...post });

  const [newComment, setNewComment] = useState({ text: "", author: "" });

  const handleAddComment = () => {
    const updatedComments = [...post.comments, newComment];
    const updatedPostWithComment = { ...post, comments: updatedComments };
    onUpdate(updatedPostWithComment);
    setNewComment({ text: "", author: "" });
  };

  const handleDelete = () => {
    onDelete(post.id);
  };
  const handleUpdate = () => {
    onUpdate(updatedPost);
    setEditing(false);
  };

  console.log("cm", post.comments);

  return (
    <article className="blog-post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <button onClick={() => setEditing(true)}>
        <i className="fas fa-edit"></i> Edit
      </button>
      <button style={{ marginLeft: "4px" }} onClick={handleDelete}>
        <i className="fas fa-trash-alt"></i> Delete
      </button>

      {editing && (
        <div className="edit-modal">
          <div style={{ display: "flex" }}>
            <div>
              <input
                type="text"
                value={updatedPost.title}
                onChange={(e) =>
                  setUpdatedPost({ ...updatedPost, title: e.target.value })
                }
              />
            </div>
            <div style={{ marginLeft: "4px" }}>
              <textarea
                value={updatedPost.content}
                onChange={(e) =>
                  setUpdatedPost({ ...updatedPost, content: e.target.value })
                }
              />
            </div>
          </div>

          <div style={{ display: "flex", marginTop: "4px" }}>
            <button
              onClick={handleUpdate}
              style={{
                backgroundColor: "green",
                color: "white",
              }}
            >
              Save
            </button>
            <button
              style={{
                marginLeft: "4px",
                backgroundColor: "white",
                border: "2px solid red",
              }}
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div>
        <div style={{ marginTop: "6px" }}>
          <input
            type="text"
            placeholder="Your Name"
            value={newComment.author}
            onChange={(e) =>
              setNewComment({ ...newComment, author: e.target.value })
            }
          />
        </div>

        <div style={{ marginTop: "4px" }}>
          <textarea
            placeholder="Leave a Comment"
            value={newComment.text}
            onChange={(e) =>
              setNewComment({ ...newComment, text: e.target.value })
            }
          />
        </div>

        <div>
          <button
            style={{
              backgroundColor: "deeppink",
              color: "white",
              padding: "4px",
              border: "2px solid red",
            }}
            onClick={handleAddComment}
          >
            Add Comment
          </button>
        </div>
      </div>
      {post.comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </article>
  );
}

export default BlogPost;
