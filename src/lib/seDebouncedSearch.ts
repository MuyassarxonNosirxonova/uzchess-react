import { useEffect, useState } from "react";

export function useDebouncedSearch(searchText: string, delay = 400) {
  const [debouncedText, setDebouncedText] = useState(searchText);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(searchText);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchText, delay]);

  return debouncedText;
}