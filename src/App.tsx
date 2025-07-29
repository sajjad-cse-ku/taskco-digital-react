import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SearchBar } from './components/SearchBar';
import { BlogList } from './components/BlogList';
import { Pagination } from './components/Pagination';
import { LoadingSpinner } from './components/LoadingSpinner';
import { EmptyState } from './components/EmptyState';
import { BlogPostDetail } from './components/BlogPostDetail';

export function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<any>(null);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, searchQuery]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/blog-posts`, {
        params: { page: currentPage, search: searchQuery },
      });

      const { data, meta } = response.data;

      const transformed = data.map((post: any) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        author: post.author,
        created_at: post.created_at,
      }));

      setBlogs(transformed);
      setTotalPages(meta.last_page);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch blog posts.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleReadMore = (blog: any) => {
    setSelectedBlog(blog);
  };

  const handleBack = () => {
    setSelectedBlog(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
        {selectedBlog ? (
          <BlogPostDetail blog={selectedBlog} onBack={handleBack} />
        ) : (
          <>
            <header className="text-center mb-10">
              <h1 className="text-5xl font-extrabold text-blue-700 mb-2 tracking-tight">
                React.js Blog Project
              </h1>
              <p className="text-lg text-gray-600">Explore the latest blog posts</p>
            </header>

            <div className="max-w-xl mx-auto mb-8">
              <SearchBar onSearch={handleSearch} />
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="text-center text-red-600 font-semibold py-10">{error}</div>
            ) : blogs.length === 0 ? (
              <EmptyState searchQuery={searchQuery} />
            ) : (
              <>
                <BlogList blogs={blogs} onReadMore={handleReadMore} />
                <div className="mt-10 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
