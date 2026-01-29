import { useEffect, useState, useCallback, useRef } from "react";
import api from "../../../api/axios";
import FacultyLayout from "../FacultyLayout";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noteTitle, setNoteTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const loadNotes = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/notes"); 
      setNotes(res.data || []);
    } catch (err) {
      console.error("Failed to load notes", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      await api.post("/notes/upload", formData);
      
      setNoteTitle("");
      setSelectedFile(null);
      loadNotes();
      alert("Note uploaded successfully!");
    } catch (err) {
      console.error("Upload failed", err);
      alert(err.response?.status === 403 ? "Access Denied: Faculty role required." : "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      loadNotes();
      alert("Note deleted successfully");
    } catch (err) {
      console.error("Delete failed", err);
      alert("Could not delete note.");
    }
  };

  return (
    <FacultyLayout>
      <div className="flex flex-col lg:flex-row gap-8 p-6 h-full">
        
        <div className="flex-1 bg-[#1a1c1e] border border-slate-800 rounded-[2.5rem] p-8 min-h-[500px] shadow-xl">
          <h2 className="text-2xl font-semibold text-white mb-8 capitalize">your uploaded notes</h2>
          
          <div className="space-y-4 overflow-y-auto max-h-[65vh] pr-4 scrollbar-hide">
            {loading ? (
              <p className="text-slate-500 text-center animate-pulse">Syncing with server...</p>
            ) : notes.length === 0 ? (
              <p className="text-slate-600 text-center mt-20 italic">No notes uploaded yet.</p>
            ) : (
              notes.map((note) => (
                <div key={note.id} className="bg-white/5 border border-slate-700 p-5 rounded-3xl flex justify-between items-center group hover:bg-white/10 transition-all">
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{note.fileName}</span>
                    <span className="text-slate-500 text-xs uppercase tracking-widest mt-1 font-semibold">
                      Faculty: {note.uploadedBy}
                    </span>
                  </div>
                  
                  <div className="flex gap-4">
                    <a 
                      href={note.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 text-sm font-bold uppercase tracking-widest"
                    >
                      View
                    </a>
                    <button 
                      onClick={() => handleDelete(note.id)}
                      className="text-red-500 hover:text-red-400 text-sm font-bold uppercase tracking-widest"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="w-full lg:w-[350px]">
          <div className="bg-[#1a1c1e] border border-slate-800 rounded-[2.5rem] p-8 shadow-xl flex flex-col gap-6 sticky top-6">
            
            <input 
              type="text"
              placeholder="notes title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="w-full bg-transparent border border-slate-700 rounded-full px-6 py-3 text-white text-center outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-600 font-medium"
            />

            <input 
              type="file"
              ref={fileInputRef}
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="hidden"
            />

            <div 
              onClick={() => fileInputRef.current.click()}
              className={`w-full aspect-[4/3] border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center p-6 cursor-pointer transition-all
                ${selectedFile ? 'border-green-500 bg-green-500/5' : 'border-slate-700 hover:border-indigo-500 hover:bg-slate-800/30'}`}
            >
              <p className="text-slate-400 text-sm text-center font-bold uppercase tracking-tight">
                {selectedFile ? `File: ${selectedFile.name}` : 'Click to select note'}
              </p>
              {!selectedFile && <span className="text-slate-600 text-[10px] mt-2 uppercase">PDF, PNG, JPG supported</span>}
            </div>

            <button
              onClick={handleUpload}
              disabled={loading}
              className="w-full bg-white text-black font-black py-4 rounded-full hover:bg-indigo-500 hover:text-white transition-all active:scale-95 uppercase text-xs tracking-[0.2em] disabled:bg-slate-700"
            >
              {loading ? "uploading..." : "upload notes"}
            </button>
          </div>
        </div>

      </div>
    </FacultyLayout>
  );
};

export default Notes;