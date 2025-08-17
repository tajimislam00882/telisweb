import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Tabs defaultValue="payment" className="w-full">
        <TabsList>
          <TabsTrigger value="payment">Payment Gateways</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="payment">
          <div className="grid gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Automatic Payment Gateways</CardTitle>
                <CardDescription>
                  Enter your API keys for Bkash, Nagad, and Rocket.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bkash-key">Bkash API Key</Label>
                  <Input id="bkash-key" placeholder="Your Bkash API Key" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nagad-key">Nagad API Key</Label>
                  <Input id="nagad-key" placeholder="Your Nagad API Key" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rocket-key">Rocket API Key</Label>
                  <Input id="rocket-key" placeholder="Your Rocket API Key" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save API Keys</Button>
              </CardFooter>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Manual Payment Instructions</CardTitle>
                    <CardDescription>
                    Provide instructions for manual payments. This will be shown to customers at checkout.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        <Label htmlFor="manual-instructions">Instructions</Label>
                        <Textarea id="manual-instructions" placeholder="e.g., 'Please send payment to Bkash number 01xxxxxxxxx and enter the transaction ID below.'" rows={5}/>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Save Instructions</Button>
                </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="general">
             <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Manage general site settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input id="site-name" defaultValue="Digital Emporium" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="site-currency">Currency</Label>
                  <Input id="site-currency" defaultValue="USD" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save General Settings</Button>
              </CardFooter>
            </Card>
        </TabsContent>
         <TabsContent value="notifications">
             <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage email notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email for Notifications</Label>
                  <Input id="admin-email" type="email" placeholder="admin@example.com" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Notification Settings</Button>
              </CardFooter>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
