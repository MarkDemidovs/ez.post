import axios from "axios";
import { useState, useEffect } from "react";
import AddItem from "./AddItem";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/posts");
        setPosts(res.data); // Assuming res.data is an array of post objects
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching
  }

  return (
    <div>
      <AddItem />
      <h1>Post Titles</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>{post.title} <span className="authorTitle">Created by </span> <span className="authorName">{post.author}</span></li> // Assuming each post has a unique '_id' field
        ))}
        
      </ul>
    </div>
  );
}
