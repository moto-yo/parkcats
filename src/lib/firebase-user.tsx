'use client'

import { firebaseApp } from '@/lib/firebase.config'
import type { User, UserCredential } from '@firebase/auth'
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import React, { useMemo, useEffect, useState } from 'react'
import SignInContainer from '@/components/signin-container'

export interface FirebaseUser {
  isLoading?: boolean
  isSignedIn?: boolean
  currentUser?: User | null
  signInWithGoogle?: () => Promise<UserCredential>
  signOut?: () => Promise<void>
}

export const FirebaseUserContext = React.createContext<FirebaseUser>({
  isLoading: true,
})

export interface FirebaseUserProviderProps {
  children: React.ReactNode
}

/** Firebase Auth user provider */
const FirebaseUserProvider: React.FC<FirebaseUserProviderProps> = ({ children }) => {
  const auth = getAuth(firebaseApp)

  const [user, setUser] = useState<FirebaseUser>({ isLoading: true })

  useEffect(() => {
    const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider())
    const signOut = () => auth.signOut()
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Firebase auth current user changed', currentUser)

      setUser({
        currentUser,
        isLoading: false,
        isSignedIn: !!currentUser,
        signInWithGoogle,
        signOut,
      })
    })

    return unsubscribe
  }, [auth])

  return (
    <FirebaseUserContext.Provider value={user}>
      {user?.isSignedIn === true && children}
      {user?.isSignedIn === false && <SignInContainer />}
      {user?.isLoading && (
        <div className="flex min-h-screen items-center justify-center text-gray-400">
          <div>Loading...</div>
        </div>
      )}
    </FirebaseUserContext.Provider>
  )
}

export default FirebaseUserProvider
