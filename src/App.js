import React, { useState } from "react";
import Header from "./header";

import "./App.css";
import BlogPost from "./blogPost";
import Footer from "./footer";

function App() {
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "My First Blog Post",
      content: "This is the content of the first post.",
      comments: [],
    },
    {
      id: 2,
      title: "Another Blog Post",
      content: "More content for the second post.",
      comments: [],
    },
  ]);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    comments: [],
  });

  const handleCreate = () => {
    const newId = blogPosts.length + 1;
    const updatedPosts = [...blogPosts, { ...newPost, id: newId }];
    setBlogPosts(updatedPosts);
    setNewPost({ title: "", content: "", comments: [] });
  };
  const handleDelete = (postId) => {
    const updatedPosts = blogPosts.filter((post) => post.id !== postId);
    setBlogPosts(updatedPosts);
  };

  const handleUpdate = (updatedPost) => {
    const updatedPosts = blogPosts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setBlogPosts(updatedPosts);
  };

  console.log("blogPost", blogPosts);
  return (
    <div>
      <Header />
      <div className="container">
        <div className="form-container">
          <h2>Create Your Blog-Post</h2>
          <form>
            <input
              style={{ padding: "6px", width: "100%" }}
              type="text"
              placeholder="Title"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
            />
            <div
              style={{
                marginTop: "8px",
              }}
            >
              <textarea
                style={{ padding: "6px", width: "100%" }}
                placeholder="Content"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
              />
            </div>

            <div>
              <button
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "8px",
                  borderRadius: "6px",
                  marginTop: "12px",
                }}
                type="button"
                onClick={handleCreate}
              >
                Create Post
              </button>
            </div>
          </form>
        </div>

        <div style={{ width: "50%" }}>
          {blogPosts.map((post) => (
            <BlogPost
              key={post.id}
              post={post}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
