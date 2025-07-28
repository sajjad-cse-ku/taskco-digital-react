import React from 'react';

interface Props {
  blog: any;
  onBack: () => void;
}

export const BlogPostDetail: React.FC<Props> = ({ blog, onBack }) => {
  return (
    <div className="bg-white p-8 max-w-3xl mx-auto rounded-2xl shadow-md border border-gray-100">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition"
      >
        ← Back to Blog List
      </button>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
          ✍️ {blog.author}
        </span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
          📅{' '}
          {new Date(blog.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>

      <article className="prose prose-lg text-gray-800 whitespace-pre-wrap">
        {blog.content}
      </article>
    </div>
  );
};
