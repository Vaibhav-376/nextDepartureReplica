"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiMenu, FiX, FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";
import { useAuth } from "../lib/AuthContext"; 

const Navbar = () => {
  // const [user, setUser] = useState(null);
    const { user, setUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      setDropdownOpen(false);
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="w-full z-50 bg-gray-800 text-white shadow-lg relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/">
          <div className="text-xl font-bold tracking-wide cursor-pointer hover:text-blue-400 transition-colors duration-200">
            Logo
          </div>
        </Link>

        <ul className="hidden md:flex space-x-8 text-sm font-medium">
          <li>
            <Link
              href="/story"
              className="hover:text-blue-400 transition-colors duration-200 py-2"
            >
              Our Story
            </Link>
          </li>
          <li>
            <Link
              href="/travelBlog"
              className="hover:text-blue-400 transition-colors duration-200 py-2"
            >
              Travel Blog
            </Link>
          </li>
          <li>
            <Link
              href="/support"
              className="hover:text-blue-400 transition-colors duration-200 py-2"
            >
              Support
            </Link>
          </li>
          <li>
            <Link
              href="/subscribe"
              className="hover:text-blue-400 transition-colors duration-200 py-2"
            >
              Subscribe
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex space-x-4 items-center">
          {!user ? (
            <>
              <Link
                href="/auth/login"
                className="px-5 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-200 font-medium border border-gray-600 hover:border-gray-500"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-200 font-medium border border-gray-600 hover:border-gray-500 min-w-[120px]"
              >
                <FiUser className="text-lg" />
                <span className="truncate max-w-[100px]">{user.name}</span>
                <FiChevronDown
                  className={`text-sm transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 group"
                  >
                    <FiLogOut className="mr-3 text-lg group-hover:text-red-600" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl focus:outline-none p-1 hover:bg-gray-700 rounded transition-colors duration-200"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-700 border-t border-gray-600">
          <div className="px-6 py-4 space-y-4">
            <ul className="flex flex-col space-y-3 text-sm font-medium">
              <li>
                <Link
                  href="/story"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 hover:text-blue-400 transition-colors duration-200"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/travelBlog"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 hover:text-blue-400 transition-colors duration-200"
                >
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 hover:text-blue-400 transition-colors duration-200"
                >
                  Support
                </Link>
              </li>
                            <li>
                <Link
                  href="/subscribe"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 hover:text-blue-400 transition-colors duration-200"
                >
                  Subscribe
                </Link>
              </li>
            </ul>

            <div className="border-t border-gray-600 pt-4">
              {!user ? (
                <div className="flex flex-col space-y-3">
                  <Link
                    href="/auth/login"
                    className="px-4 py-3 rounded-lg bg-gray-600 hover:bg-gray-500 transition-all duration-200 text-center font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 text-center font-medium shadow-md"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="px-4 py-3 bg-gray-600 rounded-lg">
                    <p className="font-medium text-white truncate">
                      Welcome, {user.name}
                    </p>
                    <p className="text-xs text-gray-300 truncate">
                      {user.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-red-600 hover:bg-red-500 transition-all duration-200 font-medium shadow-md group"
                  >
                    <FiLogOut className="mr-2 text-lg group-hover:rotate-12 transition-transform duration-200" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;