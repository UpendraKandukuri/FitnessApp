'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firestore';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

export default function ChallengeDetailPage() {
  const { data: session } = useSession();
  const params = useParams();
  const challengeId = params?.challengeId;

  const [challenge, setChallenge] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchChallenge = async () => {
      if (!challengeId) return;

      const docRef = doc(db, 'challenges', challengeId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setNotFound(true);
      } else {
        setChallenge(docSnap.data());
      }
    };

    fetchChallenge();
  }, [challengeId]);

  const handleAcceptChallenge = async () => {
    if (!session) {
      alert('You must be signed in to accept a challenge.');
      return;
    }

    const userId = session.user.id;

    try {
      const response = await fetch(`/api/auth/user/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ challengeId }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Challenge accepted!');
      } else {
        console.error('Error response:', result);
        alert(`Failed to accept challenge: ${result.error}`);
      }
    } catch (err) {
      console.error('Request failed:', err);
      alert('An error occurred while accepting the challenge.');
    }
  };

  if (notFound) return <div className="p-6 text-red-500">Challenge not found.</div>;
  if (!challenge) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">{challenge.title}</h1>
      <p className="text-lg">{challenge.description}</p>
      <p><strong>Duration:</strong> {challenge.durationDays} days</p>
      <p><strong>Type:</strong> {challenge.type}</p>
      <p><strong>Rules:</strong> {challenge.rules}</p>
      <p><strong>Created by:</strong> {challenge.creatorId}</p>
      <p><strong>Public:</strong> {challenge.isPublic ? 'Yes' : 'No'}</p>
      <p><strong>Created At:</strong> {challenge.createdAt?.toDate?.().toLocaleString?.() ?? 'N/A'}</p>

      <button className='border border-gray-50 bg-blue-500 rounded-md cursor-pointer text-white font-bold p-2' onClick={handleAcceptChallenge}>
        Accept Challenge
      </button>
    </div>
  );
}
