
'use client';

import Link from 'next/link';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import type { Supplier } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function AdminSuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [supplierToDelete, setSupplierToDelete] = useState<Supplier | null>(null);
  const { toast } = useToast();

  const fetchSuppliers = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.from('suppliers').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching suppliers:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch suppliers.' });
    } else if (data) {
      setSuppliers(data as any[] as Supplier[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);
  
  const handleDeleteSupplier = async () => {
    if (!supplierToDelete) return;
    const supabase = createClient();
    
    try {
        const { error } = await supabase.from('suppliers').delete().eq('id', supplierToDelete.id);
        if (error) throw error;
        
        toast({
            title: 'Supplier Deleted',
            description: `"${supplierToDelete.company_name}" has been successfully deleted.`
        });
        fetchSuppliers();
    } catch(error: any) {
         toast({
            variant: 'destructive',
            title: 'Deletion Failed',
            description: error.message
        });
    } finally {
        setSupplierToDelete(null);
    }
  }

  return (
    <>
    <AlertDialog open={!!supplierToDelete} onOpenChange={(isOpen) => !isOpen && setSupplierToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              supplier "{supplierToDelete?.company_name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSupplier}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Suppliers</CardTitle>
            <CardDescription>Manage your dropshipping suppliers.</CardDescription>
          </div>
          <Button asChild>
            <Link href="/admin/suppliers/add">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Supplier
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead className="hidden md:table-cell">Joined On</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><MoreHorizontal className="h-4 w-4 text-muted-foreground" /></TableCell>
                </TableRow>
              ))
            ) : suppliers.length > 0 ? (
              suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.company_name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(
                        supplier.status === 'active' && 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700',
                        supplier.status === 'pending' && 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700',
                        supplier.status === 'inactive' && 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700'
                    )}>
                      {supplier.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {supplier.email || 'N/A'}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {supplier.created_at ? format(new Date(supplier.created_at), 'PPP') : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setSupplierToDelete(supplier)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        No suppliers found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </>
  );
}
