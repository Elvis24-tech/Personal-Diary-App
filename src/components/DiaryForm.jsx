import { useState } from "react";

export default function DiaryForm({ onAddEntry }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onAddEntry(content);
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="diary-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind today?"
        required
      />
      <button type="submit">Add Entry</button>
    </form>
  );
}