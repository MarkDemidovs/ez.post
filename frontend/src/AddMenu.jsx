import axios from "axios";
import { useState } from "react";

export default function AddMenu() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const data = {
    title,
    author,
    content,
  };

  const handleCreatePost = () => {
    if (isSubmitting) return; // Prevent the function from running if already submitting
    setIsSubmitting(true); // Disable the button

    axios
      .post("http://localhost:5000/posts", data)
      .then(() => {
        // Reset form state if needed
        setTitle("");
        setAuthor("");
        setContent("");
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        // Re-enable the button after 15 seconds
        setTimeout(() => {
          setIsSubmitting(false);
        }, 15000); // 15000 milliseconds = 15 seconds
      });
  };

  return (
    <div>
      <h2>Post Creator 1.1</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        placeholder="Enter a title.."
        minLength={4}
        maxLength={250}
      />
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Enter the name of the author *not required..."
      />
      <textarea
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter the content of the post:"
        minLength={10}
        maxLength={7000}
      />
      <button type="submit" onClick={handleCreatePost} disabled={isSubmitting}>
        {isSubmitting ? "Please wait..." : "Create the post"}
      </button>
    </div>
  );
}
