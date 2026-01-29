
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-hot-toast";
import DeleteIcon from '@mui/icons-material/Delete';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetRole, setTargetRole] = useState("ALL");
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      console.log(res);
      setNotifications(res.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!title || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notifications", {
        title,
        message,
        targetRole,
      });
      toast.success("Notification sent successfully");
      setTitle("");
      setMessage("");
      // Refresh list to see the new notification (if admin is included in target)
      fetchNotifications();
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error("Failed to send notification");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?")) return;

    try {
      await api.delete(`/notifications/admin/${id}`);
      toast.success("Notification deleted");
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Failed to delete notification");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Manage Notifications</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Send Notification Form */}
        <div className="bg-[#18181b]/50 border border-zinc-800 rounded-xl p-6 h-fit">
          <h2 className="text-lg font-semibold text-white mb-4">Send New Notification</h2>
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-zinc-900 text-white p-3 rounded border border-zinc-700 focus:outline-none focus:border-blue-500"
                placeholder="Important Announcement"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Role</label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full bg-zinc-900 text-white p-3 rounded border border-zinc-700 focus:outline-none focus:border-blue-500"
              >
                <option value="ALL">All Users</option>
                <option value="ROLE_STUDENT">Students Only</option>
                <option value="ROLE_FACULTY">Faculty Only</option>
                {/* <option value="ROLE_ADMIN">Admins Only</option> */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-zinc-900 text-white p-3 rounded border border-zinc-700 focus:outline-none focus:border-blue-500 resize-none"
                placeholder="Type your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Notification"}
            </button>
          </form>
        </div>

        {/* Notifications List */}
        <div className="bg-[#18181b]/50 border border-zinc-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Notifications</h2>
            <button onClick={fetchNotifications} className="text-sm text-blue-400 hover:text-blue-300">Refresh</button>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {notifications.length === 0 ? (
              <p className="text-zinc-500 text-center py-8">No notifications found.</p>
            ) : (
              notifications.map((notification) => (
                <div key={notification.id} className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors group relative">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-white">{notification.title}</h3>
                    <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                      {notification.targetRole || "ALL"}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 mb-3 whitespace-pre-wrap">{notification.message}</p>
                  <div className="flex justify-between items-center text-xs text-zinc-600 border-t border-zinc-800/50 pt-2">
                    <span>{new Date(notification.createdAt).toLocaleDateString()}</span>

                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 p-1 rounded"
                      title="Delete Notification"
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
