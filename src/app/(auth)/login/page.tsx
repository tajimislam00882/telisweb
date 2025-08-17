import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Logo from '@/components/shared/logo';

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 22c-2.39 0-4.63-.83-6.42-2.28" />
        <path d="M21.72 10.45c-.13-.4-.32-.8-.56-1.18" />
        <path d="M2.28 13.58a9.94 9.94 0 0 0-.01 1.84" />
        <path d="M12 3.5c-2.4 0-4.64.83-6.43 2.27" />
        <path d="M3.5 12c0-2.4.83-4.64 2.27-6.43" />
        <path d="M13.58 2.28a9.94 9.94 0 0 0-1.84-.01" />
        <path d="M12 20.5c2.4 0 4.64-.83 6.43-2.27" />
        <path d="M20.5 12c0 2.4-.83 4.64-2.27 6.43" />
        <path d="M10.45 21.72c-.4-.13-.8-.32-1.18-.56" />
        <path d="M12 12h8" />
        <path d="M12 12v8" />
        <path d="M12 12l-8 8" />
        <path d="M12 12l8-8" />
      </svg>
    )
  }

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader className="text-center">
            <Logo className="mb-4 justify-center" />
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" />
                <Label htmlFor="remember-me">Remember me</Label>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
                <GoogleIcon className="mr-2 h-4 w-4" />
                Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
