import React, { useState, useEffect } from 'react';
import { SearchIcon } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 500); // 500ms delay after typing ends

    return () => {
      clearTimeout(handler); // Cancel timeout if user keeps typing
    };
  }, [query]);

  // Fire search when debounce completes
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search blogs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
