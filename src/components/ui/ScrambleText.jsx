import React, { useState, useEffect } from 'react';

export default function ScrambleText({ text, className }) {
  const [displayedText, setDisplayedText] = useState('');
  const chars = '!<>-_\\/[]{}—=+*^?#________'; // Cyber characters

  useEffect(() => {
    let iteration = 0;
    let interval = null;

    // Start scrambling immediately on mount
    interval = setInterval(() => {
      setDisplayedText(
        text
          .split('')
          .map((letter, index) => {
            // If we've passed this letter's index, show the real letter
            if (index < iteration) {
              return text[index];
            }
            // Otherwise show a random cyber character
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      // Stop when all letters are revealed
      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3; // Controls the speed (lower denominator = faster)
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={`font-mono ${className}`}>{displayedText}</span>;
}