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
import { Switch } from '@/components/ui/switch';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Tabs defaultValue="payment" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="payment">Payment Gateways</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="payment">
          <div className="grid gap-6 mt-6">
            
            {/* SSL Commerz Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>SSL Commerz</CardTitle>
                        <CardDescription>
                        Configuration for Bangladeshi local payments.
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="ssl-enable">Enable</Label>
                        <Switch id="ssl-enable" />
                    </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="ssl-store-id">Store ID</Label>
                        <Input id="ssl-store-id" placeholder="Your Store ID" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ssl-store-password">Store Password</Label>
                        <Input id="ssl-store-password" type="password" placeholder="Your Store Password" />
                    </div>
                </div>
              </CardContent>
            </Card>

            {/* aamarPay Card */}
             <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>aamarPay</CardTitle>
                        <CardDescription>
                        Configuration for another popular Bangladeshi gateway.
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="aamarpay-enable">Enable</Label>
                        <Switch id="aamarpay-enable" />
                    </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="aamarpay-store-id">Store ID</Label>
                        <Input id="aamarpay-store-id" placeholder="Your aamarPay Store ID" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="aamarpay-signature-key">Signature Key</Label>
                        <Input id="aamarpay-signature-key" type="password" placeholder="Your Signature Key" />
                    </div>
                </div>
              </CardContent>
            </Card>

             {/* PortWallet Card */}
             <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>PortWallet</CardTitle>
                        <CardDescription>
                        Alternative gateway for local payments.
                        </CardDescription>
                    </div>
                     <div className="flex items-center gap-2">
                        <Label htmlFor="portwallet-enable">Enable</Label>
                        <Switch id="portwallet-enable" />
                    </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="portwallet-api-key">API Key</Label>
                        <Input id="portwallet-api-key" placeholder="Your PortWallet API Key" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="portwallet-api-secret">API Secret</Label>
                        <Input id="portwallet-api-secret" type="password" placeholder="Your API Secret" />
                    </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Manual Payment Instructions</CardTitle>
                    <CardDescription>
                    Provide instructions for manual payments. This will be shown to customers at checkout if no automatic gateway is selected.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        <Label htmlFor="manual-instructions">Instructions</Label>
                        <Textarea id="manual-instructions" placeholder="e.g., 'Please send payment to bKash number 01xxxxxxxxx and enter the transaction ID below.'" rows={5}/>
                    </div>
                </CardContent>
            </Card>
             <CardFooter className="border-t pt-6">
                <Button>Save Payment Settings</Button>
              </CardFooter>
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
