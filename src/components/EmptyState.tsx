import React from 'react';

export const EmptyState = ({ searchQuery }: { searchQuery: string }) => {
  return (
    <div className="text-center text-gray-500 py-12">
      No blog posts found{searchQuery && ` for "${searchQuery}"`}.
    </div>
  );
};
