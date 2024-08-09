import axios from "axios";
import { useState, useEffect } from "react";
import AddItem from "./AddItem";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null); // State to hold selected book details

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

  const handleDetailsClick = (book) => {
    setSelectedBook(book); // Set selected book to the clicked book
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching
  }

  if (selectedBook) {
    // Render selected book details
    return (
      <div>
        <h2>Book Details</h2>
        <p>ID: {selectedBook._id}</p>
        <p>Title: {selectedBook.title}</p>
        <p>Author: {selectedBook.author}</p>
        <p>Content: {selectedBook.content}</p>
        <button onClick={() => setSelectedBook(null)}>Back to posts</button>
      </div>
    );
  }

  return (
    <div>
      <AddItem />
      <h1>Newest Posts</h1>

      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            {post.title} <span className="authorTitle">Created by </span>{" "}
            <span className="authorName">{post.author}</span>
            <button onClick={() => handleDetailsClick(post)}>Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
