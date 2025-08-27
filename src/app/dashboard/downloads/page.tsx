
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
import { Button } from '@/components/ui/button';
import { Download, HardDriveDownload } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import type { OrderItem } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import Image from 'next/image';

export default function DownloadsPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [downloads, setDownloads] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDownloads = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const response = await fetch('/api/orders/downloads');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch downloads');
        }
        const data = await response.json();
        setDownloads(data);
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
        fetchDownloads();
    }
  }, [user, toast]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dashboard_downloads_title')}</CardTitle>
        <CardDescription>
          {t('dashboard_downloads_desc')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('dashboard_downloads_table_product')}</TableHead>
              <TableHead>{t('dashboard_downloads_table_date')}</TableHead>
              <TableHead className="text-right">{t('dashboard_downloads_table_action')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-10 w-28 ml-auto" /></TableCell>
                    </TableRow>
                ))
            ) : downloads.length > 0 ? (
                downloads.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium flex items-center gap-4">
                        <Image src={item.products?.image_url || 'https://placehold.co/64x64.png'} alt={item.products?.name || ''} width={40} height={40} className="rounded" />
                        <span>{item.products?.name}</span>
                    </TableCell>
                    <TableCell>{format(new Date(item.order_id), 'PPP')}</TableCell>
                    <TableCell className="text-right">
                      {item.products?.digital_file_url ? (
                        <Button asChild>
                            <a href={item.products.digital_file_url} target="_blank" rel="noopener noreferrer">
                            <Download className="mr-2 h-4 w-4" />
                            {t('dashboard_downloads_table_button')}
                            </a>
                        </Button>
                        ) : (
                        <Button variant="outline" disabled>No File</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={3} className="h-48 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <HardDriveDownload className="h-12 w-12 text-muted-foreground" />
                            <h3 className="text-xl font-semibold">No Downloads Yet</h3>
                            <p className="text-muted-foreground">Your purchased digital products will appear here.</p>
                        </div>
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
