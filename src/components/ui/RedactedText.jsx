import React from 'react';

export default function RedactedText({ text }) {
  // Regex to find content inside square brackets [content]
  const parts = text.split(/(\[.*?\])/g);

  return (
    <p className="text-gray-400 leading-relaxed font-mono text-sm whitespace-pre-line">
      {parts.map((part, index) => {
        // If part starts with [ and ends with ], it is a secret
        if (part.startsWith('[') && part.endsWith(']')) {
          const content = part.slice(1, -1); // Remove brackets
          return (
            <span 
              key={index} 
              className="relative inline-block group cursor-help mx-1 align-bottom"
            >
              {/* The content (hidden by default) */}
              <span className="text-lux-green opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {content}
              </span>
              
              {/* The Redaction Bar (visible by default) */}
              <span className="absolute inset-0 bg-white group-hover:bg-transparent transition-colors duration-300 block h-full w-full select-none" />
              
              {/* Optional: 'Classified' label on hover, or just simple reveal */}
            </span>
          );
        }
        // Regular text
        return <span key={index}>{part}</span>;
      })}
    </p>
  );
}