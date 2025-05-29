"use client";

import { useEffect, useState } from "react";
import { use } from "react";

export default function ProfilePage({ params }) {
  const { id } = use(params);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch(`/api/auth/user/${id}`);
        if (!res.ok) {
          setError("User not found");
          return;
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError("Failed to fetch user");
      }
    }

    if (id) getUser();
  }, [id]);

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  if (!user) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="space-y-2">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Age:</strong> {user.age}</p>
      </div>
    </div>
  );
}
