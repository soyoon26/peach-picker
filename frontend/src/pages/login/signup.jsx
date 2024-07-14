import React, { useState } from "react";
import BasicBtn from "../../components/button/BasicBtn";
import Image from "next/image";
import peach_logo from "../../../public/peach_logo.png";
import kakao from "../../images/kakao_login.png";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!username) {
      newErrors.username = "필수정보입니다.";
      hasError = true;
    }
    if (!email) {
      newErrors.email = "필수정보입니다.";
      hasError = true;
    }
    if (!password) {
      newErrors.password = "필수정보입니다.";
      hasError = true;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "필수정보입니다.";
      hasError = true;
    }
    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    try {
      const response = await fetch(
        "http://maewakka123.iptime.org:31765/users/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const responseData = await response.text();
      try {
        const data = JSON.parse(responseData);
        if (response.ok) {
          localStorage.setItem("token", data.token);
          sessionStorage.setItem("token", data.token);
          alert("회원가입이 완료되었습니다.");
          window.location.href = "/";
        } else {
          setMessage(data.message || "회원가입 실패");
        }
      } catch (error) {
        if (response.ok) {
          localStorage.setItem("token", responseData.token);
          sessionStorage.setItem("token", responseData.token);
          alert("회원가입이 완료되었습니다.");
          window.location.href = "/";
        } else {
          setMessage(responseData || "회원가입 실패");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("요청 실패");
    }
  };

  return (
    <div className="flex flex-col justify-center mb-10 items-center ">
      <Image
        src={peach_logo}
        width={200}
        alt="Peach Logo"
        className="sm:flex hidden"
      />
      <form className="w-1/5 mt-10 min-w-60" onSubmit={handleSubmit}>
        <div className="mb-5 w-full justify-center flex items-center py-3 border-[1px] border-solid border-[#808080]">
          <Image src={kakao} width={20} alt="Kakao Login" />
          <div className="ml-5">카카오 로그인</div>
        </div>
        <div className="w-full mb-5 flex items-center">
          <div className="w-5/12 h-[1px] border-[1px] border-[#808080]"></div>
          <div className="w-2/12 text-sm text-gray-500 text-center">혹은</div>
          <div className="w-5/12 border-[1px] h-[1px] border-[#808080]"></div>
        </div>
        <div>Username</div>
        <div className="mb-1 w-full flex items-center py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="text"
            className="bg-[#f8f8f8] ml-3 text-[20px] outline-none"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {errors.username && (
          <div className="text-red-500 mb-3 text-[10px]">{errors.username}</div>
        )}

        <div>Email</div>
        <div className="mb-1 w-full flex items-center py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="email"
            className="bg-[#f8f8f8] ml-3 text-[20px] outline-none"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errors.email && (
          <div className="text-red-500 mb-3 text-[10px]">{errors.email}</div>
        )}

        <div>Password</div>
        <div className="mb-1 w-full flex items-center py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="password"
            className="bg-[#f8f8f8] ml-3 text-[20px] outline-none"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors.password && (
          <div className="text-red-500 mb-3 text-[10px]">{errors.password}</div>
        )}

        <div>Confirm Password</div>
        <div className="mb-1 w-full flex items-center py-3 bg-[#f8f8f8] border-[1px] border-solid border-[#808080]">
          <input
            type="password"
            className="bg-[#f8f8f8] ml-3 text-[20px] outline-none"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {errors.confirmPassword && (
          <div className="text-red-500 mb-3 text-[10px]">
            {errors.confirmPassword}
          </div>
        )}

        <div className="text-red-500 mb-5 text-[10px]">{message}</div>
        <BasicBtn
          text={"Submit"}
          bgColor={"#fb5e67"}
          textColor={"#fff"}
          type="submit"
        />
      </form>
    </div>
  );
};

export default Signup;