"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Gi3dHammer } from "react-icons/gi";
import classNames from "classnames";
import {
  Home,
  BookOpen,
  Briefcase,
  Bot,
  MessageSquare,
  LogIn,
} from "lucide-react";
import MobileSideBar from "./MobileSideBar";

export interface NavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NavBar = () => {
  const currentPath = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  
  // Set visibility after component mounts for slide-in effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const links = [
    { label: "Home", href: "/", icon: <Home className="w-4 h-4 mr-1" /> },
    {
      label: "OnlineLearning",
      href: "/online-learning",
      icon: <BookOpen className="w-4 h-4 mr-1" />,
    },
    {
      label: "Career Support",
      href: "/career-support",
      icon: <Briefcase className="w-4 h-4 mr-1" />,
    },
    {
      label: "AI Support",
      href: "/ai-support",
      icon: <Bot className="w-4 h-4 mr-1" />,
    },
    {
      label: "Experience Wall",
      href: "/experience-support",
      icon: <MessageSquare className="w-4 h-4 mr-1" />,
    },
  ];

  return (
    <>
      <div className="sm:hidden">
        <MobileSideBar links={links} />
      </div>
      <header className={`hidden sm:block sticky top-0 z-50 shadow-md bg-white transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo Section */}
          <div className="w-full h-20 bg-gradient-to-r from-red-50 to-red-100 flex flex-row items-center justify-between rounded-b-lg">
            <div className="flex items-center space-x-3 ml-4">
              <Gi3dHammer className="text-red-800 text-3xl transition-transform duration-300 hover:rotate-12" />
              <Link
                href="/"
                className="font-extrabold text-xl text-red-900 tracking-tight hover:text-red-800 transition-colors duration-300"
              >
                StillSkilled
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex justify-between items-center border-b border-gray-200 p-4">
            <ul className="flex flex-row space-x-8">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={classNames(
                    "relative px-2 py-1 transition-all duration-300 text-base font-medium hover:text-red-800 flex items-center transform",
                    {
                      "text-red-900": link.href === currentPath,
                      "text-gray-700": link.href !== currentPath,
                      "font-bold": link.href === currentPath,
                    },
                    link.href === currentPath
                      ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-900"
                      : "",
                    isVisible 
                      ? "translate-y-0 opacity-100" 
                      : "translate-y-4 opacity-0"
                  )}
                  style={{ 
                    transitionDelay: `${100 + index * 50}ms` 
                  }}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </ul>

            {/* Right SignIn */}
            <div>
              <button 
                className={`bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 shadow-md hover:shadow-lg flex items-center transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                style={{ transitionDelay: '350ms' }}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavBar;