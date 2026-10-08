import { Info, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { autoLinkTags } from "@/utils/autoLinkTags";

export function MaterialDescriptionContent({ description, tags = [] }) {
  if (!description) {
    return (
      <p className="text-gray-400 italic">
        No description has been provided for this material.
      </p>
    );
  }

  return (
    <div className="relative bg-white p-5 -mt-4 shadow-md rounded-md transition">
      <div className="mb-4 pt-4 flex items-center gap-2">
        <Info className="w-5 h-5 text-blue-500" />
        <h3
          className="text-lg md:text-xl font-semibold text-gray-800"
          id="material-description-heading"
        >
          Material Generation Description
        </h3>
      </div>

      <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none text-gray-800 leading-relaxed prose-a:text-blue-600 hover:prose-a:text-blue-800">
        <ReactMarkdown
          components={{
            a: ({ href, children }) => {
              const isTagLink = href?.startsWith("/materials?tag=");
              return isTagLink ? (
                <a
                  href={href}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 font-semibold rounded-full text-sm hover:bg-blue-100 transition"
                  title={`See more materials tagged with ${children}`}
                >
                  <Tag className="w-3.5 h-3.5" />
                  {children}
                </a>
              ) : (
                <a
                  href={href}
                  className="text-blue-600 underline hover:text-blue-800 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              );
            },
          }}
        >
          {autoLinkTags(description, tags)}
        </ReactMarkdown>
      </div>
    </div>
  );
}
