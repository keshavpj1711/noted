// src/components/notes/Card.jsx
function Card({ title, content, lastEditDate }) {
  const maxContentLength = 150; // Max characters to show in preview
  const truncatedContent = content.length > maxContentLength
    ? content.substring(0, maxContentLength) + "..."
    : content;

  return (
    // Your existing styles for the card container
    <div className="bg-green-900/30 hover:bg-green-800/40 transition-colors duration-200 rounded-xl p-5 text-gray-100 flex flex-col justify-between shadow-lg h-full min-h-[200px] md:min-h-[220px]">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2 break-words">
          {title}
        </h3>
        <p className="text-sm text-gray-200 leading-relaxed break-words">
          {truncatedContent} {/* Use truncated content here */}
        </p>
      </div>
      <p className="text-xs text-gray-500 mt-4 text-right">
        Last Edit: {lastEditDate}
      </p>
    </div>
  );
}

export default Card;
