import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firestore.jsx';

export default async function ChallengeDetailPage({ params }) {
  const { id } = await params;
  const docRef = doc(db, 'challenges', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return <div className="p-6 text-red-500">Challenge not found.</div>;
  }

  const challenge = docSnap.data();

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

      {challenge.predefinedTasks?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mt-4">Predefined Tasks</h2>
          <ul className="list-disc list-inside space-y-1">
            {challenge.predefinedTasks.map((task, index) => (
              <li key={index}>
                <strong>Day {task.day}:</strong> {task.taskDescription}
                {task.targetReps ? ` (Target Reps: ${task.targetReps})` : ''}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className='border p-2'>Accept Chalenge</button>
    </div>
  );
}
