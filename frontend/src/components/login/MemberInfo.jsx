import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";

const MemberInfo = () => {
  const { isLoggedIn, token, isInitialized, initialize, logout, setUserInfo } =
    useAuthStore();
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [initialize, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      if (!isLoggedIn) {
        router.push("/login");
        return;
      }

      const fetchProfile = async () => {
        try {
          const response = await fetch(`/api/users/profile`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            if (response.status === 401) {
              alert("정보가 만료되었습니다. 다시 로그인해주세요.");
              logout();
              router.push("/login");
              return;
            }
            throw new Error("프로필 정보를 가져오는데 실패했습니다.");
          }

          const data = await response.json();

          setUserInfo({
            username: data.name,
            email: data.email,
            profileImg: data.profileUrl,
          });
        } catch (error) {
          console.error("Error fetching profile:", error);
          setMessage("프로필 정보를 가져오는데 실패했습니다.");
        }
      };

      fetchProfile();
    }
  }, [isInitialized, isLoggedIn, token, router, setUserInfo, logout]);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }
};

export default MemberInfo;
