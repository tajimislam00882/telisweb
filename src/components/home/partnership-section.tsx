'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PartnershipSection() {
    return (
        <section className="py-20 bg-background">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                        💼 Business Partnership Opportunities
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Join our growing network and start earning today!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <Card className="bg-card border-border/20 text-center flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-2xl">🤝 Become an Affiliate</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <p className="text-muted-foreground">
                                Earn commission by promoting our products
                            </p>
                            <ul className="text-left space-y-2">
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500" />
                                    <span>Up to 15% commission</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500" />
                                    <span>Free marketing materials</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500" />
                                    <span>Weekly payments</span>
                                </li>
                            </ul>
                        </CardContent>
                        <div className="p-6 pt-0">
                             <Button size="lg" className="w-full" asChild>
                                <Link href="/affiliate-marketing">Join Affiliate Program</Link>
                            </Button>
                        </div>
                    </Card>

                    <Card className="bg-card border-border/20 text-center flex flex-col">
                        <CardHeader>
                             <CardTitle className="text-2xl">📦 Become a Supplier</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <p className="text-muted-foreground">
                                Partner with us for dropshipping business
                            </p>
                             <ul className="text-left space-y-2">
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500" />
                                    <span>No marketing costs</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500" />
                                    <span>Access to customers</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500" />
                                    <span>Fast payments</span>
                                </li>
                            </ul>
                        </CardContent>
                         <div className="p-6 pt-0">
                            <Button size="lg" variant="secondary" className="w-full" asChild>
                                <Link href="/dropshipping">Apply as Supplier</Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    )
}
