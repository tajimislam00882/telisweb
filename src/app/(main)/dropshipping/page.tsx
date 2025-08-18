import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Truck, BarChart } from 'lucide-react';
import Link from 'next/link';

export default function DropshippingPage() {
  return (
    <div className="container py-12 text-foreground">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
          আমাদের সাথে ড্রপশিপিং করুন
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          কোনো রকম ইনভেন্টরি ছাড়াই নিজের ব্যবসা শুরু করুন। আমরা আপনার জন্য পণ্য সংগ্রহ, প্যাকেজিং এবং ডেলিভারির দায়িত্ব নেব।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
        <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Package className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">ইনভেন্টরি মুক্ত</h3>
            <p className="text-muted-foreground mt-2">পণ্য স্টকে রাখার কোনো ঝামেলা নেই। আপনি শুধু বিক্রয়ে মনোযোগ দিন।</p>
        </div>
        <div className="flex flex-col items-center">
             <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Truck className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">দ্রুত ডেলিভারি</h3>
            <p className="text-muted-foreground mt-2">আমরা আপনার গ্রাহকদের কাছে দ্রুত এবং নিরাপদে পণ্য পৌঁছে দেব।</p>
        </div>
        <div className="flex flex-col items-center">
             <div className="bg-primary/10 p-4 rounded-full mb-4">
                <BarChart className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">লাভজনক ব্যবসা</h3>
            <p className="text-muted-foreground mt-2">কম ঝুঁকিতে নিজের অনলাইন ব্যবসা শুরু করুন এবং আকর্ষণীয় লাভ করুন।</p>
        </div>
      </div>

      <Card className="bg-card border-border/20">
        <CardHeader>
          <CardTitle className="text-center text-2xl">ড্রপশিপিং প্রক্রিয়া</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl flex-shrink-0">1</div>
                <div>
                    <h4 className="font-semibold text-lg">পণ্য নির্বাচন করুন</h4>
                    <p className="text-muted-foreground">আমাদের ক্যাটালগ থেকে আপনার পছন্দের পণ্য নির্বাচন করে আপনার ওয়েবসাইটে যোগ করুন।</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl flex-shrink-0">2</div>
                <div>
                    <h4 className="font-semibold text-lg">অর্ডার গ্রহণ করুন</h4>
                    <p className="text-muted-foreground">আপনার ওয়েবসাইট বা সোশ্যাল মিডিয়া পেজ থেকে গ্রাহকের অর্ডার গ্রহণ করুন।</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl flex-shrink-0">3</div>
                <div>
                    <h4 className="font-semibold text-lg">অর্ডার প্লেস করুন</h4>
                    <p className="text-muted-foreground">গ্রাহকের ঠিকানা দিয়ে আমাদের ওয়েবসাইটে অর্ডারটি প্লেস করুন এবং বাকিটা আমাদের উপর ছেড়ে দিন।</p>
                </div>
            </div>
             <div className="text-center mt-8">
                <Button size="lg" asChild>
                    <Link href="/register">ড্রপশিপার হিসেবে যোগ দিন</Link>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
