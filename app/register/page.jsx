"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();


    console.log("name", name)
    console.log("email", email)
    console.log("password", password)
    console.log("confirmPassword", confirmPassword)


    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    try {
      // Check if email already exists
      const checkUser = await fetch(`/api/auth/checkuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await checkUser.json();
      console.log("data", data)
      if (data.user !== 0 && data.user !== null && checkUser.status === 200) {
        
        setError("Email already exists");
        return;
      }

      const user = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });
      const data2 = await user.json();
      if (user.status === 200) {
        setSuccess("User created");
        return;
      }
    } catch (error) {
      setError(error.message);
      return;
    }
  };

  //   Html Session
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-5 flex items-center justify-center">
        <form action="" onSubmit={handleSubmit}>
          <h3 className="text-3xl bold text-center">Register Page</h3>
          <hr className="my-3" />
          <input
            onChange={(e) => setName(e.target.value)}
            className="block bg-gray-300 p-2 my-2 rounded-md justify-center mx-auto"
            type="text"
            name="name"
            placeholder="Enter your name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="block bg-gray-300 p-2 my-2 rounded-md justify-center mx-auto"
            type="email"
            name="email"
            placeholder="Enter your Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="block bg-gray-300 p-2 my-2 rounded-md justify-center mx-auto"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block bg-gray-300 p-2 my-2 rounded-md justify-center mx-auto"
            type="password"
            name="password"
            placeholder="Confirm your password"
          />
          
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <button
            className="bg-green-500 p-2 my-2 rounded-md text-white mx-auto flex gap-2"
            type="submit"
          >
            Sign Up
          </button>
          <hr className="my-3" />
          <p>
            You have an account go to{" "}
            <Link
              className="text-blue-600 hover:underline"
              href="/auth/sign-in"
            >
              Sign In
            </Link>
          </p>
        </form>
        <hr className="my-3" />
      </div>
    </div>
  );
}

export default RegisterPage;
