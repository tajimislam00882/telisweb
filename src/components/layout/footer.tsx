import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';
import Logo from '@/components/shared/logo';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="border-t border-border/20 bg-card">
      <div className="container py-12 text-foreground">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4 md:col-span-1">
            <Logo />
            <p className="text-muted-foreground">
              Your one-stop shop for premium digital products.
            </p>
             <div className="flex space-x-2">
                <Button variant="ghost" size="icon" asChild>
                  <a href="#" aria-label="Twitter">
                    <Twitter className="h-5 w-5 text-muted-foreground" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="#" aria-label="GitHub">
                    <Github className="h-5 w-5 text-muted-foreground" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="#" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5 text-muted-foreground" />
                  </a>
                </Button>
              </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-foreground">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="text-muted-foreground hover:text-primary">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-primary">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Support</h3>
               <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    FAQ
                  </Link>
                </li>
                 <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/20 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Digital Emporium. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
