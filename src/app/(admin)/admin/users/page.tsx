"use client";

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash } from "@/components/icons/trash";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetching data from an API
  useEffect(() => {
    const fettchUsers = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error: any) {
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    };
    fettchUsers();
  }, []);

  // if (loading) return <div>loading...</div>;
  // if (error) return <div>Error...</div>;

  return (
    <div className="h-full px-4 py-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {loading ? (
        <div>loading...</div>
      ) : (
        users.length > 0 && (
          <Table className="w-2/3">
            <TableBody>
              {users.map((user: any) => (
                <TableRow>
                  <TableCell>{user?.name}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>
                    <Button className="mr-2" variant="secondary">
                      Generate Password
                    </Button>
                    <Button variant="destructive">
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      )}
    </div>
  );
};

export default Users;
