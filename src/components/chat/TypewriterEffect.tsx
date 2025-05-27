
import React, { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  text: string;
  speed?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ 
  text, 
  speed = 10
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  // Reset the effect if the text changes completely
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  return <span>{displayedText}</span>;
};

export default TypewriterEffect;
