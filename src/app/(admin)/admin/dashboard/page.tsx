"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";

const images = [
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=800",
  "https://images.unsplash.com/photo-1727461567487-575ec98777fc?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function AdminDashboard() {
  const router = useRouter();
  const [codes, setCodes] = useState([]);
  const [newCode, setNewCode] = useState("");
  const [expiryDays, setExpiryDays] = useState(7);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    const response = await fetch("/api/codes");
    const data = await response.json();
    setCodes(data);
  };

  const generateCode = async () => {
    const response = await fetch("/api/codes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, expiryDays }),
    });
    const data = await response.json();
    setNewCode(data.code);
    fetchCodes();
  };

  const removeCode = async (id: number) => {
    await fetch(`/api/codes/${id}`, {
      method: "DELETE",
    });
    Cookies.remove("accessCode");
    fetchCodes();
  };

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="h-full px-4 py-6 lg:px-8">
      <div className="text-right py-3">
        <Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="mr-2 h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add photo
        </Button>
      </div>
      <div className="flex space-x-4 pb-4">
        {images.map((image, i) => (
          <div key={i} className="space-y-3 w-[250px]">
            <div className="overflow-hidden rounded-md">
              <img
                className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]"
                src={image}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
    // <div className="container mx-auto p-4">
    //   <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
    //   <div className="mb-4">
    //     <input
    //       type="text"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //       className="border p-2 mr-2"
    //       placeholder="Name"
    //     />
    //     <input
    //       type="number"
    //       value={expiryDays}
    //       onChange={(e) => setExpiryDays(parseInt(e.target.value))}
    //       className="border p-2 mr-2"
    //       placeholder="Expiry days"
    //     />
    //     <button
    //       onClick={generateCode}
    //       className="bg-blue-500 text-white p-2 rounded"
    //     >
    //       Generate Code
    //     </button>
    //   </div>
    //   {newCode && (
    //     <div className="mb-4 p-2 bg-green-100 border border-green-400 rounded">
    //       New Code: {newCode}
    //     </div>
    //   )}
    //   <h2 className="text-xl font-bold mb-2">Access Codes</h2>
    //   <ul>
    //     {codes.map((code) => (
    //       <li key={code.id} className="mb-2">
    //         {code.name} - {code.code} - Expires:{" "}
    //         {new Date(code.expiresAt).toLocaleString()}
    //         <button
    //           onClick={() => removeCode(code.id)}
    //           className="ml-2 bg-red-500 text-white p-1 rounded"
    //         >
    //           Remove
    //         </button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}
