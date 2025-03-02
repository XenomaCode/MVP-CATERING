"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  if (!session) return null;
  
  const isActive = (path: string) => {
    return pathname.startsWith(path) ? "bg-indigo-700 text-white" : "text-gray-300 hover:bg-indigo-700 hover:text-white";
  };
  
  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-indigo-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/admin/events" className="flex-shrink-0">
              <span className="text-white font-bold text-xl tracking-tight">Catering Elite</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link 
                  href="/admin/events" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/admin/events')}`}
                >
                  Eventos
                </Link>
                <Link 
                  href="/admin/inventory" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive('/admin/inventory')}`}
                >
                  Inventario
                </Link>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="flex items-center space-x-4">
                <span className="text-gray-300 text-sm">{session.user?.name}</span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-indigo-700 focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/admin/events" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/admin/events')}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Eventos
            </Link>
            <Link 
              href="/admin/inventory" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/admin/inventory')}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Inventario
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-indigo-700">
            <div className="flex items-center px-5">
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">{session.user?.name}</div>
                <div className="text-sm font-medium leading-none text-gray-300 mt-1">{session.user?.email}</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-indigo-700"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 