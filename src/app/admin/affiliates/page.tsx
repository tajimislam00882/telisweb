
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
import { MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Affiliate } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase';

export default function AdminAffiliatesPage() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogState, setDialogState] = useState<{ isOpen: boolean; affiliate: Affiliate | null; action: 'delete' | 'approve' | 'suspend' | null }>({ isOpen: false, affiliate: null, action: null });
  const { toast } = useToast();

  const fetchAffiliates = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data: affiliatesData, error: affiliatesError } = await supabase
      .from('affiliates')
      .select(`*, users ( raw_user_meta_data )`)
      .order('created_at', { ascending: false });

    if (affiliatesError) {
      console.error('Error fetching affiliates:', affiliatesError);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch affiliates.' });
    } else if (affiliatesData) {
      setAffiliates(affiliatesData as any[] as Affiliate[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAffiliates();
  }, []);

  const handleAction = async () => {
    if (!dialogState.affiliate || !dialogState.action) return;
    const { affiliate, action } = dialogState;

    let response;
    try {
      if (action === 'delete') {
        response = await fetch(`/api/admin/affiliates/${affiliate.id}`, { method: 'DELETE' });
      } else {
        response = await fetch(`/api/admin/affiliates/${affiliate.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: action === 'approve' ? 'active' : action }),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${action} affiliate.`);
      }

      toast({
        title: `Affiliate ${action.charAt(0).toUpperCase() + action.slice(1)}d`,
        description: `Affiliate "${getAffiliateName(affiliate)}" has been successfully ${action}d.`,
      });
      fetchAffiliates();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: `${action.charAt(0).toUpperCase() + action.slice(1)} Failed`,
        description: error.message,
      });
    } finally {
      setDialogState({ isOpen: false, affiliate: null, action: null });
    }
  };

  const openDialog = (affiliate: Affiliate, action: 'delete' | 'approve' | 'suspend') => {
    setDialogState({ isOpen: true, affiliate, action });
  };

  const getAffiliateName = (affiliate: Affiliate) => {
    const metaData = affiliate.users?.raw_user_meta_data;
    if (metaData?.first_name && metaData?.last_name) {
      return `${metaData.first_name} ${metaData.last_name}`;
    }
    return affiliate.users?.email || 'N/A';
  };

  const getDialogDescription = () => {
    if (!dialogState.affiliate || !dialogState.action) return '';
    const name = getAffiliateName(dialogState.affiliate);
    switch (dialogState.action) {
      case 'delete':
        return `This will permanently delete the affiliate "${name}". This action cannot be undone.`;
      case 'approve':
        return `Are you sure you want to approve the affiliate "${name}"? Their status will be set to 'active'.`;
      case 'suspend':
        return `Are you sure you want to suspend the affiliate "${name}"? Their referral link will be deactivated.`;
      default:
        return '';
    }
  };
  
  return (
    <>
      <AlertDialog open={dialogState.isOpen} onOpenChange={(isOpen) => !isOpen && setDialogState({ isOpen: false, affiliate: null, action: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {getDialogDescription()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAction}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Affiliates</CardTitle>
              <CardDescription>Manage your affiliate partners.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Affiliate Name</TableHead>
                <TableHead>Affiliate Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Total Earnings</TableHead>
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
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                    <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><MoreHorizontal className="h-4 w-4 text-muted-foreground" /></TableCell>
                  </TableRow>
                ))
              ) : affiliates.length > 0 ? (
                affiliates.map((affiliate) => (
                  <TableRow key={affiliate.id}>
                    <TableCell className="font-medium">{getAffiliateName(affiliate)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{affiliate.affiliate_code}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(
                          affiliate.status === 'active' && 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700',
                          affiliate.status === 'pending' && 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700',
                          affiliate.status === 'suspended' && 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700',
                          affiliate.status === 'inactive' && 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-900/50 dark:text-gray-300 dark:border-gray-700'
                      )}>
                        {affiliate.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      ${affiliate.total_earnings.toFixed(2)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {affiliate.created_at ? format(new Date(affiliate.created_at), 'PPP') : 'N/A'}
                    </TableCell>
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
                          {affiliate.status === 'pending' && <DropdownMenuItem onClick={() => openDialog(affiliate, 'approve')}>Approve</DropdownMenuItem>}
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                           {affiliate.status === 'active' && <DropdownMenuItem onClick={() => openDialog(affiliate, 'suspend')}>Suspend</DropdownMenuItem>}
                          <DropdownMenuItem className="text-destructive" onClick={() => openDialog(affiliate, 'delete')}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                  <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                          No affiliates found.
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
