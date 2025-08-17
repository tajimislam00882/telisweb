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

export default function DownloadsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Downloads</CardTitle>
        <CardDescription>
          Access and download your purchased digital products here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
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
                      Download
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
