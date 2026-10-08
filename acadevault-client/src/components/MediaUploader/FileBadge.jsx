import { getFileInfo } from "@/utils/getFileInfo";
import { FileText, FileVideo, X } from "lucide-react";

export default function FileBadge({ file, onRemove }) {
  const { name, size, type } = getFileInfo(file);

  const renderPreview = () => {
    if (type === "image") {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt={name}
          className="w-10 h-10 object-cover rounded-md"
        />
      );
    }

    const iconProps = { size: 20 };
    if (type === "video") {
      return (
        <div className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-md">
          <FileVideo {...iconProps} />
        </div>
      );
    }

    return (
      <div className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-500 rounded-md">
        <FileText {...iconProps} />
      </div>
    );
  };

  return (
    <div
      className="flex items-center gap-3 p-2 bg-white border rounded-lg shadow-sm text-sm max-w-xs"
      title={`${name} (${size})`}
    >
      {renderPreview()}

      <div className="flex-1 min-w-0">
        <div className="truncate font-medium">{name}</div>
        <div className="text-gray-400 text-xs">{size}</div>
      </div>

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-gray-400 hover:text-red-500 transition"
          title="Remove file"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
