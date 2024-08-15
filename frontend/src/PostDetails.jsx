import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PostDetails() {
  const { id } = useParams(); // Get the ID from the route parameters
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

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
    return <div>Based on the ID Given, The Post not found</div>; // Handle case where post is not found
  }

  return (
    <div>
      <h2>Book Details</h2>
      <p>ID: {post._id}</p>
      <p>Title: {post.title}</p>
      <p>Author: {post.author}</p>
      <p>Content: {post.content}</p>
      <p>Stamps: {post.stamps}</p>
      <button>Stamp the Post</button>
    </div>
  );
}
