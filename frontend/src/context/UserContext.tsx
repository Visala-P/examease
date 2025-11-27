import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  id?: number;
  name?: string;
  email?: string;
};

type UserContextValue = {
  user: User | null;
  setUser: (u: User | null) => void;
  refresh: () => Promise<void>;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const refresh = async () => {
    const token = localStorage.getItem("studentToken");
    if (!token) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/student/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (_) {}
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refresh }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
