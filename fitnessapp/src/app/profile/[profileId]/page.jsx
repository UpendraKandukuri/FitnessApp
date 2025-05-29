"use client";

import { useEffect, useState } from "react";
import { use } from "react";

export default function ProfilePage({ params }) {
  const {profileId} = use(params);
  const [user, setUser] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUserAndChallenges() {
      try {
        setError("");
        setUser(null);
        setChallenges([]);

        const userRes = await fetch(`/api/auth/user/${profileId}`);
        if (!userRes.ok) {
          setError("User not found");
          return;
        }
        const userData = await userRes.json();
        setUser(userData);

        if (userData.enrolledChallengeIds?.length > 0) {
          const challengePromises = userData.enrolledChallengeIds.map(async (challengeId) => {
            const res = await fetch(`/api/challenge/${challengeId}`);
            if (!res.ok) throw new Error(`Challenge ${challengeId} not found`);
            return res.json();
          });

          const challengesData = await Promise.all(challengePromises);
          setChallenges(challengesData);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        console.error(err);
      }
    }

    if (profileId) getUserAndChallenges();
  }, [profileId]);

  if (error)
    return (
      <div className="p-6 max-w-4xl mx-auto mt-10 bg-red-100 text-red-700 rounded shadow">
        {error}
      </div>
    );

  if (!user)
    return (
      <div className="p-6 max-w-4xl mx-auto mt-10 text-gray-700 font-semibold">
        Loading user profile...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg">
      
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b pb-4">
           User Profile
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-gray-800">
          <div>
            <p className="text-lg font-semibold text-gray-500">Name</p>
            <p className="mt-1 text-xl font-medium text-indigo-600">{user.name}</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-500">Email</p>
            <p className="mt-1 text-lg">{user.email}</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-500">Age</p>
            <p className="mt-1 text-lg">{user.age}</p>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">
          Enrolled Challenges
        </h2>
        {challenges.length === 0 ? (
          <p className="text-gray-600 italic">This user has not enrolled in any challenges yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="p-6 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-xl shadow hover:shadow-lg transition duration-300"
              >
                <h3 className="text-2xl font-semibold text-indigo-700 mb-2">
                  {challenge.title}
                </h3>
                <p className="text-gray-700 mb-4 line-clamp-3">{challenge.description}</p>
                <ul className="text-sm text-gray-800 space-y-1">
                  <li>
                    <span className="font-medium text-indigo-600">Duration:</span>{" "}
                    {challenge.durationDays} days
                  </li>
                  <li>
                    <span className="font-medium text-indigo-600">Type:</span>{" "}
                    {challenge.type}
                  </li>
                  <li>
                    <span className="font-medium text-indigo-600">Rules:</span>{" "}
                    {challenge.rules}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
