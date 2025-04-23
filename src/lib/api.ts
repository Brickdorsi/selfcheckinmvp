import { SpaCircuit } from "@/types/spa";

// Firebase configuration (you'll need to add Firebase to your project)
// You can substitute this with any backend service of your choice
const API_ENDPOINT =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "https://api.saunasuites.com";

// Session types
interface SessionData {
  sessionId: string;
  roomId: string;
  selectedCircuit: SpaCircuit | null;
  startTime: string;
  endTime: string;
  status: "pending" | "active" | "completed";
}

// Create a new session when a circuit is selected
export async function createSession(
  roomId: string,
  selectedCircuit: SpaCircuit
): Promise<string> {
  try {
    // In development or when API fails, use mock session
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_USE_MOCK_API === "true"
    ) {
      console.log("Using mock session data");
      const sessionId = `mock-session-${Date.now()}`;
      const mockData: SessionData = {
        sessionId,
        roomId,
        selectedCircuit,
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        status: "pending",
      };
      setMockSession(mockData);
      return sessionId;
    }

    const response = await fetch(`${API_ENDPOINT}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId,
        selectedCircuit,
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour later
        status: "pending",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create session");
    }

    const data = await response.json();
    return data.sessionId;
  } catch (error) {
    console.error("Error creating session:", error);

    // Fallback to mock if in development
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_USE_MOCK_API === "true"
    ) {
      const sessionId = `mock-session-${Date.now()}`;
      const mockData: SessionData = {
        sessionId,
        roomId,
        selectedCircuit,
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        status: "pending",
      };
      setMockSession(mockData);
      return sessionId;
    }

    throw error;
  }
}

// Get active session for a room
export async function getActiveSession(
  roomId: string
): Promise<SessionData | null> {
  try {
    // In development or when API fails, use mock session
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NEXT_PUBLIC_USE_MOCK_API === "true"
    ) {
      console.log("Using mock session data");
      return mockSession && mockSession.roomId === roomId ? mockSession : null;
    }

    const response = await fetch(
      `${API_ENDPOINT}/sessions/active?roomId=${roomId}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch active session");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching active session:", error);
    // Fallback to mock data if API call fails
    return mockSession && mockSession.roomId === roomId ? mockSession : null;
  }
}

// Update session status
export async function updateSessionStatus(
  sessionId: string,
  status: "pending" | "active" | "completed"
): Promise<void> {
  try {
    const response = await fetch(`${API_ENDPOINT}/sessions/${sessionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update session status");
    }
  } catch (error) {
    console.error("Error updating session status:", error);
    throw error;
  }
}

// For local development/testing without a backend
// This can be used to simulate the API during development
let mockSession: SessionData | null = null;

export function setMockSession(session: SessionData | null): void {
  mockSession = session;
}

export function getMockSession(): SessionData | null {
  return mockSession;
}
