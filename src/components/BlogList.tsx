import React from 'react';

interface Props {
  blogs: any[];
  onReadMore: (blog: any) => void;
}

export const BlogList: React.FC<Props> = ({ blogs, onReadMore }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map(blog => (
        <div
          key={blog.id}
          className="bg-white p-6 shadow rounded hover:shadow-lg transition-shadow duration-300 border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-3">{blog.title}</h2>

          <div className="flex items-center text-sm text-gray-500 mb-3 space-x-2">
            <span className="inline-flex items-center bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              ✍️ {blog.author}
            </span>
            <span className="inline-flex items-center bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
              📅 {new Date(blog.created_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>

          <p className="text-gray-700 mb-4">{blog.content.slice(0, 120)}...</p>

          <button
            onClick={() => onReadMore(blog)}
            className="text-blue-600 font-semibold hover:underline hover:text-blue-800 transition"
          >
            Read More →
          </button>
        </div>
      ))}
    </div>
  );
};
