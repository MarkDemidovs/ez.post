import axios from "axios";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom"; // Import useNavigate
import AddItem from "./AddItem";
import { useParams } from "react-router-dom";
import NavBar from "./Navbar";
import Footer from "./footer";

const POSTS_PER_PAGE = 30;
const MAX_PAGES_TO_DISPLAY = 10; // Maximum number of pages to display

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPosts, setShowPosts] = useState(true); // State to control visibility of posts
  const [totalPosts, setTotalPosts] = useState(0); // Total number of posts for pagination

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/posts");
        const fetchedPosts = res.data;

        // Only keep the 100 most recent posts
        const recentPosts = fetchedPosts.slice(-100);
        setPosts(recentPosts);
        setTotalPosts(recentPosts.length); // Store total number of posts
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
    <>
      <NavBar />
      <div>
        <div className="topItems">
        <h1 id="titlePosts">Recent Posts (sorted by oldest)</h1>
        <AddItem />

        </div>
        <NavigationBar totalPosts={totalPosts} />

        <Routes>
          <Route
            path="/"
            element={<PostList posts={posts} setShowPosts={setShowPosts} />}
          />
          <Route
            path="/posts/:id"
            element={<PostDetails setShowPosts={setShowPosts} />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

const NavigationBar = ({ totalPosts }) => {
  const pages = Math.min(
    Math.ceil(totalPosts / POSTS_PER_PAGE),
    MAX_PAGES_TO_DISPLAY
  ); // Limit to 10 pages
  return (
    <nav>
      <ul id="ulNav">
        {[...Array(pages).keys()].map((page) => (
          <li key={page + 1}>
            <Link to={`/?page=${page + 1}`}>{`Page ${page + 1}`}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const PostList = ({ posts, setShowPosts }) => {
  const query = new URLSearchParams(useLocation().search);
  const page = parseInt(query.get("page"), 10) || 1; // Default to first page

  // Calculate posts to display
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const selectedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Show posts list
  setShowPosts(true);

  return (
    <ul id="ulPosts">
      {selectedPosts.map((post) => (
        <li key={post._id}>
          {post.title}
          <span className="authorTitle">Created by </span>
          <span className="authorName">{post.author}</span>
          <Link to={`/posts/${post._id}`}>View Post</Link>
        </li>
      ))}
    </ul>
  );
};

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
    return <div>Based on the ID Given, The Post not found.</div>;
  }

  const handleBack = () => {
    setShowPosts(true); // Show posts when going back to the posts list
    navigate("/"); // Navigate back to the posts list
  };

  /*const stampPost = () => {
    // here {post.stamps++}
  }*/

  return (
    <div className="fullPost">
      <h1 className="postTitlte">{post.title}</h1>
      <p className="postAuthor">By: {post.author}</p>
      <p>ID: {post._id}</p>
      <div className="inputFielding">{post.content}</div>
      <button className="backButton" onClick={handleBack}>Back to Posts</button>
    </div>
  );
};


// the stamps have been stamped out. 

// <button onClick={stampPost}>Stamp the Post</button>
// <p>Stamps: {post.stamps}</p>
// <span>{post.stamps} Stamps</span>