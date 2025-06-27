"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

export default function AuthRedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkUserRole = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const { data: userInfo } = await axios.post(
            "http://localhost:3001/get-user",
            {
              email: session.user.email,
            }
          );

          if (!userInfo?.role) {
            Cookies.set("redirectToSelectRole", "true", { expires: 0.02 });
            router.replace("/selectrole?email=" + session.user.email);
          } else {
            router.replace("/");
          }
        } catch (err) {
          console.error("Role fetch failed:", err);
          router.replace("/");
        }
      }
    };

    checkUserRole();
  }, [status, session, router]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    </div>
  );
}
