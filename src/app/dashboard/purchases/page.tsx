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
import { Badge } from '@/components/ui/badge';
import { purchaseHistory } from '@/lib/data';
import { Button } from '@/components/ui/button';

export default function PurchasesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase History</CardTitle>
        <CardDescription>
          Here is a list of all your past orders.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseHistory.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell className="font-medium">{order.orderId}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                 <TableCell className="text-right">
                    <Button variant="outline" size="sm">View Invoice</Button>
                 </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
