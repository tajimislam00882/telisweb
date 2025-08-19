'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface AppUser extends User {
    totalSpent?: number;
}


export default function AdminUsersPage() {
    const [users, setUsers] = useState<AppUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            // NOTE: Listing users is a protected operation and requires admin privileges
            // configured in Supabase RLS (Row Level Security) and potentially a server-side call
            // with a service_role key.
            // The 'AuthApiError: User not allowed' error indicates the current client-side
            // user does not have permission to perform this action.
            // This is expected for security reasons.
            // A proper implementation requires a secure backend endpoint (e.g., a Next.js API route)
            // that uses the Supabase service role key to fetch users.

            // For now, we will simulate loading and show an informative message.
            setLoading(true);
            setError("Fetching users from the client-side is disabled for security reasons. This functionality requires a secure server-side implementation.");
            setLoading(false);
        };

        fetchUsers();
    }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>Manage your website's users.</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Feature Not Available</AlertTitle>
              <AlertDescription>
                {error} Please implement a secure API route to fetch user data.
              </AlertDescription>
            </Alert>
        )}
        <Table className={error ? 'mt-4' : ''}>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
                 Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                        <TableCell><MoreHorizontal className="h-4 w-4 text-muted-foreground" /></TableCell>
                    </TableRow>
                 ))
            ) : (
             users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.user_metadata?.first_name || 'N/A'}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.created_at ? format(new Date(user.created_at), 'PPP') : 'N/A'}</TableCell>
                <TableCell className="text-right">${(user.totalSpent || 0).toFixed(2)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit User</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
             ))
            )}
            {!loading && users.length === 0 && !error && (
                 <TableRow>
                    <TableCell colSpan={5} className="text-center">No users found.</TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
