"use client";

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useSession } from "next-auth/react";
function Navbar({session}) {
  
  return (
    <nav className="bg-[#333] text-white p-5">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">NextAuth</Link>
          </div>
          <ul className="flex">
            {!session ? (
              <>
                <li className="mx-3"><Link href="/login">Sign In</Link></li>
                <li className="mx-3"><Link href="/register">Sign Up</Link></li>
              </>
            ) : (
              <>
                <p className="mx-3 mt-3">{session.user.name}</p>
                <li className="bg-red-500 text-white px-3 py-2 rounded-md text-sm my-2" ><a onClick={() => signOut()} className="cursor-pointer">Logout</a></li>
              </>
            )}
            
            
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
