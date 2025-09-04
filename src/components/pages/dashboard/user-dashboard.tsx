"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {toast} from "sonner";
import DashboardSkeleton from "@/components/shared/skeleton/dashboard-skeleton";

interface User {
 name: string;
 email: string;
 picture: string;
 phone: string;
}

export default function UserDashboard() {
 const [user, setUser] = useState<User | null>(null);
 const [loading, setLoading] = useState(true);
 const router = useRouter();

 useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
   router.replace("/login");
  } else {
   setUser(JSON.parse(storedUser));
  }
  setLoading(false);
 }, [router]);

 const handleLogout = () => {
  localStorage.clear();
  document.cookie = "user=; path=/; max-age=0";
  toast.info("با موفقیت از حساب خارج شدید.");
  router.push("/login");
 };

 if (loading) {
  return <DashboardSkeleton />;
 }

 if (!user) return null;

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
   <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 text-center">
    <Image
     width={150}
     height={150}
     src={user.picture}
     alt="User avatar"
     className="w-24 h-24 rounded-full mx-auto mb-4"
    />
    <h1 className="text-2xl font-bold mb-2">سلام، {user.name} 👋</h1>
    <p className="text-gray-600 mb-4">{user.email}</p>
    <p className="text-gray-500 text-sm mb-6">📱 {user.phone}</p>

    <Button variant="destructive" className="w-full" onClick={handleLogout}>
     خروج از حساب
    </Button>
   </div>
  </div>
 );
}
