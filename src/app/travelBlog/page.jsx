"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../../store/blogSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

const Blog = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        dispatch(setBlogs(data.blogs));
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-10">
        ✈️ Travel <span className="text-blue-600">Blogs</span>
      </h1>

      {blogs.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No blogs found</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="p-5 rounded-2xl shadow-lg bg-white border border-gray-200 flex flex-col transition-all hover:shadow-2xl"
            >
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={blog.image[0]}
                  alt={blog.title}
                  width={500}
                  height={300}
                  className="rounded-xl object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              <h2 className="text-xl font-bold mt-4 text-gray-800 line-clamp-2">
                {blog.title}
              </h2>
              <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                {blog.description}
              </p>

              <button
                onClick={() => router.push(`/travelBlog/${blog.slug}`)}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                Read More →
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
