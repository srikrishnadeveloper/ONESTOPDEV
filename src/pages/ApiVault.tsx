
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import MainLayout from "@/layouts/MainLayout";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Eye, EyeOff, Plus, Search, Trash2, Key, Shield } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Define the API key type
interface ApiKey {
  id: string;
  name: string;
  description: string | null;
  key_value: string;
  created_at: string;
}

const ApiVault = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newApiKey, setNewApiKey] = useState({
    name: "",
    description: "",
    key_value: "",
  });
  const [revealedKeyIds, setRevealedKeyIds] = useState<Set<string>>(new Set());

  // Query to fetch the user's API keys
  const {
    data: apiKeys,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["apiKeys", user?.id],
    queryFn: async () => {
      console.log("Fetching API keys for user:", user?.id);
      if (!user) return [];

      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching API keys:", error);
        throw new Error(error.message);
      }

      console.log("API keys fetched successfully:", data);
      return data as ApiKey[];
    },
    enabled: !!user,
  });

  // Mutation to add a new API key
  const addApiKeyMutation = useMutation({
    mutationFn: async (newKey: typeof newApiKey) => {
      console.log("Adding new API key:", newKey.name);
      const { data, error } = await supabase
        .from("api_keys")
        .insert([
          {
            user_id: user!.id,
            name: newKey.name,
            description: newKey.description || null,
            key_value: newKey.key_value,
          },
        ])
        .select();

      if (error) {
        console.error("Error adding API key:", error);
        throw new Error(error.message);
      }

      console.log("API key added successfully:", data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiKeys", user?.id] });
      setNewApiKey({ name: "", description: "", key_value: "" });
      setShowAddDialog(false);
      toast({
        title: "API key added",
        description: "Your API key has been securely stored.",
      });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast({
        title: "Failed to add API key",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    },
  });

  // Mutation to delete an API key
  const deleteApiKeyMutation = useMutation({
    mutationFn: async (keyId: string) => {
      console.log("Deleting API key:", keyId);
      const { error } = await supabase
        .from("api_keys")
        .delete()
        .eq("id", keyId);

      if (error) {
        console.error("Error deleting API key:", error);
        throw new Error(error.message);
      }

      console.log("API key deleted successfully");
      return keyId;
    },
    onSuccess: (keyId) => {
      queryClient.invalidateQueries({ queryKey: ["apiKeys", user?.id] });
      toast({
        title: "API key deleted",
        description: "Your API key has been removed.",
      });
      // Remove from revealed keys if it was revealed
      if (revealedKeyIds.has(keyId)) {
        const newSet = new Set(revealedKeyIds);
        newSet.delete(keyId);
        setRevealedKeyIds(newSet);
      }
    },
    onError: (error) => {
      toast({
        title: "Failed to delete API key",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    },
  });

  // Handle adding a new API key
  const handleAddApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApiKey.name || !newApiKey.key_value) {
      toast({
        title: "Missing information",
        description: "Please provide both a name and an API key value.",
        variant: "destructive",
      });
      return;
    }
    addApiKeyMutation.mutate(newApiKey);
  };

  // Toggle revealing an API key
  const toggleRevealKey = (keyId: string) => {
    const newSet = new Set(revealedKeyIds);
    if (newSet.has(keyId)) {
      newSet.delete(keyId);
    } else {
      newSet.add(keyId);
      // Auto-hide after 30 seconds
      setTimeout(() => {
        setRevealedKeyIds((prev) => {
          const updated = new Set(prev);
          updated.delete(keyId);
          return updated;
        });
      }, 30000);
    }
    setRevealedKeyIds(newSet);
  };

  // Filter API keys based on search query
  const filteredApiKeys = apiKeys?.filter(
    (key) =>
      key.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (key.description && key.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isAuthLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-10">
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">API Vault</h1>
            <p className="text-muted-foreground mb-6">
              Please log in to access your secure API key storage.
            </p>
            <Button onClick={() => window.location.href = "/login"}>
              Log In to Continue
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">API Vault</h1>
              <p className="text-muted-foreground">
                Securely store and manage your API keys
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New API Key
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New API Key</DialogTitle>
                    <DialogDescription>
                      Store your API key securely. We encrypt your keys at rest.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddApiKey}>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input
                          id="name"
                          value={newApiKey.name}
                          onChange={(e) => setNewApiKey({ ...newApiKey, name: e.target.value })}
                          placeholder="e.g. OpenAI API Key"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">
                          Description (Optional)
                        </label>
                        <Textarea
                          id="description"
                          value={newApiKey.description}
                          onChange={(e) => setNewApiKey({ ...newApiKey, description: e.target.value })}
                          placeholder="What is this API key used for?"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="key_value" className="text-sm font-medium">
                          API Key Value
                        </label>
                        <Input
                          id="key_value"
                          value={newApiKey.key_value}
                          onChange={(e) => setNewApiKey({ ...newApiKey, key_value: e.target.value })}
                          placeholder="sk_live_..."
                          type="password"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" type="button" onClick={() => setShowAddDialog(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={addApiKeyMutation.isPending}>
                        {addApiKeyMutation.isPending ? (
                          <>
                            <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Saving...
                          </>
                        ) : (
                          "Save API Key"
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search your API keys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* API Keys List */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-9 w-20 mr-2" />
                    <Skeleton className="h-9 w-20" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : isError ? (
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive">Error Loading API Keys</CardTitle>
                <CardDescription>
                  {error instanceof Error ? error.message : "An unknown error occurred"}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" onClick={() => queryClient.invalidateQueries({ queryKey: ["apiKeys", user?.id] })}>
                  Retry
                </Button>
              </CardFooter>
            </Card>
          ) : filteredApiKeys && filteredApiKeys.length > 0 ? (
            <div className="space-y-4">
              {filteredApiKeys.map((apiKey) => (
                <Card key={apiKey.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center">
                          <Key className="h-4 w-4 mr-2 text-primary" />
                          {apiKey.name}
                        </CardTitle>
                        {apiKey.description && (
                          <CardDescription className="mt-1">
                            {apiKey.description}
                          </CardDescription>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Shield className="h-3 w-3 mr-1" />
                        <span>
                          {new Date(apiKey.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="p-3 bg-muted rounded-md flex items-center justify-between">
                      <div className="font-mono text-sm truncate max-w-[calc(100%-80px)]">
                        {revealedKeyIds.has(apiKey.id)
                          ? apiKey.key_value
                          : "•".repeat(Math.min(20, apiKey.key_value.length))}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRevealKey(apiKey.id)}
                        title={revealedKeyIds.has(apiKey.id) ? "Hide API Key" : "Reveal API Key"}
                      >
                        {revealedKeyIds.has(apiKey.id) ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. The API key will be permanently deleted from your vault.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteApiKeyMutation.mutate(apiKey.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No API Keys Found</CardTitle>
                <CardDescription>
                  {searchQuery
                    ? "No API keys match your search query."
                    : "You haven't added any API keys yet."}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                {searchQuery ? (
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                ) : (
                  <Button onClick={() => setShowAddDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First API Key
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ApiVault;
