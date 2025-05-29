// /app/api/user/[id]/route.js
import { db } from '@/lib/firestore';
import { doc, getDoc } from 'firebase/firestore';

export async function GET(req, { params }) {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ message: "User ID is required" }), {
      status: 400,
    });
  }
    
  try {
    const ref = doc(db, 'users', id);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ id: snap.id, ...snap.data() }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server error", error: error.message }), {
      status: 500,
    });
  }
}
