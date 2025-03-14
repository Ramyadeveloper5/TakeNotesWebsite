import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isAuthenticated, getUser } from "../utils/auth"; // Ensure getUser fetches user info
import Navbar from "@/components/Navbar";
import Notes from "./notes";


const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false); // Track hydration
  

  useEffect(() => {
    setHydrated(true);
    if (!isAuthenticated()) {
      router.push("/login"); // Redirect to login if not authenticated
    } else {
      const userData = getUser(); // Fetch user details (implement in auth.js)
      setUser(userData?.name || "User"); // Update user state
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <h1 className="p-4">{user ? `Good Morning, ${user}!` : "Loading..."}</h1>
      </div>
    </div>
  );
};

export default Dashboard;
