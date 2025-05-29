"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  console.log(session);
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
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        FitnessApp
      </Link>

      <div className="flex gap-4 items-center">
        {session?.user ? (
          <>
            <Link href="/challenges" className="hover:underline">
              challenges
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
            >
              Logout
            </button>
             <button
          onClick={goToProfile}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Profile
        </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
