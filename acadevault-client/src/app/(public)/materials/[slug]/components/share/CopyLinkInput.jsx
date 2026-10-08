import { Clipboard, Check } from "lucide-react";

export default function CopyLinkInput({ url, copied, onCopy }) {
  return (
    <div className="flex items-center gap-2">
      <input
        readOnly
        value={url}
        className="flex-1 px-3 py-2 text-sm border rounded-md bg-gray-50"
        aria-label="Material link"
      />
      <button
        type="button"
        onClick={onCopy}
        className="p-2 rounded bg-gray-100 hover:bg-gray-200 transition"
        aria-label="Copy link to clipboard"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <Clipboard className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
