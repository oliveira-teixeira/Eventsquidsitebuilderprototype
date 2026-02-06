import React, { useState } from "react";
import {
  Plus,
  Search,
  UserPlus,
  Upload,
  MoreHorizontal,
  Trash2,
  Edit,
  Users,
  Tag,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { cn } from "../ui/utils";
import { mockContacts, mockGroups } from "./mock-data";
import type { Contact, Group } from "./types";

export function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [showAddContact, setShowAddContact] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [activeTab, setActiveTab] = useState("contacts");

  // Add contact form
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newGroups, setNewGroups] = useState<string[]>([]);

  // Add group form
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupColor, setNewGroupColor] = useState("#2563eb");

  const groupColors = [
    "#2563eb", "#ec4899", "#f59e0b", "#10b981", "#8b5cf6",
    "#ef4444", "#06b6d4", "#f97316", "#6366f1", "#14b8a6",
  ];

  const resetContactForm = () => {
    setNewName("");
    setNewPhone("");
    setNewEmail("");
    setNewGroups([]);
  };

  const handleAddContact = () => {
    const contact: Contact = {
      id: `c${Date.now()}`,
      name: newName,
      phone: newPhone,
      email: newEmail || undefined,
      groups: newGroups,
      addedAt: new Date().toISOString().split("T")[0],
    };
    setContacts((prev) => [...prev, contact]);

    // Update group contact lists
    setGroups((prev) =>
      prev.map((g) =>
        newGroups.includes(g.id)
          ? { ...g, contactIds: [...g.contactIds, contact.id] }
          : g
      )
    );

    setShowAddContact(false);
    resetContactForm();
  };

  const handleAddGroup = () => {
    const group: Group = {
      id: `g${Date.now()}`,
      name: newGroupName,
      color: newGroupColor,
      contactIds: [],
    };
    setGroups((prev) => [...prev, group]);
    setShowAddGroup(false);
    setNewGroupName("");
    setNewGroupColor("#2563eb");
  };

  const handleDeleteContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setGroups((prev) =>
      prev.map((g) => ({
        ...g,
        contactIds: g.contactIds.filter((cid) => cid !== id),
      }))
    );
  };

  const handleDeleteGroup = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
    setContacts((prev) =>
      prev.map((c) => ({
        ...c,
        groups: c.groups.filter((gid) => gid !== id),
      }))
    );
  };

  const filteredContacts = contacts.filter((c) => {
    if (
      searchQuery &&
      !c.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !c.phone.includes(searchQuery)
    )
      return false;
    if (selectedGroup && !c.groups.includes(selectedGroup)) return false;
    return true;
  });

  const toggleNewGroup = (groupId: string) => {
    setNewGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((g) => g !== groupId)
        : [...prev, groupId]
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Contacts & Groups</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your guest list and organize them into groups
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Import CSV
          </Button>
          <Button onClick={() => setShowAddContact(true)} className="gap-2">
            <UserPlus className="w-4 h-4" />
            Add Guest
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="contacts">
            Contacts ({contacts.length})
          </TabsTrigger>
          <TabsTrigger value="groups">
            Groups ({groups.length})
          </TabsTrigger>
        </TabsList>

        {/* Contacts Tab */}
        <TabsContent value="contacts">
          <div className="space-y-4 mt-4">
            {/* Search & Filter */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or phone..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <Button
                  variant={selectedGroup === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGroup(null)}
                >
                  All
                </Button>
                {groups.map((g) => (
                  <Button
                    key={g.id}
                    variant={selectedGroup === g.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedGroup(g.id)}
                    style={
                      selectedGroup === g.id
                        ? { backgroundColor: g.color, borderColor: g.color }
                        : { borderColor: g.color, color: g.color }
                    }
                  >
                    {g.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Contacts List */}
            <div className="space-y-2">
              {filteredContacts.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Users className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                    <p className="text-muted-foreground">No contacts found</p>
                    <Button
                      variant="outline"
                      className="mt-4 gap-2"
                      onClick={() => setShowAddContact(true)}
                    >
                      <UserPlus className="w-4 h-4" />
                      Add your first guest
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredContacts.map((contact) => {
                  const contactGroups = contact.groups
                    .map((gid) => groups.find((g) => g.id === gid))
                    .filter(Boolean);
                  return (
                    <div
                      key={contact.id}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary shrink-0">
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{contact.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{contact.phone}</span>
                          {contact.email && (
                            <>
                              <span className="text-border">|</span>
                              <span>{contact.email}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        {contactGroups.map((g) => (
                          <Badge
                            key={g!.id}
                            variant="outline"
                            className="text-[10px] px-1.5 py-0"
                            style={{ borderColor: g!.color, color: g!.color }}
                          >
                            {g!.name}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive shrink-0"
                        onClick={() => handleDeleteContact(contact.id)}
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </TabsContent>

        {/* Groups Tab */}
        <TabsContent value="groups">
          <div className="space-y-4 mt-4">
            <div className="flex justify-end">
              <Button onClick={() => setShowAddGroup(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                New Group
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {groups.map((group) => {
                const memberCount = group.contactIds.length;
                const members = group.contactIds
                  .map((cid) => contacts.find((c) => c.id === cid))
                  .filter(Boolean);
                return (
                  <Card key={group.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: group.color }}
                          />
                          <CardTitle className="text-base">{group.name}</CardTitle>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="secondary">{memberCount} members</Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteGroup(group.id)}
                            title="Delete group"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        {members.slice(0, 6).map((m) => (
                          <div
                            key={m!.id}
                            className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium"
                            title={m!.name}
                          >
                            {m!.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        ))}
                        {memberCount > 6 && (
                          <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium text-muted-foreground">
                            +{memberCount - 6}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Contact Dialog */}
      <Dialog open={showAddContact} onOpenChange={setShowAddContact}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Guest</DialogTitle>
            <DialogDescription>
              Add a new guest to your event contact list
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Name *</label>
              <Input
                placeholder="Full name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Phone *</label>
              <Input
                placeholder="(555) 123-4567"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <Input
                type="email"
                placeholder="email@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Groups</label>
              <div className="flex flex-wrap gap-2">
                {groups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => toggleNewGroup(group.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                      newGroups.includes(group.id)
                        ? "border-transparent text-white"
                        : "border-border text-muted-foreground hover:bg-accent"
                    )}
                    style={
                      newGroups.includes(group.id)
                        ? { backgroundColor: group.color }
                        : undefined
                    }
                  >
                    {group.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddContact(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddContact}
              disabled={!newName.trim() || !newPhone.trim()}
            >
              Add Guest
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Group Dialog */}
      <Dialog open={showAddGroup} onOpenChange={setShowAddGroup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Group</DialogTitle>
            <DialogDescription>
              Create a new group to organize your guests
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Group Name *</label>
              <Input
                placeholder="e.g., Bridal Party, VIP, Family"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Color</label>
              <div className="flex flex-wrap gap-2">
                {groupColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewGroupColor(color)}
                    className={cn(
                      "w-8 h-8 rounded-full transition-transform",
                      newGroupColor === color && "ring-2 ring-offset-2 ring-ring scale-110"
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddGroup(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddGroup}
              disabled={!newGroupName.trim()}
            >
              Create Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
