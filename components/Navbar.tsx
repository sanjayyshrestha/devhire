"use client";

import { ArrowRight, Code, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { User } from "./HomeComponent";
import { signoutUser } from "@/action/user.action";

const Navbar = ({ user }: { user: User }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Code className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-400" />
          <span className="font-extrabold text-xl sm:text-2xl text-cyan-400 tracking-tight">
            DevHire
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link
                href={`/dashboard/${user.role.toLowerCase()}`}
                className="text-white hover:text-cyan-400 text-sm sm:text-base font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Button
                onClick={signoutUser}
                className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm sm:text-base px-4 py-2 sm:px-5 sm:py-2.5 rounded-md transition-all"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/auth"
                className="text-white hover:text-cyan-400 text-sm sm:text-base font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth"
                className="inline-flex items-center gap-1.5 rounded-md bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm sm:text-base font-medium px-4 py-2 sm:px-5 sm:py-2.5 shadow-sm shadow-cyan-500/30 hover:shadow-cyan-600/40 transition-all duration-200 hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-slate-950/95 backdrop-blur-lg border-t border-white/10 shadow-lg md:hidden">
            <div className="flex flex-col items-center gap-4 py-6">
              {user ? (
                <>
                  <Link
                    href={`/dashboard/${user.role.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-white hover:text-cyan-400 text-base font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Button
                    onClick={signoutUser}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm px-5 py-2 rounded-md"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth"
                    onClick={() => setMenuOpen(false)}
                    className="text-white hover:text-cyan-400 text-base font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center gap-2 rounded-md bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-medium px-5 py-2 shadow-sm transition-all"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
