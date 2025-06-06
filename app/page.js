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
  }, [isLoaded, isSignedIn, user?.username, router]);

  return (
    <div>
      <div className="flex justify-center m-10">
        <div className="text-2xl font-bold">Get Me A Chiya!</div>
        <div>
          <img src="../tea.gif" className="bg-black h-10"></img>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <button
          type="button"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
        >
          Get Started
        </button>

        <button
          type="button"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
        >
          Read More
        </button>
      </div>
    </div>
  );
}
