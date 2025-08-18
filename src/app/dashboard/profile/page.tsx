'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Upload } from 'lucide-react';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Password must be at least 6 characters'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function ProfilePage() {
  const { user, updateUser, uploadAvatar, supabase } = useAuth();
  const { toast } = useToast();
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  });

  useEffect(() => {
    if (user) {
      profileForm.reset({
        firstName: user.user_metadata?.first_name || '',
        lastName: user.user_metadata?.last_name || '',
        email: user.email || '',
      });
    }
  }, [user, profileForm]);

  const onProfileSubmit = async (data: z.infer<typeof profileSchema>) => {
    setIsProfileLoading(true);
    try {
      await updateUser({
        email: data.email,
        data: { first_name: data.firstName, last_name: data.lastName },
      });
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been successfully updated.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: error.message,
      });
    } finally {
      setIsProfileLoading(false);
    }
  };

  const onPasswordSubmit = async (data: z.infer<typeof passwordSchema>) => {
    setIsPasswordLoading(true);
    try {
        const { error } = await supabase.auth.updateUser({ password: data.newPassword });
        if (error) throw error;
      
        toast({
            title: 'Password Changed',
            description: 'Your password has been successfully changed.',
        });
        passwordForm.reset();
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Change Failed',
            description: error.message,
        });
    } finally {
        setIsPasswordLoading(false);
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setIsAvatarLoading(true);
    try {
      await uploadAvatar(file);
      toast({
        title: 'Avatar Updated',
        description: 'Your new avatar has been uploaded.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: error.message,
      });
    } finally {
      setIsAvatarLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <input
        type="file"
        ref={avatarInputRef}
        onChange={handleAvatarChange}
        className="hidden"
        accept="image/png, image/jpeg"
      />
      <Card>
        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.user_metadata.avatar_url} />
                  <AvatarFallback className="text-3xl">
                    {user.user_metadata.first_name?.[0] || user.email?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  size="icon"
                  className="absolute bottom-0 right-0 h-7 w-7 rounded-full"
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={isAvatarLoading}
                >
                  {isAvatarLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                </Button>
              </div>
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Controller
                  name="firstName"
                  control={profileForm.control}
                  render={({ field }) => <Input id="first-name" {...field} />}
                />
                {profileForm.formState.errors.firstName && <p className="text-sm text-destructive">{profileForm.formState.errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Controller
                  name="lastName"
                  control={profileForm.control}
                  render={({ field }) => <Input id="last-name" {...field} />}
                />
                 {profileForm.formState.errors.lastName && <p className="text-sm text-destructive">{profileForm.formState.errors.lastName.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Controller
                name="email"
                control={profileForm.control}
                render={({ field }) => <Input id="email" type="email" {...field} />}
              />
               {profileForm.formState.errors.email && <p className="text-sm text-destructive">{profileForm.formState.errors.email.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isProfileLoading}>
                {isProfileLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Profile
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>For your security, please choose a strong password.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
               <Controller
                name="currentPassword"
                control={passwordForm.control}
                render={({ field }) => <Input id="current-password" type="password" {...field} />}
              />
               {passwordForm.formState.errors.currentPassword && <p className="text-sm text-destructive">{passwordForm.formState.errors.currentPassword.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Controller
                name="newPassword"
                control={passwordForm.control}
                render={({ field }) => <Input id="new-password" type="password" {...field} />}
              />
               {passwordForm.formState.errors.newPassword && <p className="text-sm text-destructive">{passwordForm.formState.errors.newPassword.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Controller
                name="confirmPassword"
                control={passwordForm.control}
                render={({ field }) => <Input id="confirm-password" type="password" {...field} />}
              />
               {passwordForm.formState.errors.confirmPassword && <p className="text-sm text-destructive">{passwordForm.formState.errors.confirmPassword.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPasswordLoading}>
                {isPasswordLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Change Password
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
