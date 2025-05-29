'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const goToProfile = () => {
    const id = session?.user?.id;
    if (id) {
      router.push(`/profile/${id}`);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 text-white flex justify-between items-center shadow-md sticky top-0 z-50">
      <Link href="/" className="text-2xl font-extrabold tracking-wide hover:text-blue-400 transition-colors">
        FitnessApp
      </Link>

      <div className="flex gap-6 items-center">
        {status === "loading" ? (
          // Show nothing or a spinner while session is loading
          <span className="text-gray-400 italic">Loading...</span>
        ) : session?.user ? (
          <>
            <Link 
              href="/challenges" 
              className="text-lg font-medium hover:text-blue-400 transition-colors"
            >
              Challenges
            </Link>

            <button
              onClick={goToProfile}
              className="bg-blue-600 px-5 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
              aria-label="Go to Profile"
            >
              Profile
            </button>

            <button
              onClick={handleSignOut}
              className="bg-red-600 px-5 py-2 rounded-md font-semibold hover:bg-red-700 transition"
              aria-label="Sign Out"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            aria-label="Sign In"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
