import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom"; // Import useNavigate
import AddItem from "./AddItem";
import { useParams } from "react-router-dom";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPosts, setShowPosts] = useState(true); // State to control visibility of posts

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

      {/* Render posts only if showPosts is true */}
      {showPosts && (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              {post.title} 
              <span className="authorTitle">Created by </span>
              <span className="authorName">{post.author}</span>
              <Link to={`/posts/${post._id}`}>Details</Link>
            </li>
          ))}
        </ul>
      )}

      <Routes>
        <Route 
          path="/posts/:id" 
          element={<PostDetails setShowPosts={setShowPosts} />} 
        /> 
      </Routes>
    </div>
  );
}

const PostDetails = ({ setShowPosts }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); 
  
  const navigate = useNavigate(); // Use useNavigate hook to programmatically navigate

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
  
    // Hide posts list when post details are shown
    setShowPosts(false);
   
    return () => setShowPosts(true); // Show posts again when navigating away
  }, [id, setShowPosts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  const handleBack = () => {
    setShowPosts(true); // Show posts when going back to the posts list
    navigate('/'); // Navigate back to the posts list
  };

  return (
    <div>
      <h2>Post Details</h2>
      <p>ID: {post._id}</p>
      <p>Title: {post.title}</p>
      <p>Author: {post.author}</p>
      <p>Content: {post.content}</p>
      <button onClick={handleBack}>Back to Posts</button>
    </div>
  );
};
