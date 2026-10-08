import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function GiftForm({ material, close }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGift = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Enter a valid recipient email.");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Gift sent successfully!");
      setEmail("");
      setMessage("");
      close();
    } catch {
      toast.error("Failed to send gift");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 space-y-3" aria-live="polite">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Recipient Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter recipient's email"
          className="w-full px-3 py-2 text-sm border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Optional Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Write a short message..."
          className="w-full px-3 py-2 text-sm border rounded-md"
        />
      </div>

      <button
        type="button"
        onClick={handleGift}
        disabled={loading}
        aria-disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition text-sm flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Mail className="w-4 h-4" />
            Send as Gift
          </>
        )}
      </button>
    </div>
  );
}
