'use client'

import React, { MouseEventHandler, useContext, useState } from 'react'
import { FirebaseUserContext } from '@/lib/firebase-user'

export interface NavLayoutProps {
  children: React.ReactNode
}

/**
 * A React layout with a toolbar with:
 * - navigation on the left side, populated from 'navItems' array: Home | Gallery
 * - user dropdown menu, on the right side: Username > Profile | Logout
 *
 * Using Tailwind for all styling.
 */
const NavLayout: React.FC<NavLayoutProps> = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const user = useContext(FirebaseUserContext)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const logoutClick: MouseEventHandler = (event) => {
    event.preventDefault()
    user.signOut?.()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <span className="w-24" />

            <h3>ねこのいるベンチ</h3>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative ml-3">
                <button
                  className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu"
                  aria-haspopup="true"
                  onClick={toggleDropdown}
                >
                  <span className="sr-only">Open user menu</span>
                  {user.currentUser?.displayName || user?.currentUser?.uid}
                  {user.currentUser?.photoURL && (
                    <img className="ml-2 size-8 rounded-full" src={user.currentUser.photoURL} alt="User Avatar" />
                  )}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                    <div className="px-4 py-2 text-sm text-gray-400">uid: {user.currentUser?.uid}</div>
                    <a href="" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={logoutClick}>
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      {children}
    </div>
  )
}

export default NavLayout
