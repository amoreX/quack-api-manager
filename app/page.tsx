"use client";
import { updateApiKeys, retrieveApiKeys, toggleKey } from "@/lib/api-key";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Plus, Key } from "lucide-react";
import type { ApiKey } from "@/lib/apikey.models";

export default function Home() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<
    "gemini" | "claude" | "openai"
  >("gemini");
  const [newApiKey, setNewApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [showKeys, setShowKeys] = useState<Record<number, boolean>>({});

  const providers = [
    { value: "gemini", label: "Gemini" },
    { value: "claude", label: "Claude" },
    { value: "openai", label: "OpenAI" },
  ];

  // Load API keys for selected provider
  useEffect(() => {
    loadApiKeys();
  }, [selectedProvider]);

  const loadApiKeys = async () => {
    try {
      setLoading(true);
      const keys = await retrieveApiKeys(selectedProvider);
      setApiKeys(keys);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddApiKey = async () => {
    if (!newApiKey.trim()) {
      return;
    }

    try {
      setLoading(true);
      await updateApiKeys(selectedProvider, newApiKey);
      setNewApiKey("");
      await loadApiKeys();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleKey = async (keyId: number, currentStatus: boolean) => {
    try {
      const newStatus = await toggleKey(keyId, !currentStatus);
      setApiKeys((keys) =>
        keys.map((key) =>
          key.id === keyId ? { ...key, active: newStatus } : key,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const toggleKeyVisibility = (keyId: number) => {
    setShowKeys((prev) => ({
      ...prev,
      [keyId]: !prev[keyId],
    }));
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return (
      key.substring(0, 4) +
      "•".repeat(key.length - 8) +
      key.substring(key.length - 4)
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <Key className="h-6 w-6" />
        <h1 className="text-2xl font-bold">API Key Management</h1>
      </div>

      {/* Add New API Key */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New API Key</CardTitle>
          <CardDescription>
            Add a new API key for your selected provider
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Select
                value={selectedProvider}
                onValueChange={(value: "gemini" | "claude" | "openai") =>
                  setSelectedProvider(value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((provider) => (
                    <SelectItem key={provider.value} value={provider.value}>
                      {provider.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="apikey">API Key</Label>
              <div className="flex gap-2">
                <Input
                  id="apikey"
                  type="password"
                  placeholder="Enter your API key"
                  value={newApiKey}
                  onChange={(e) => setNewApiKey(e.target.value)}
                  disabled={loading}
                />
                <Button
                  onClick={handleAddApiKey}
                  disabled={loading || !newApiKey.trim()}
                  className="shrink-0"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Key
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Existing API Keys */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Existing API Keys</span>
            <Badge variant="secondary">
              {selectedProvider.charAt(0).toUpperCase() +
                selectedProvider.slice(1)}
            </Badge>
          </CardTitle>
          <CardDescription>
            Manage your existing API keys for {selectedProvider}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : apiKeys.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Key className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No API keys found for {selectedProvider}</p>
              <p className="text-sm">Add your first API key above</p>
            </div>
          ) : (
            <div className="space-y-4">
              {apiKeys.map((key, index) => (
                <div key={key.id}>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">
                          {showKeys[key.id]
                            ? key.api_key
                            : maskApiKey(key.api_key)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleKeyVisibility(key.id)}
                        >
                          {showKeys[key.id] ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Created: {new Date(key.created_at).toLocaleDateString()}
                        {key.updated_at !== key.created_at && (
                          <span className="ml-2">
                            • Updated:{" "}
                            {new Date(key.updated_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`toggle-${key.id}`} className="text-sm">
                          {key.active ? "Active" : "Inactive"}
                        </Label>
                        <Switch
                          id={`toggle-${key.id}`}
                          checked={key.active}
                          onCheckedChange={() =>
                            handleToggleKey(key.id, key.active)
                          }
                        />
                      </div>
                      <Badge variant={key.active ? "default" : "secondary"}>
                        {key.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                  {index < apiKeys.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
