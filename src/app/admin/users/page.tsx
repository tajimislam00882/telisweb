

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
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
import type { User } from '@supabase/supabase-js';
import { format } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { redirect } from 'next/navigation';

interface AppUser extends User {
    totalSpent?: number;
}

const ADMIN_EMAILS = ['telisweb@alchosting.xyz'];

// This is a server component, so we can fetch data directly here.
async function fetchUsers() {
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    );
    
    // Check if the current user is an admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
       // This will prevent non-admins from even attempting to fetch users.
       // The layout will redirect, but this is an extra layer of security.
       redirect('/admin/login');
    }

    // Creating a service role client to bypass RLS for fetching users.
    // IMPORTANT: This uses an environment variable that should ONLY be available on the server.
    const supabaseAdmin = createServerClient(
         process.env.NEXT_PUBLIC_SUPABASE_URL!,
         process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use the service role key
         {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    )

    // listUsers is an admin-only function
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();
    
    if (error) {
        console.error('Error fetching users:', error);
        return { users: [], error: 'Failed to fetch users. Check server logs.' };
    }

    return { users, error: null };
}


export default async function AdminUsersPage() {
    const { users, error } = await fetchUsers();
    
    const getFullName = (user: AppUser) => {
        const { first_name, last_name } = user.user_metadata;
        if (first_name && last_name) return `${first_name} ${last_name}`;
        if (first_name) return first_name;
        if (last_name) return last_name;
        return user.email?.split('@')[0] || 'N/A';
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>Manage your website's users.</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
            <Alert variant="destructive" className="mb-4">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error Fetching Users</AlertTitle>
              <AlertDescription>
                {error} Ensure your `SUPABASE_SERVICE_ROLE_KEY` environment variable is set correctly.
              </AlertDescription>
            </Alert>
        )}
        <Table>
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
            {users && users.length > 0 ? (
             users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{getFullName(user as AppUser)}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.created_at ? format(new Date(user.created_at), 'PPP') : 'N/A'}</TableCell>
                <TableCell className="text-right">${((user as AppUser).totalSpent || 0).toFixed(2)}</TableCell>
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
            ) : (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">No users found.</TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
