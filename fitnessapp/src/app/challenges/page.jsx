'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firestore.jsx';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'challenges'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setChallenges(data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <div className="p-6">
      <Link href='/challenges/add' className="text-blue-500 underline block mb-4">Add Challenge</Link>
      <h1 className="text-2xl font-bold mb-6">All Challenges</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {challenges.map(challenge => (
          <div key={challenge.id} className="p-4 rounded-md shadow-md bg-white flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold">{challenge.title}</h2>
            <p className="text-sm text-gray-600">{challenge.description}</p>
            <p className="text-sm">Duration: {challenge.durationDays} days</p>
            <p className="text-sm">Type: {challenge.type}</p>
            <p className="text-sm">Public: {challenge.isPublic ? 'Yes' : 'No'}</p>
            </div>

            <Link
              href={`/challenges/${challenge.id}`}
              className="inline-block mt-2 px-4 py-2 w-fit bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Show Challenge
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
