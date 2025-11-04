import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { useAuthStore } from "../../store/useAuthStore";

export default function ExpertProfile() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [expert, setExpert] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [loading, setLoading] = useState(true);

  // booking states
  const [apptDate, setApptDate] = useState("");
  const [apptTime, setApptTime] = useState("");
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  // chat
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [msgText, setMsgText] = useState("");
  const pollRef = useRef(null);

  // reviews
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/experts/${id}`);
        setExpert(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // --- Booking ---
  const handleBook = async () => {
    if (!user) return alert("Login to book");
    if (!apptDate || !apptTime) return alert("Select date & time");
    setBookingLoading(true);
    try {
      const datetime = new Date(`${apptDate}T${apptTime}`);
      const res = await api.post("/experts/appointments", {
        expertId: id,
        name: user.name || user.email,
        contact,
        datetime,
        notes,
      });
      alert("Appointment requested");
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  // --- Chat (simple polling) ---
  const startConversation = () => {
    if (!user) return alert("Login to chat");
    const convId = [user.id, id].sort().join("_");
    setConversationId(convId);
    fetchMessages(convId);
    // start polling every 3s
    pollRef.current = setInterval(() => fetchMessages(convId), 3000);
  };

  const fetchMessages = async (convId) => {
    try {
      const res = await api.get(`/experts/messages?conversationId=${convId}`);
      setMessages(res.data);
    } catch (err) {
      console.error("chat fetch", err);
    }
  };

  const sendMessage = async () => {
    if (!msgText.trim()) return;
    try {
      await api.post("/experts/messages", {
        conversationId,
        toUserId: null,
        text: msgText,
      });
      setMsgText("");
      fetchMessages(conversationId);
    } catch (err) {
      console.error("send msg", err);
    }
  };

  // stop polling on unmount
  useEffect(() => {
    return () => clearInterval(pollRef.current);
  }, []);

  // --- Reviews ---
  const postReview = async () => {
    if (!user) return alert("Login to review");
    setReviewLoading(true);
    try {
      await api.post("/experts/reviews", { expertId: id, rating, comment });
      alert("Review posted");
      // refresh expert data
      const res = await api.get(`/experts/${id}`);
      setExpert(res.data);
      setComment("");
    } catch (err) {
      console.error(err);
      alert("Failed to post review");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!expert) return <div className="p-6">Not found</div>;

  return (
    <div className="p-6 flex gap-6">
      <div className="w-1/3 border rounded-lg shadow-sm p-4 h-fit">
        <img
          src={expert.avatar || "https://via.placeholder.com/150"}
          alt={expert.name}
          className="w-28 h-28 rounded-full mx-auto"
        />
        <h2 className="text-xl font-semibold text-center mt-2">
          {expert.name}
        </h2>
        <p className="text-center text-gray-600">{expert.specialization}</p>
        <div className="mt-3 text-sm text-gray-700">
          <p>
            <strong>Experience:</strong> {expert.experience} yrs
          </p>
          <p>
            <strong>Institution:</strong> {expert.institution}
          </p>
          <p>
            <strong>Location:</strong> {expert.location}
          </p>
        </div>

        <div className="mt-4">
          <h4 className="font-medium">Book Appointment</h4>
          <input
            type="date"
            value={apptDate}
            onChange={(e) => setApptDate(e.target.value)}
            className="w-full border rounded px-2 py-1 mb-2"
          />
          <input
            type="time"
            value={apptTime}
            onChange={(e) => setApptTime(e.target.value)}
            className="w-full border rounded px-2 py-1 mb-2"
          />
          <input
            placeholder="Contact (phone/email)"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full border rounded px-2 py-1 mb-2"
          />
          <textarea
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border rounded px-2 py-1 mb-2"
          ></textarea>
          <button
            disabled={bookingLoading}
            onClick={handleBook}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {bookingLoading ? "Requesting..." : "Request Appointment"}
          </button>
        </div>
      </div>

      <div className="w-2/3 border rounded-lg shadow-sm p-4">
        <div className="flex gap-4 border-b pb-2 mb-4">
          {[
            "about",
            "publications",
            "trials",
            "contact",
            "chat",
            "reviews",
            "analytics",
          ].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={
                activeTab === t
                  ? "border-b-2 border-blue-600 pb-2 font-semibold"
                  : "text-gray-500 pb-2"
              }
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "about" && (
          <div>
            <h3 className="text-lg font-semibold">About</h3>
            <p className="text-gray-700">{expert.aiSummary || expert.bio}</p>
          </div>
        )}

        {activeTab === "publications" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Publications</h3>
            {expert.publications?.length ? (
              expert.publications.map((p) => (
                <div key={p._id} className="border-b py-2">
                  <div className="font-medium">{p.title}</div>
                  <div className="text-sm text-gray-600">{p.source}</div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No publications.</p>
            )}
          </div>
        )}

        {activeTab === "trials" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Trials</h3>
            {expert.trials?.length ? (
              expert.trials.map((t) => (
                <div key={t._id} className="border-b py-2">
                  <div className="font-medium">{t.title}</div>
                  <div className="text-sm text-gray-600">
                    {t.phase} • {t.status}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No trials.</p>
            )}
          </div>
        )}

        {activeTab === "contact" && (
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <p>
              Email: <span className="font-medium">{expert.email}</span>
            </p>
            <p>
              Institution:{" "}
              <span className="font-medium">{expert.institution}</span>
            </p>
          </div>
        )}

        {activeTab === "chat" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Chat</h3>
            {!conversationId ? (
              <button
                onClick={startConversation}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Start Chat
              </button>
            ) : (
              <div className="space-y-3">
                <div className="max-h-64 overflow-y-auto border rounded p-2">
                  {messages.map((m) => (
                    <div
                      key={m._id}
                      className={`p-2 rounded ${
                        m.fromUserId === user?.id
                          ? "bg-blue-50 ml-auto"
                          : "bg-gray-100"
                      }`}
                    >
                      <div className="text-sm">{m.text}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(m.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-2">
                  <input
                    className="flex-1 border rounded px-2 py-1"
                    value={msgText}
                    onChange={(e) => setMsgText(e.target.value)}
                  />
                  <button
                    onClick={sendMessage}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Reviews</h3>
            <div className="mb-3">
              <div className="flex gap-2 items-center">
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="border rounded px-2 py-1"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} star
                    </option>
                  ))}
                </select>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-1 border rounded px-2 py-1"
                  placeholder="Share your experience"
                ></textarea>
                <button
                  disabled={reviewLoading}
                  onClick={postReview}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  {reviewLoading ? "Posting..." : "Post"}
                </button>
              </div>
            </div>

            <div>
              {expert.reviews?.length ? (
                expert.reviews.map((rv) => (
                  <div key={rv._id} className="border-b py-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{rv.rating} ★</div>
                      <div className="text-sm text-gray-400">
                        {new Date(rv.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">{rv.comment}</div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reviews yet.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 border rounded">
                <div className="text-sm text-gray-500">Avg rating</div>
                <div className="text-xl font-semibold">
                  {expert.analytics?.avgRating?.toFixed(2) || 0}
                </div>
              </div>
              <div className="p-3 border rounded">
                <div className="text-sm text-gray-500">Review count</div>
                <div className="text-xl font-semibold">
                  {expert.analytics?.reviewCount || 0}
                </div>
              </div>
              <div className="p-3 border rounded">
                <div className="text-sm text-gray-500">Associated trials</div>
                <div className="text-xl font-semibold">
                  {(expert.trials || []).length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
