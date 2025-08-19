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
import { Download } from 'lucide-react';
import { downloadItems } from '@/lib/data';
import { useLanguage } from '@/context/language-context';

export default function DownloadsPage() {
  const { t } = useLanguage();
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
            {downloadItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.purchaseDate}</TableCell>
                <TableCell className="text-right">
                  <Button asChild>
                    <a href={item.downloadUrl}>
                      <Download className="mr-2 h-4 w-4" />
                      {t('dashboard_downloads_table_button')}
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
