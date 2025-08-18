import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, DollarSign, Gift } from 'lucide-react';
import Link from 'next/link';

export default function AffiliateMarketingPage() {
  return (
    <div className="container py-12 text-foreground">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
          অ্যাফিলিয়েট মার্কেটিং প্রোগ্রাম
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          আমাদের পণ্য প্রচার করে আয় করুন। আমাদের অ্যাফিলিয়েট প্রোগ্রামে যোগ দিন এবং প্রতিটি বিক্রয়ের উপর আকর্ষণীয় কমিশন উপভোগ করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
        <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
                <DollarSign className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">আকর্ষণীয় কমিশন</h3>
            <p className="text-muted-foreground mt-2">প্রতিটি সফল বিক্রয়ের উপর ২৫% পর্যন্ত কমিশন অর্জন করুন।</p>
        </div>
        <div className="flex flex-col items-center">
             <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Gift className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">মাসিক বোনাস</h3>
            <p className="text-muted-foreground mt-2">সেরা পারফর্মারদের জন্য রয়েছে মাসিক বোনাস এবং আকর্ষণীয় পুরস্কার।</p>
        </div>
        <div className="flex flex-col items-center">
             <div className="bg-primary/10 p-4 rounded-full mb-4">
                <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">সহজ পেমেন্ট</h3>
            <p className="text-muted-foreground mt-2">আপনার সুবিধা অনুযায়ী ব্যাংক বা মোবাইল ব্যাংকিং এর মাধ্যমে পেমেন্ট নিন।</p>
        </div>
      </div>

      <Card className="bg-card border-border/20">
        <CardHeader>
          <CardTitle className="text-center text-2xl">কিভাবে শুরু করবেন?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl flex-shrink-0">1</div>
                <div>
                    <h4 className="font-semibold text-lg">অ্যাকাউন্ট তৈরি করুন</h4>
                    <p className="text-muted-foreground">আমাদের ওয়েবসাইটে একটি অ্যাকাউন্ট তৈরি করে অ্যাফিলিয়েট প্রোগ্রামের জন্য আবেদন করুন।</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl flex-shrink-0">2</div>
                <div>
                    <h4 className="font-semibold text-lg">প্রচার শুরু করুন</h4>
                    <p className="text-muted-foreground">আপনার ইউনিক অ্যাফিলিয়েট লিঙ্ক ব্যবহার করে আমাদের পণ্য আপনার ওয়েবসাইট, ব্লগ বা সোশ্যাল মিডিয়ায় প্রচার করুন।</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl flex-shrink-0">3</div>
                <div>
                    <h4 className="font-semibold text-lg">আয় করুন</h4>
                    <p className="text-muted-foreground">যখন কোনো ব্যবহারকারী আপনার লিঙ্ক থেকে কোনো পণ্য কিনবেন, আপনি স্বয়ংক্রিয়ভাবে আপনার অ্যাকাউন্টে কমিশন পেয়ে যাবেন।</p>
                </div>
            </div>
             <div className="text-center mt-8">
                <Button size="lg" asChild>
                    <Link href="/register">এখনি যোগ দিন</Link>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
