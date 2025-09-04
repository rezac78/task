"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {isValidIranianPhone} from "@/lib/validate-phone";
import {toast} from "sonner";

export default function LoginForm() {
 const [phone, setPhone] = useState("");
 const [error, setError] = useState("");
 const [loading, setLoading] = useState(false);
 const router = useRouter();

 const handleLogin = async () => {
  if (!isValidIranianPhone(phone)) {
   setError("شماره وارد شده معتبر نیست.");
   return;
  }

  setError("");
  setLoading(true);

  try {
   const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
   const data = await res.json();

   const user = {
    name: `${data.results[0].name.first} ${data.results[0].name.last}`,
    email: data.results[0].email,
    picture: data.results[0].picture.large,
    phone,
   };

   localStorage.setItem("user", JSON.stringify(user));
   document.cookie = `user=true; path=/; max-age=86400`;
   toast.success(`خوش آمدی ${user.name}!`);
   router.push("/dashboard");
  } catch {
   toast.error("خطا در ورود. لطفاً دوباره تلاش کنید.");
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
   <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
    <h1 className="text-xl font-bold text-center mb-6">ورود به حساب کاربری</h1>

    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
     شماره موبایل
    </label>

    <Input
     id="phone"
     type="tel"
     placeholder="مثلاً 09123456789"
     value={phone}
     onChange={(e) => setPhone(e.target.value)}
     className={error ? "border-red-500" : ""}
     aria-invalid={!!error}
     aria-describedby={error ? "error-message" : undefined}
     dir="rtl"
    />

    {error && (
     <p id="error-message" className="text-red-500 text-sm mt-2">
      {error}
     </p>
    )}

    <Button className="w-full mt-6" disabled={loading} onClick={handleLogin}>
     {loading ? "در حال ورود..." : "ورود"}
    </Button>
   </div>
  </div>
 );
}
