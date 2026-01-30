import { projectId, publicAnonKey } from "../../../../utils/supabase/info";

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-8c33ff94/cms`;

const headers = {
    "Authorization": `Bearer ${publicAnonKey}`,
    "Content-Type": "application/json"
};

export interface CMSField {
    id: string;
    name: string;
    type: 'text' | 'rich-text' | 'image' | 'date' | 'number' | 'link';
    key: string;
}

export interface CMSCollection {
    id: string;
    name: string;
    slug: string;
    fields: CMSField[];
}

export interface CMSItem {
    id: string;
    collectionId: string;
    [key: string]: any;
}

export const cmsClient = {
    getCollections: async (): Promise<CMSCollection[]> => {
        const res = await fetch(`${BASE_URL}/collections`, { headers });
        if (!res.ok) throw new Error("Failed to fetch collections");
        return res.json();
    },

    saveCollection: async (collection: Partial<CMSCollection>): Promise<CMSCollection> => {
        const res = await fetch(`${BASE_URL}/collections`, {
            method: "POST",
            headers,
            body: JSON.stringify(collection)
        });
        if (!res.ok) throw new Error("Failed to save collection");
        return res.json();
    },

    deleteCollection: async (id: string): Promise<void> => {
        const res = await fetch(`${BASE_URL}/collections/${id}`, {
            method: "DELETE",
            headers
        });
        if (!res.ok) throw new Error("Failed to delete collection");
    },

    getItems: async (collectionId: string): Promise<CMSItem[]> => {
        const res = await fetch(`${BASE_URL}/items/${collectionId}`, { headers });
        if (!res.ok) throw new Error("Failed to fetch items");
        return res.json();
    },

    saveItem: async (collectionId: string, item: Partial<CMSItem>): Promise<CMSItem> => {
        const res = await fetch(`${BASE_URL}/items/${collectionId}`, {
            method: "POST",
            headers,
            body: JSON.stringify(item)
        });
        if (!res.ok) throw new Error("Failed to save item");
        return res.json();
    },

    deleteItem: async (collectionId: string, itemId: string): Promise<void> => {
        const res = await fetch(`${BASE_URL}/items/${collectionId}/${itemId}`, {
            method: "DELETE",
            headers
        });
        if (!res.ok) throw new Error("Failed to delete item");
    }
};
