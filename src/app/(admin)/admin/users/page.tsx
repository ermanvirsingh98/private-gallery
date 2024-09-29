"use client";

import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetching data from an API
  useEffect(() => {
    const fettchUsers = async () => {
      setLoading(true);
      setError(null);

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
        users.length > 0 && <p>{JSON.stringify(users, null, 4)}</p>
      )}
    </div>
  );
};

export default Users;
