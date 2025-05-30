import { NextResponse } from "next/server";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firestore";

export async function GET(request, { params }) {
  try {
    const { challengeId } = params;
    if (!challengeId) {
      return NextResponse.json({ error: "Challenge ID is required" }, { status: 400 });
    }

    const db = getFirestore(db);
    const challengeDocRef = doc(db, "challenges", challengeId);
    const docSnap = await getDoc(challengeDocRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
    }

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() }, { status: 200 });
  } catch (error) {
    console.error("GET /api/challenge/[challengeId] error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
