import Image from "next/image";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="container mx-auto py-10 flex flex-col items-center justify-center">
        <h3 className="text-4xl font-bold text-center mb-4">Welcome to NextAuth</h3>
        <hr className="my-6 w-full max-w-md border-t-2 border-gray-300" />
        <div className="text-center space-y-2">
          <p className="text-base">
            If you have an account, you are already logged in{" "}
            <a href="./login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
          <p className="text-base">
            If you don't have an account, you can{" "}
            <a href="./register" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
