import { useState, useEffect } from 'react';

export const useFontLoading = (fontFamily) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!fontFamily) return;

    // Check if font is already loaded
    if (document.fonts && document.fonts.check) {
      if (document.fonts.check(`16px "${fontFamily}"`)) {
        setIsLoaded(true);
        return;
      }
    }

    // Fallback: check if font is available after a short delay
    const checkFont = () => {
      if (document.fonts && document.fonts.check) {
        if (document.fonts.check(`16px "${fontFamily}"`)) {
          setIsLoaded(true);
          return;
        }
      }
      
      // Simple fallback - assume loaded after 1 second
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    };

    // Check immediately and after font load events
    checkFont();
    
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        checkFont();
      });
    }

    // Fallback timeout
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [fontFamily]);

  return isLoaded;
};
