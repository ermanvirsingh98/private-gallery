import { Trash2, UserPen, UserPlus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { fetchUsers } from "./actions";
import Drawer from "@/components/Drawer";

const Users = async () => {
  const users: any = await fetchUsers();

  return (
    <div className="p-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Users Management</h2>
        <p className="text-muted-foreground">Here's a list of your all users</p>
      </div>
      <div className="flex items-center mb-4">
        <Button>
          <UserPlus size="16px" className="mr-2" /> Add Users
        </Button>
        {/* <Drawer /> */}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>ExpiryAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any) => (
            <TableRow>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.ExpiryAt ?? "No Expiry"}</TableCell>
              <TableCell>
                <Button className="mr-4" variant="destructive">
                  <Trash2 size="16px" />
                </Button>
                <Button variant="secondary">
                  <UserPen size="16px" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
