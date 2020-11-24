import { useState, useEffect, useRef } from 'react';

export default function useComponentVisible(initialIsVisible = false) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible,
  );
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (
      ref.current
      && !ref.current.contains(event.target)
      && isComponentVisible
    ) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  const toggleIsComponentVisible = () => setIsComponentVisible(!isComponentVisible);

  return {
    ref,
    isComponentVisible,
    setIsComponentVisible,
    toggleIsComponentVisible,
  };
}
