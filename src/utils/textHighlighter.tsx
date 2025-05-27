
import React from 'react';

/**
 * Highlights matching text within a string based on a search query
 * 
 * @param text The original text to highlight matches in
 * @param query The search query to highlight
 * @returns React element with highlighted text
 */
export function highlightMatch(text: string, query: string) {
  // Safety checks for null or undefined inputs
  if (!text || typeof text !== 'string') return '';
  if (!query || !query.trim()) return text;
  
  try {
    const regex = new RegExp(`(${query.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    
    return (
      <>
        {parts.map((part, i) => (
          regex.test(part) 
            ? <span key={i} className="bg-primary/20 text-primary">{part}</span> 
            : part
        ))}
      </>
    );
  } catch (error) {
    // Return original text if regex fails
    console.error("Error highlighting text:", error);
    return text;
  }
}
