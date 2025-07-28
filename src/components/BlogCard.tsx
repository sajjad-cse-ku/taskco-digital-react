import React from 'react';

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  image?: string;
  created_at: string;
}

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden">
      {blog.image && (
        <img src={blog.image} alt={blog.title} className="h-48 w-full object-cover" />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h2>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{blog.excerpt}</p>
        <div className="text-xs text-gray-400">{formatDate(blog.created_at)}</div>
      </div>
    </div>
  );
}
