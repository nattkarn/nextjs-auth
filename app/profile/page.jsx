"use client";

import React from "react";
import Navbar from "../components/Navbar.jsx";
import { useRouter } from "next/navigation";
import { useSession, signOut } from 'next-auth/react'

function WelcomePage() {







  const { data: session, status } = useSession();
  const router = useRouter();
  console.log("status", status);
  // Redirect if not authenticated
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push("/login");
    return null; // Prevent rendering before redirect
  }

  return (
    <main>
      <Navbar session={session} />
      <section className="container mx-auto py-8 flex flex-col items-center justify-center">
        <h3 className="text-4xl font-bold mb-4">Welcome, {session.user?.name}!</h3>
        <p className="text-lg text-gray-700 mb-4">Email: {session.user?.email}</p>
        <hr className="my-6 border-t-2 border-gray-300" />
        <p className="text-base text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nam excepturi? 
          At ullam magni eos amet quam tempore, adipisci sapiente maiores quidem impedit 
          beatae perferendis cupiditate similique saepe iure cums.
        </p>
        <hr className="my-6 border-t-2 border-gray-300" />
      </section>
    </main>
  );
}

export default WelcomePage;
