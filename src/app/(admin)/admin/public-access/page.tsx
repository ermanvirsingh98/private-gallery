"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Cookies from "js-cookie";
import { Trash } from "@/components/icons/trash";

const PublicAccess = () => {
  const [name, setName] = useState("");
  const [expiryDays, setExpiryDays] = useState(1);
  const [newCode, setNewCode] = useState("");
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    setLoading(true);
    const response = await fetch("/api/codes");
    const data = await response.json();
    setCodes(data);
    setLoading(false);
  };

  const handleGenerateCode = async () => {
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

  return (
    <div className="h-full px-4 py-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Public Access</h1>
      <div className=" w-1/2">
        <div className="lg:flex lg:gap-3 pb-4 mb-4 border-b">
          <Input
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            name="days"
            type="number"
            placeholder="Days"
            value={expiryDays}
            onChange={(e) => setExpiryDays(parseInt(e.target.value))}
          />
          <Button onClick={handleGenerateCode}>Generate Code</Button>
        </div>
        {newCode && (
          <div className="mb-4 p-2 bg-green-100 border border-green-400 rounded">
            New Code: {newCode}
          </div>
        )}
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Expiry Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {codes.map((code: any) => (
                  <TableRow>
                    <TableCell>{code?.name}</TableCell>
                    <TableCell>{code?.code}</TableCell>
                    <TableCell>
                      {new Date(code.expiresAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        onClick={() => removeCode(code.id)}
                      >
                        <Trash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicAccess;
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
