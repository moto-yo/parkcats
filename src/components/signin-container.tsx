import React, { useContext } from 'react'
import { FirebaseUserContext } from '@/lib/firebase-user'

/**
 * Sign in with Google button, using Firebase Auth
 *
 * Using Tailwind for all styling.
 */
const SignInContainer: React.FC = () => {
  const user = useContext(FirebaseUserContext)

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div>
        <button
          className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          type="button"
          onClick={user.signInWithGoogle}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default SignInContainer
