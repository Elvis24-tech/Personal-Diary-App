import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { auth, onAuthStateChanged, signOut } from "./firebase";
import { getEntries, addEntry, updateEntry, deleteEntry } from "./api";
import Auth from "./components/Auth";
import DiaryForm from "./components/DiaryForm";
import DiaryEntry from "./components/DiaryEntry";
import "./App.css";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loadEntries = useCallback(async () => {
    if (user) {
      try {
        const entriesData = await getEntries(user.uid);
        setEntries(entriesData);
      } catch (error) {
        console.error("Error loading entries:", error);
      }
    } else {
      setEntries([]);
    }
  }, [user]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  const handleAddEntry = useCallback(async (content) => {
    try {
      const newEntry = await addEntry(content, user.uid);
      setEntries(prev => [newEntry, ...prev]);
    } catch (error) {
      console.error("Error adding entry:", error);
      throw error; 
    }
  }, [user]);

  const handleUpdateEntry = useCallback(async (id, newContent) => {
    try {
      await updateEntry(id, newContent);
      setEntries(prev => prev.map(entry => 
        entry.id === id ? { ...entry, content: newContent } : entry
      ));
    } catch (error) {
      console.error("Error updating entry:", error);
      throw error;
    }
  }, []);

  const handleDeleteEntry = useCallback(async (id) => {
    try {
      await deleteEntry(id);
      setEntries(prev => prev.filter(entry => entry.id !== id));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      {!user ? (
        <Auth setUser={setUser} />
      ) : (
        <>
          <header>
            <h1>My Personal Diary</h1>
            <div className="header-controls">
              <button 
                onClick={toggleDarkMode} 
                className="dark-mode-toggle"
              >
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </header>
          <main>
            <div className="current-date">
              {format(new Date(), "MMMM do, yyyy - h:mm a")}
            </div>
            <DiaryForm onAddEntry={handleAddEntry} />
            <div className="entries-list">
              {entries.map(entry => (
                <DiaryEntry
                  key={entry.id}
                  entry={entry}
                  onUpdate={handleUpdateEntry}
                />
              ))}
            </div>
          </main>
        </>
      )}
    </div>
  );
}