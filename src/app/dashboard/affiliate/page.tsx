
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Handshake, Loader2, Clipboard, DollarSign, Users, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { Affiliate } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

const affiliateSchema = z.object({
  payment_method: z.enum(['bkash', 'nagad', 'rocket', 'bank'], {
    required_error: 'Payment method is required',
  }),
  payment_details: z.string().min(1, 'Payment details are required'),
});

type AffiliateFormData = z.infer<typeof affiliateSchema>;

export default function AffiliatePage() {
  const { user, supabase } = useAuth();
  const { toast } = useToast();
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAffiliateData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('affiliates')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          // PGRST116 means no rows found, which is not an error here.
          throw error;
        }
        setAffiliate(data);
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Error fetching data',
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchAffiliateData();
  }, [user, supabase, toast]);

  const form = useForm<AffiliateFormData>({
    resolver: zodResolver(affiliateSchema),
  });

  const onSubmit = async (data: AffiliateFormData) => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      // Generate a unique affiliate code
      const affiliate_code = `${user.user_metadata?.first_name?.toLowerCase() || 'user'}${Math.random().toString(36).substring(2, 8)}`;

      const { error } = await supabase.from('affiliates').insert({
        user_id: user.id,
        affiliate_code,
        payment_method: data.payment_method,
        payment_details: { number: data.payment_details }, // Storing as JSON
        status: 'pending', // Awaiting admin approval
      });

      if (error) throw error;
      
      const { data: newAffiliate } = await supabase
          .from('affiliates')
          .select('*')
          .eq('user_id', user.id)
          .single();

      setAffiliate(newAffiliate);
      toast({
        title: 'Application Submitted!',
        description: 'Your affiliate application is pending approval.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    if (!affiliate?.affiliate_code) return;
    navigator.clipboard.writeText(`https://digitalemporium.com/ref/${affiliate.affiliate_code}`);
    toast({ title: 'Copied to clipboard!' });
  };

  if (isLoading) {
    return (
        <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-48 w-full" />
        </div>
    );
  }

  if (affiliate) {
    return (
      <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Your Affiliate Dashboard</CardTitle>
                <CardDescription>
                    {affiliate.status === 'pending' && "Your application is under review. You'll be notified upon approval."}
                    {affiliate.status === 'active' && "Welcome to the team! Start sharing your link to earn commissions."}
                    {affiliate.status === 'suspended' && "Your affiliate account is currently suspended. Please contact support."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {affiliate.status === 'pending' ? (
                     <div className="text-center p-8 bg-muted rounded-lg">
                        <p className="font-semibold">Application Pending</p>
                        <p className="text-muted-foreground text-sm mt-1">We are reviewing your application. This usually takes 1-2 business days.</p>
                    </div>
                ) : (
                    <>
                    <div className="space-y-4">
                        <Label htmlFor="affiliate-link">Your Unique Referral Link</Label>
                        <div className="flex gap-2">
                        <Input id="affiliate-link" readOnly value={`https://digitalemporium.com/ref/${affiliate.affiliate_code}`} />
                        <Button onClick={copyToClipboard} variant="outline" size="icon"><Clipboard className="h-4 w-4" /></Button>
                        </div>
                    </div>
                     <div className="grid gap-4 md:grid-cols-3 mt-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">BDT {affiliate.total_earnings.toFixed(2)}</div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{0}</div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">0%</div>
                            </CardContent>
                        </Card>
                    </div>
                    </>
                )}
            </CardContent>
             <CardFooter className="text-xs text-muted-foreground">
                Joined on {format(new Date(affiliate.created_at), 'PPP')}
             </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <Card>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
                <Handshake className="h-8 w-8 text-primary" />
            </div>
            <div>
            <CardTitle>Become an Affiliate Partner</CardTitle>
            <CardDescription>
              Join our team and earn commissions by promoting our products.
            </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">How it works</h3>
            <ol className="list-decimal list-inside text-muted-foreground space-y-1 mt-2 text-sm">
              <li>Submit your application below.</li>
              <li>Once approved, you will get a unique referral link.</li>
              <li>Share the link on your website, blog, or social media.</li>
              <li>Earn a commission for every sale made through your link!</li>
            </ol>
          </div>
          <div className="space-y-2">
            <Label htmlFor="payment_method">Preferred Payment Method</Label>
            <Select onValueChange={(value) => form.setValue('payment_method', value as any)} defaultValue="">
              <SelectTrigger id="payment_method">
                <SelectValue placeholder="Select a method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bkash">bKash</SelectItem>
                <SelectItem value="nagad">Nagad</SelectItem>
                <SelectItem value="rocket">Rocket</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.payment_method && <p className="text-sm text-destructive">{form.formState.errors.payment_method.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="payment_details">Payment Details</Label>
            <Input
              id="payment_details"
              placeholder="e.g., Your bKash number or bank account info"
              {...form.register('payment_details')}
            />
             {form.formState.errors.payment_details && <p className="text-sm text-destructive">{form.formState.errors.payment_details.message}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Application
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
