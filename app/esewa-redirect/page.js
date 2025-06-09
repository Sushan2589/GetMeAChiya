"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast, Slide } from 'react-toastify';


export default function EsewaRedirectPage() {
  const router = useRouter();
  
  useEffect(() => {
     toast.success("Payment successful!")
    setTimeout(() => {
     
      router.push("/");
    }, 2000);
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg text-white">Redirecting...</p>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />

      
    </div>
  );
}
