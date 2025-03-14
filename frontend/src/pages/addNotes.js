import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const AddNotes = ({ setNotes }) => {
  const router = useRouter();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle Create Note
  const handleCreateNote = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated");
      return router.push("/login");
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/notes/create_notes",
        { note_title: noteTitle, note_content: noteContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setSuccess("Note Created Successfully!");

        console.log(response.data, "Full API Response");

        const newNote = response.data; // Ensure correct response format

        console.log(newNote, "Note data");
        if (newNote) {
          setNotes((prevNotes) => {
            // Ensure prevNotes is an array before spreading
            return Array.isArray(prevNotes)
              ? [...prevNotes, newNote]
              : [newNote];
          });
        }

        setNoteTitle("");
        setNoteContent("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error creating note");
    }
  };

  // Handle Cancel
  const handleCancel = (e) => {
    e.preventDefault();
    alert("Canceled");
    setNoteTitle("");
    setNoteContent("");
  };

  return (
    <motion.div
      className="card p-4 shadow-lg rounded-3"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-center text-primary">Create a New Note</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      {success && <p className="text-success text-center">{success}</p>}

      <form>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows="4"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Buttons in Single Row */}
        <div className="row">
          <div className="col-6">
            <motion.button
              className="btn btn-primary w-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateNote}
            >
              Add
            </motion.button>
          </div>
          <div className="col-6">
            <motion.button
              className="btn btn-danger w-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default AddNotes;
