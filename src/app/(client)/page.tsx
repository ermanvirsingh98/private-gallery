"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Gallery = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [content, setContent] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCode = Cookies.get("accessCode");
    if (savedCode) {
      setCode(savedCode);
      verifyCode(savedCode);
    } else {
      setLoading(false);
      setError("");
    }
  }, []);

  const verifyCode = async (codeToVerify: string) => {
    setError("");
    const response = await fetch("/api/verify-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: codeToVerify }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setContent(data);
      Cookies.set("accessCode", codeToVerify, { expires: 7 });
    } else {
      setError(data.error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await verifyCode(code);
  };

  if (loading) {
    // Show loading state while verifying code or submitting
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (content) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Protected Gallery</h1>
        <div>test</div>
      </div>
    );
  }

  return (
    <div className="flex h-[100vh] items-center justify-center">
      <div className="border p-4 rounded-md shadow w-[250px]">
        <h3 className="font-semibold tracking-tight">Enter Access Code</h3>
        <form onSubmit={handleSubmit} className="mb-4">
          <Input
            type="password"
            placeholder="Access Code"
            autoComplete="accessCode"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="my-4"
          />
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default Gallery;
