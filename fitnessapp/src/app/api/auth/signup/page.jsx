"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", age: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const res = await fetch("/api/auth/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else {
      setSuccess(data.message);
      router.push("/");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-2xl mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
