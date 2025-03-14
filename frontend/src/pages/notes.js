import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Dashboard from "./dashboard";
import AddNotes from "./addNotes";
// import AddNotes from "@/components/addNotes"; // Import AddNotes component

const Notes = () => {
  const [notes, setNotes] = useState([]); // Store notes list

  // Fetch all notes when the component loads
  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/notes/get_notes",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNotes(response.data.notes);
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <Dashboard />
      <div className="container">
        <div className="row mt-4">
          {/* Left Side - Notes List */}
          <div className="col-md-6">
            <h3 className="text-primary">Your Notes</h3>
            <motion.div
              className="list-group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {Array.isArray(notes) && notes.length > 0 ? (
                notes.map((note) => (
                  <motion.div key={note.note_id} className="note-card">
                    <h4>{note.note_title}</h4>
                    <p>{note.note_content}</p>
                  </motion.div>
                ))
              ) : (
                <p>Hoops..No notes available</p>
              )}
            </motion.div>
          </div>

          {/* Right Side - Create Note Form */}
          <div className="col-md-6">
            <AddNotes setNotes={setNotes} />
            {/* <AddNotes  /> Use AddNotes component */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
