import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { History, RotateCcw, Trash2, Save, Loader2 } from "lucide-react";
import { projectId, publicAnonKey } from "../../../../utils/supabase/info";
import { useTheme, ThemeConfig } from "./ThemeProvider";
import { toast } from "sonner";
import { Input } from "../ui/input";

interface Backup {
    id: string;
    timestamp: number;
    name: string;
    config: ThemeConfig;
}

export const HistoryModal = () => {
    const { config, setConfig } = useTheme();
    const [backups, setBackups] = useState<Backup[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [newBackupName, setNewBackupName] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-8c33ff94/backups`;

    const fetchBackups = async () => {
        setIsLoading(true);
        try {
            // Check if Supabase is configured
            if (!projectId || projectId === 'your-project-id' || !publicAnonKey || publicAnonKey === 'your-anon-key') {
                console.warn('Supabase not configured. Skipping backups fetch.');
                setBackups([]);
                setIsLoading(false);
                return;
            }
            
            const res = await fetch(API_URL, {
                headers: {
                    "Authorization": `Bearer ${publicAnonKey}`
                }
            });
            if (!res.ok) throw new Error("Failed to fetch backups");
            const data = await res.json();
            setBackups(data);
        } catch (error) {
            console.error(error);
            // Don't show error toast if Supabase is not configured
            if (projectId !== 'your-project-id') {
                toast.error("Failed to load history");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchBackups();
        }
    }, [isOpen]);

    const handleSave = async () => {
        if (!newBackupName.trim()) {
            toast.error("Please enter a name");
            return;
        }
        
        // Check if Supabase is configured
        if (!projectId || projectId === 'your-project-id' || !publicAnonKey || publicAnonKey === 'your-anon-key') {
            toast.error('Supabase is not configured. Please set up your Supabase credentials to save backups.');
            return;
        }
        
        setIsSaving(true);
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${publicAnonKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: newBackupName,
                    config: config
                })
            });
            if (!res.ok) throw new Error("Failed to save backup");
            const newBackup = await res.json();
            setBackups([newBackup, ...backups]);
            setNewBackupName("");
            toast.success("Backup saved");
        } catch (error) {
            console.error(error);
            toast.error("Failed to save backup");
        } finally {
            setIsSaving(false);
        }
    };

    const handleRestore = (backup: Backup) => {
        setConfig(backup.config);
        toast.success(`Restored "${backup.name}"`);
        setIsOpen(false);
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const res = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${publicAnonKey}`
                }
            });
            if (!res.ok) throw new Error("Failed to delete backup");
            setBackups(backups.filter(b => b.id !== id));
            toast.success("Backup deleted");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete backup");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground shrink-0 transition-colors" title="History & Backups">
                    <History className="h-4 w-4" />
                    <span className="sr-only">History</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Version History</DialogTitle>
                    <DialogDescription>
                        Save snapshots of your design system configuration or restore previous versions.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex gap-2 py-4">
                    <Input 
                        placeholder="Version Name (e.g. 'Dark Mode V1')" 
                        value={newBackupName}
                        onChange={(e) => setNewBackupName(e.target.value)}
                    />
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    </Button>
                </div>

                <div className="space-y-4">
                    <h4 className="text-sm font-medium leading-none">Previous Versions</h4>
                    <ScrollArea className="h-[300px] border rounded-md p-4">
                        {isLoading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            </div>
                        ) : backups.length === 0 ? (
                            <div className="text-center py-8 text-sm text-muted-foreground">
                                No backups found.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {backups.map((backup) => (
                                    <div 
                                        key={backup.id} 
                                        className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group cursor-pointer"
                                        onClick={() => handleRestore(backup)}
                                    >
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">{backup.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(backup.timestamp).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                             <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); handleRestore(backup); }}>
                                                <RotateCcw className="h-3 w-3" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={(e) => handleDelete(backup.id, e)}>
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
};