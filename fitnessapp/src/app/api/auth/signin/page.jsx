"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/"); // redirect after success
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 rounded">
      <h1 className="text-2xl mb-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Sign In
        </button>
      </form>
      <h1 className="mt-3">don't have account please<Link href="/api/auth/signup" className="text-blue-700">{" "}Sign Up</Link> </h1>
    </div>
  );
}
