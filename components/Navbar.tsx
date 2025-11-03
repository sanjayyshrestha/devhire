'use client'
import { Code } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { User } from './HomeComponent';
import { signoutUser } from '@/action/user.action';

const Navbar = ({user}:{
  user:User
}) => {
  const [scrolled, setScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950 bg-opacity-80 backdrop-blur-xl border-b border-white border-opacity-10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Code className="h-7 w-7 text-cyan-400" />
          <span className="font-bold text-2xl text-cyan-400">DevHire</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href={`/dashboard/${user.role.toLocaleLowerCase()}`}
                className="text-white hover:text-cyan-400 transition-colors"
              >
                Dashboard
              </Link>
              <Button onClick={signoutUser} className="bg-cyan-500 hover:bg-cyan-600 text-white">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/auth"
                className="text-white hover:text-cyan-400 transition-colors"
              >
                Sign In
              </Link>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar