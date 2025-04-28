import { useState, memo } from 'react';

const DiaryEntry = ({ entry, onUpdate }) => { 
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(entry.content);

  const handleUpdate = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await onUpdate(entry.id, editedContent);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  return (
    <div className="diary-entry">
      <div className="entry-header">
        <span className="entry-date">
          {new Date(entry.createdAt).toLocaleString()}
        </span>
        <div className="entry-actions">
          {!isEditing ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="edit-btn"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsEditing(false);
              }}
              className="cancel-btn"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="edit-mode">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
          <button
            onClick={handleUpdate}
            className="save-btn"
          >
            Save
          </button>
        </div>
      ) : (
        <p className="entry-content">{entry.content}</p>
      )}
    </div>
  );
};

export default memo(DiaryEntry);