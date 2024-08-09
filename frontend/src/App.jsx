import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Import necessary routing components
import AddItem from "./AddItem";
import { useParams } from "react-router-dom";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/posts");
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div>
        <AddItem />
        <h1>Newest Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              {post.title} 
              <span className="authorTitle">Created by </span>
              <span className="authorName">{post.author}</span>
              <Link to={`/posts/${post._id}`}>Details</Link> {/* Link for details */}
            </li>
          ))}
        </ul>

        <Routes>
          <Route path="/posts/:id" element={<PostDetails />} /> {/* Define route for post details */}
        </Routes>
      </div>
  );
}

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { id } = useParams(); // Get the post ID from URL
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div>
      <h2>Book Details</h2>
      <p>ID: {post._id}</p>
      <p>Title: {post.title}</p>
      <p>Author: {post.author}</p>
      <p>Content: {post.content}</p>
      <Link to="/">Back to posts</Link> {/* Link back to the main posts list */}
    </div>
  );
};
