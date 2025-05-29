import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firestore';
import LeaderboardToggle from '../../../components/LeaderboardToggle';

export default async function ChallengeDetailPage({ params }) {
  const { id } = await params;

  const docRef = doc(db, 'challenges', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="text-2xl text-red-400 animate-pulse">Challenge not found.</div>
      </div>
    );
  }

  const challenge = docSnap.data();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-10 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-md shadow-lg rounded-xl p-8 space-y-6 ring-1 ring-white/20">
        <h1 className="text-4xl font-extrabold tracking-tight border-b border-white/20 pb-2">{challenge.title}</h1>

        <p className="text-lg text-gray-300">{challenge.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
          <p><span className="font-semibold text-white">Duration:</span> {challenge.durationDays} days</p>
          <p><span className="font-semibold text-white">Type:</span> {challenge.type}</p>
          <p><span className="font-semibold text-white">Rules:</span> {challenge.rules}</p>
          <p><span className="font-semibold text-white">Created by:</span> {challenge.creatorId}</p>
          <p><span className="font-semibold text-white">Public:</span> {challenge.isPublic ? 'Yes' : 'No'}</p>
          <p><span className="font-semibold text-white">Created At:</span> {challenge.createdAt?.toDate?.().toLocaleString?.() ?? 'N/A'}</p>
        </div>

        {challenge.predefinedTasks?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-white mb-2">📋 Predefined Tasks</h2>
            <ul className="space-y-2 list-inside list-disc text-gray-300">
              {challenge.predefinedTasks.map((task, index) => (
                <li key={index} className="pl-2">
                  <span className="text-white font-medium">Day {task.day}:</span> {task.taskDescription}
                  {task.targetReps && <span> — <span className="text-white">Target: {task.targetReps}</span></span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4">
          <button className="bg-white text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 hover:bg-gray-200">
            🚀 Accept Challenge
          </button>
        </div>
      </div>

      <div className="mt-10 w-full max-w-3xl mx-auto flex justify-center">
  <LeaderboardToggle />
</div>

    </div>
  );
}
