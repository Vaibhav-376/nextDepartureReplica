"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

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

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href={"/"}>
          <div className="text-xl font-bold tracking-wide cursor-pointer">
            Logo
          </div>
        </Link>

        <ul className="hidden md:flex space-x-8 text-sm font-medium">
          <li><Link href="#">Our Story</Link></li>
          <li><Link href="#">Travel Blog</Link></li>
          <li><Link href="#">Support</Link></li>
        </ul>

        <div className="flex space-x-4">
          {!user ? (
            <>
              <Link
                href="/auth/login"
                className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative group">
              <button className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition">
                {user.name}
              </button>
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg hidden group-hover:block">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
