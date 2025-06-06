'use client'

import { useEffect } from 'react'
import { useUser } from "@clerk/nextjs";

const UserSync = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          await fetch("/api/save-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.emailAddresses[0]?.emailAddress,
              username: user.username,
              name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
              profilepic: user.imageUrl,
              clerkId: user.id
            }),
          });
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, user]);

  return null; // This component doesn't render anything
};

export default UserSync;