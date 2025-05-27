import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, User, Mail, LogOut, Github, LucideGithub } from "lucide-react";

interface ProfileData {
  id: string;
  username: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
  provider: string | null;
  full_name: string | null;
}

const Profile = () => {
  const { user, signOut, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        if (!user) return;

        setIsLoading(true);
        console.log('Fetching profile for user ID:', user.id);

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          toast({
            title: "Error fetching profile",
            description: error.message,
            variant: "destructive",
          });
          return;
        }

        console.log('Profile data:', data);
        setProfile(data as ProfileData);
      } catch (error) {
        console.error('Unexpected error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile information",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    getProfile();
  }, [user, toast]);

  const handleSignOut = async () => {
    await signOut();
  };

  const getProviderIcon = (provider: string | null) => {
    switch (provider?.toLowerCase()) {
      case 'github':
        return <Github className="h-4 w-4 mr-1" />;
      case 'google':
        return <LucideGithub className="h-4 w-4 mr-1" />;
      default:
        return <User className="h-4 w-4 mr-1" />;
    }
  };

  if (authLoading || isLoading) {
    return (
      <MainLayout>
        <div className="container max-w-4xl mx-auto px-4 py-10">
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!user || !profile) {
    return (
      <MainLayout>
        <div className="container max-w-4xl mx-auto px-4 py-10">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Profile Not Found</CardTitle>
              <CardDescription>
                User information could not be loaded. Please try logging in again.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button onClick={() => window.location.href = "/login"}>
                Go to Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto px-4 py-10">
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
          <div className="px-6 -mt-16">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={profile.avatar_url || undefined} alt={profile.username} />
              <AvatarFallback>{profile.username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <CardTitle className="text-2xl">{profile.full_name || profile.username}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Mail className="h-4 w-4 mr-1" />
                  {profile.email}
                </CardDescription>
              </div>
              <Badge className="mt-2 md:mt-0 flex items-center" variant="secondary">
                {getProviderIcon(profile.provider)}
                {profile.provider ? `${profile.provider.charAt(0).toUpperCase()}${profile.provider.slice(1)} Account` : 'Email Account'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Username</div>
                <div className="font-medium">{profile.username}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Member Since</div>
                <div className="font-medium">
                  {new Date(profile.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <Button variant="outline" className="text-destructive" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Profile;
