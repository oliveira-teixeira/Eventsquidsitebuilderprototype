import React, { useState, useEffect } from "react";
import { 
    Plus, 
    Trash2, 
    Settings, 
    Edit2, 
    Database, 
    Image as ImageIcon,
    Type,
    List,
    MoreVertical,
    ArrowLeft,
    Save
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cmsClient, CMSCollection, CMSField, CMSItem } from "./client";

export const CMSPanel = () => {
    const [collections, setCollections] = useState<CMSCollection[]>([]);
    const [selectedCollection, setSelectedCollection] = useState<CMSCollection | null>(null);
    const [items, setItems] = useState<CMSItem[]>([]);
    const [view, setView] = useState<'list' | 'edit-schema' | 'edit-item'>('list');
    const [editingItem, setEditingItem] = useState<CMSItem | null>(null);
    const [loading, setLoading] = useState(false);

    // Initial Load
    useEffect(() => {
        loadCollections();
    }, []);

    // Load items when collection changes
    useEffect(() => {
        if (selectedCollection) {
            loadItems(selectedCollection.id);
        } else {
            setItems([]);
        }
    }, [selectedCollection]);

    const loadCollections = async () => {
        setLoading(true);
        try {
            const data = await cmsClient.getCollections();
            setCollections(data);
        } catch (e) {
            toast.error("Failed to load collections");
        } finally {
            setLoading(false);
        }
    };

    const loadItems = async (colId: string) => {
        setLoading(true);
        try {
            const data = await cmsClient.getItems(colId);
            setItems(data);
        } catch (e) {
            toast.error("Failed to load items");
        } finally {
            setLoading(false);
        }
    };

    // --- Actions ---

    const handleCreateCollection = async (name: string) => {
        try {
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const newCol = await cmsClient.saveCollection({
                name,
                slug,
                fields: [
                    { id: 'f1', name: 'Title', key: 'title', type: 'text' },
                    { id: 'f2', name: 'Description', key: 'description', type: 'rich-text' }
                ]
            });
            setCollections([...collections, newCol]);
            setSelectedCollection(newCol);
            toast.success("Collection created");
        } catch (e) {
            toast.error("Error creating collection");
        }
    };

    const handleDeleteCollection = async (id: string) => {
        if (!confirm("Are you sure? This will delete all items in this collection.")) return;
        try {
            await cmsClient.deleteCollection(id);
            setCollections(collections.filter(c => c.id !== id));
            if (selectedCollection && selectedCollection.id === id) {
                setSelectedCollection(null);
                setView('list');
            }
            toast.success("Collection deleted");
        } catch (e) {
            toast.error("Error deleting collection");
        }
    };

    const handleSaveSchema = async (collection: CMSCollection) => {
        try {
            const updated = await cmsClient.saveCollection(collection);
            setCollections(collections.map(c => c.id === updated.id ? updated : c));
            setSelectedCollection(updated);
            setView('list');
            toast.success("Schema updated");
        } catch (e) {
            toast.error("Error updating schema");
        }
    };

    const handleSaveItem = async (data: any) => {
        if (!selectedCollection) return;
        try {
            const saved = await cmsClient.saveItem(selectedCollection.id, {
                ...editingItem,
                ...data
            });
            if (editingItem) {
                setItems(items.map(i => i.id === saved.id ? saved : i));
            } else {
                setItems([...items, saved]);
            }
            setView('list');
            setEditingItem(null);
            toast.success("Item saved");
        } catch (e) {
            toast.error("Error saving item");
        }
    };

    const handleDeleteItem = async (itemId: string) => {
        if (!selectedCollection) return;
        if (!confirm("Delete this item?")) return;
        try {
            await cmsClient.deleteItem(selectedCollection.id, itemId);
            setItems(items.filter(i => i.id !== itemId));
            toast.success("Item deleted");
        } catch (e) {
            toast.error("Error deleting item");
        }
    };

    // --- Sub-Components ---

    const SchemaEditor = ({ collection, onSave, onCancel }: { collection: CMSCollection, onSave: (c: CMSCollection) => void, onCancel: () => void }) => {
        const [fields, setFields] = useState<CMSField[]>(collection.fields || []);
        const [name, setName] = useState(collection.name);

        const addField = () => {
            setFields([...fields, { 
                id: Math.random().toString(36).substr(2, 9), 
                name: 'New Field', 
                key: 'field_' + fields.length, 
                type: 'text' 
            }]);
        };

        const updateField = (index: number, updates: Partial<CMSField>) => {
            const newFields = [...fields];
            newFields[index] = { ...newFields[index], ...updates };
            setFields(newFields);
        };

        const removeField = (index: number) => {
            setFields(fields.filter((_, i) => i !== index));
        };

        return (
            <div className="p-6 max-w-4xl mx-auto space-y-8">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="icon" onClick={onCancel}>
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <h2 className="text-2xl font-bold">Edit Schema: {collection.name}</h2>
                </div>

                <div className="space-y-4 max-w-md">
                    <div className="grid gap-2">
                        <Label>Collection Name</Label>
                        <Input value={name} onChange={e => setName(e.target.value)} />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Fields</h3>
                        <Button onClick={addField} variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-2" /> Add Field
                        </Button>
                    </div>

                    <div className="border rounded-lg divide-y">
                        {fields.map((field, idx) => (
                            <div key={field.id} className="p-4 flex items-center gap-4 bg-card">
                                <div className="grid gap-1 flex-1">
                                    <Label className="text-xs text-muted-foreground">Display Name</Label>
                                    <Input 
                                        value={field.name} 
                                        onChange={e => updateField(idx, { name: e.target.value })} 
                                    />
                                </div>
                                <div className="grid gap-1 flex-1">
                                    <Label className="text-xs text-muted-foreground">Field Key (API)</Label>
                                    <Input 
                                        value={field.key} 
                                        onChange={e => updateField(idx, { key: e.target.value.replace(/[^a-z0-9_]/g, '') })} 
                                        className="font-mono"
                                    />
                                </div>
                                <div className="grid gap-1 w-[150px]">
                                    <Label className="text-xs text-muted-foreground">Type</Label>
                                    <Select 
                                        value={field.type} 
                                        onValueChange={v => updateField(idx, { type: v as any })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="text">Text</SelectItem>
                                            <SelectItem value="rich-text">Rich Text</SelectItem>
                                            <SelectItem value="image">Image</SelectItem>
                                            <SelectItem value="date">Date</SelectItem>
                                            <SelectItem value="number">Number</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="pt-5">
                                    <Button variant="ghost" size="icon" onClick={() => removeField(idx)}>
                                        <Trash2 className="w-4 h-4 text-destructive" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                        {fields.length === 0 && (
                            <div className="p-8 text-center text-muted-foreground">
                                No fields defined. Add one to get started.
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-8">
                    <Button variant="outline" onClick={onCancel}>Cancel</Button>
                    <Button onClick={() => onSave({ ...collection, name, fields })}>
                        Save Changes
                    </Button>
                </div>
            </div>
        );
    };

    const ItemEditor = ({ collection, item, onSave, onCancel }: { collection: CMSCollection, item: CMSItem | null, onSave: (data: any) => void, onCancel: () => void }) => {
        const [formData, setFormData] = useState<any>(item || {});

        const handleChange = (key: string, value: any) => {
            setFormData({ ...formData, [key]: value });
        };

        return (
            <div className="p-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="icon" onClick={onCancel}>
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <h2 className="text-2xl font-bold">{item ? 'Edit Item' : 'New Item'}</h2>
                </div>

                <div className="space-y-6">
                    {collection.fields.map(field => (
                        <div key={field.id} className="space-y-2">
                            <Label>{field.name}</Label>
                            {field.type === 'text' && (
                                <Input 
                                    value={formData[field.key] || ''} 
                                    onChange={e => handleChange(field.key, e.target.value)} 
                                />
                            )}
                            {field.type === 'number' && (
                                <Input 
                                    type="number"
                                    value={formData[field.key] || ''} 
                                    onChange={e => handleChange(field.key, e.target.value)} 
                                />
                            )}
                            {field.type === 'rich-text' && (
                                <textarea 
                                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData[field.key] || ''}
                                    onChange={e => handleChange(field.key, e.target.value)}
                                />
                            )}
                            {field.type === 'image' && (
                                <div className="flex gap-2">
                                    <Input 
                                        value={formData[field.key] || ''} 
                                        onChange={e => handleChange(field.key, e.target.value)} 
                                        placeholder="https://..."
                                    />
                                    {formData[field.key] && (
                                        <div className="w-10 h-10 rounded overflow-hidden bg-muted border border-border">
                                            <img src={formData[field.key]} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            )}
                            {field.type === 'date' && (
                                <Input 
                                    type="date"
                                    value={formData[field.key] || ''} 
                                    onChange={e => handleChange(field.key, e.target.value)} 
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-4 pt-8">
                    <Button variant="outline" onClick={onCancel}>Cancel</Button>
                    <Button onClick={() => onSave(formData)}>
                        Save Item
                    </Button>
                </div>
            </div>
        );
    };

    // --- Main Render ---

    if (view === 'edit-schema' && selectedCollection) {
        return <SchemaEditor collection={selectedCollection} onSave={handleSaveSchema} onCancel={() => setView('list')} />;
    }

    if (view === 'edit-item' && selectedCollection) {
        return <ItemEditor collection={selectedCollection} item={editingItem} onSave={handleSaveItem} onCancel={() => setView('list')} />;
    }

    return (
        <div className="flex h-full w-full bg-background text-foreground">
            {/* Sidebar */}
            <div className="w-64 border-r border-border bg-muted/10 flex flex-col">
                <div className="p-4 border-b border-border flex items-center justify-between">
                    <span className="font-bold flex items-center gap-2">
                        <Database className="w-4 h-4" /> CMS
                    </span>
                    <NewCollectionDialog onCreate={handleCreateCollection} />
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {collections.map(col => (
                        <div 
                            key={col.id}
                            className={cn(
                                "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors text-sm font-medium",
                                (selectedCollection && selectedCollection.id === col.id) ? "bg-primary/10 text-primary" : "hover:bg-muted"
                            )}
                            onClick={() => setSelectedCollection(col)}
                        >
                            <span className="truncate">{col.name}</span>
                            <div className="flex items-center opacity-0 group-hover:opacity-100">
                                {/* Actions could go here */}
                            </div>
                        </div>
                    ))}
                    {collections.length === 0 && !loading && (
                        <div className="text-xs text-muted-foreground text-center py-8 px-4">
                            No collections yet. Create one to start managing content.
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {selectedCollection ? (
                    <>
                        <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-background">
                            <div className="flex items-center gap-4">
                                <h1 className="text-xl font-bold">{selectedCollection.name}</h1>
                                <Button variant="ghost" size="sm" onClick={() => setView('edit-schema')} className="text-muted-foreground">
                                    <Settings className="w-4 h-4 mr-2" /> Schema
                                </Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteCollection(selectedCollection.id)}>
                                    <Trash2 className="w-4 h-4 mr-2" /> Delete Collection
                                </Button>
                                <Button onClick={() => { setEditingItem(null); setView('edit-item'); }}>
                                    <Plus className="w-4 h-4 mr-2" /> New Item
                                </Button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-auto p-6">
                            <div className="rounded-md border border-border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {selectedCollection.fields.slice(0, 4).map(field => (
                                                <TableHead key={field.id}>{field.name}</TableHead>
                                            ))}
                                            <TableHead className="w-[100px]"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {items.map(item => (
                                            <TableRow key={item.id}>
                                                {selectedCollection.fields.slice(0, 4).map(field => (
                                                    <TableCell key={field.id} className="max-w-[200px] truncate">
                                                        {field.type === 'image' && item[field.key] ? (
                                                            <div className="w-8 h-8 rounded bg-muted overflow-hidden">
                                                                <img src={item[field.key]} className="w-full h-full object-cover" />
                                                            </div>
                                                        ) : (
                                                            item[field.key]
                                                        )}
                                                    </TableCell>
                                                ))}
                                                <TableCell>
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button variant="ghost" size="icon" onClick={() => { setEditingItem(item); setView('edit-item'); }}>
                                                            <Edit2 className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)}>
                                                            <Trash2 className="w-4 h-4 text-destructive/70" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {items.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={selectedCollection.fields.length + 1} className="h-24 text-center text-muted-foreground">
                                                    No items found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                        <Database className="w-12 h-12 mb-4 opacity-20" />
                        <p>Select a collection to manage content</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const NewCollectionDialog = ({ onCreate }: { onCreate: (name: string) => void }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    const handleCreate = () => {
        if (!name) return;
        onCreate(name);
        setOpen(false);
        setName("");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Plus className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Collection</DialogTitle>
                    <DialogDescription>
                        Give your collection a name (e.g., "Blog Posts", "Speakers").
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Label>Name</Label>
                    <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Speakers" />
                </div>
                <DialogFooter>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};