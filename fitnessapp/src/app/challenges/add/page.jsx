'use client';

import { createChallenge } from '../actions';

export default function AddChallengePage() {
  return (
    <div className='flex items-center justify-center m-5 flex-col gap-4'>
      <h1 className="text-2xl font-bold mb-4">Add New Challenge</h1>
      <form action={createChallenge} className="p-6 flex flex-col gap-3  bg-white shadow-md rounded-md">
      <input
        type="text"
        name="title"
        placeholder="Challenge Title"
        required
        className="border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-2 "
      />

      <textarea
        name="description"
        placeholder="Challenge Description"
        required
      className="border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-2 "
      />

      <input
        type="number"
        name="durationDays"
        placeholder="Duration in Days"
        required
        className="border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-2 "
      />

      <input
        type="text"
        name="type"
        placeholder="Type (e.g., strength, cardio)"
        required
        className="border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-2 "
      />

      <textarea
        name="rules"
        placeholder="Rules (Markdown or plain text)"
        required
        className="border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-2 "
      />

      <button
        type="submit"
        className="bg-blue-600 w-fit text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Challenge
      </button>
    </form>
    </div>
  );
}
