"use client"
import Image from "next/image";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


export default function Home() {
   const { isSignedIn, isLoaded, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoaded && isSignedIn && user?.username) {
        router.push(`/${user.username}`);
      }
    }, 500); // 0.5 seconds delay

    return () => clearTimeout(timeout);
  }, []);

  return (
      <div className="flex flex-col min-h-screen">
     
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="flex justify-center items-center gap-2 mb-10 ">
          <div className="text-5xl font-bold text-white">Get Me A Chiya!</div>
          <img src="../tea.gif" className="h-10 bg-black" alt="Tea" />
        </div>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Get Started
          </button>

          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Read More
          </button>
        </div>
      </main>
    </div>
  );
}
