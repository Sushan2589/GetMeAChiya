'use client'

import React, { useEffect, useState } from 'react'
import { useUser } from "@clerk/nextjs";




const PaymentPage = ({ username }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [amount, setAmount] = useState("");
   const [message, setMessage] = useState("");


   const handlePayment = async () => {
    setMessage("⏳ Initiating payment...");

    try {
      // Fetch dummy data
      const dummyRes = await fetch('/api/dummy-data?method=esewa');
      if (!dummyRes.ok) throw new Error('Failed to fetch dummy data');
      const dummy = await dummyRes.json();

      // Prepare and override with user input
      const payload = {
        method: 'esewa',
        amount: amount.toString(),
        productName: dummy.productName,
        transactionId: dummy.transactionId,
      };

      // Call backend to get eSewa config
      const res = await fetch('/api/initiate-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to initiate payment');

      const { amount: amt, esewaConfig } = await res.json();

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

      const finalPayload = {
        amount: amt,
        ...esewaConfig,
      };

      Object.entries(finalPayload).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      setMessage("✅ Redirecting to eSewa...");
    } catch (err) {
      console.error(err);
      setMessage("❌ Payment initiation failed.");
    }
  };


   return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* User Section */}
      <div className="flex flex-col items-center justify-center py-16 px-4">
  <div className="bg-zinc-900 shadow-xl rounded-2xl p-8 w-full max-w-md text-center border border-zinc-800">
    <h1 className="text-3xl font-bold mb-2">
      You're supporting <span className="text-blue-400">@{username}</span>
    </h1>
  </div>
</div>

      {/* Support Section */}
      <div className="flex justify-center px-4">
        <div className="bg-zinc-900 rounded-2xl shadow-lg p-8 w-full max-w-md border border-zinc-800">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Send a Chiya ☕
          </h2>

          {isLoaded && isSignedIn ? (
            <div className="mb-6 text-sm text-zinc-300">
              <p className="mb-1">Signed in as:</p>
              <div className="flex items-center gap-3 bg-zinc-800 p-3 rounded-xl">
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-zinc-600"
                />
                <div>
                  <p className="font-medium">{user.fullName}</p>
                  <p className="text-xs text-zinc-400">
                    {user.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-zinc-400 mb-6 text-sm italic">
              Please sign in to support {username}.
            </p>
          )}

          {/* Payment Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Amount (NPR)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="10"
              step="10"
            />
          </div>

          <button
            onClick={handlePayment}
            disabled={!isSignedIn}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-bold py-2 px-4 rounded-md shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSignedIn ? `Send NPR ${amount} Chiya` : 'Sign in to Send Chiya'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
