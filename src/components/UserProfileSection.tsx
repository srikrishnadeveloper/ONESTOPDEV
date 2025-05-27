
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserProfileSectionProps {
  isSidebarOpen: boolean;
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ isSidebarOpen }) => {
  const [profile, setProfile] = useState<any>(null);
  const { user, isLoading, signOut } = useAuth();

  useEffect(() => {
    const getProfile = async () => {
      try {
        if (!user) {
          setProfile(null);
          return;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile in UserProfileSection:', error);
          return;
        }

        setProfile(data);
      } catch (error) {
        console.error('Unexpected error fetching profile in UserProfileSection:', error);
      }
    };

    getProfile();
  }, [user]);

  // For header dropdown menu
  if (!isSidebarOpen) {
    return (
      isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Avatar className="h-8 w-8">
                {profile?.avatar_url ? (
                  <AvatarImage src={profile.avatar_url} alt={profile.username || "User"} />
                ) : (
                  <AvatarFallback>
                    {profile?.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                {profile?.full_name && (
                  <p className="font-medium">{profile.full_name}</p>
                )}
                {profile?.username && !profile?.full_name && (
                  <p className="font-medium">{profile.username}</p>
                )}
                {user.email && (
                  <p className="text-sm text-muted-foreground">
                    {user.email}
                  </p>
                )}
                {profile?.provider && (
                  <p className="text-xs text-muted-foreground">
                    via {profile.provider}
                  </p>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onSelect={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button size="sm" asChild>
          <Link to="/login">Sign In</Link>
        </Button>
      )
    );
  }

  // For sidebar user section
  return (
    <div className="p-4 border-t">
      {!user ? (
        <div className="rounded-lg bg-accent/50 p-4 space-y-2">
          <p className="text-sm font-medium">Join OneStopDev</p>
          <p className="text-xs text-muted-foreground">
            Create an account to save favorites and access exclusive features.
          </p>
          <Button className="w-full" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-lg bg-accent/50 p-4 space-y-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              {profile?.avatar_url ? (
                <AvatarImage src={profile.avatar_url} alt={profile.username || "User"} />
              ) : (
                <AvatarFallback>
                  {profile?.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="text-sm font-medium">{profile?.full_name || profile?.username || "User"}</p>
              <p className="text-xs text-muted-foreground truncate max-w-[180px]">{user.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link to="/profile">Profile</Link>
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              className="w-full"
              onClick={signOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileSection;
