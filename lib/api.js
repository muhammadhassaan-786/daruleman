// lib/api.js - Client-side API helpers
// Use these functions in your page components to fetch and add data

export const api = {
  // Audio Bayanat
  audiobayanat: {
    async getAll() {
      const res = await fetch("/api/audiobayanat");
      if (!res.ok) throw new Error("Failed to fetch audio bayanat");
      return res.json();
    },
    async add(data) {
      const res = await fetch("/api/audiobayanat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add audio bayanat");
      return res.json();
    },
  },

  // Hamdonaat
  hamdonaatokalaam: {
    async getAll() {
      const res = await fetch("/api/hamdonaatokalaam");
      if (!res.ok) throw new Error("Failed to fetch hamdonaatokalaam");
      return res.json();
    },
    async add(data) {
      const res = await fetch("/api/hamdonaatokalaam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add hamdonaatokalaam");
      return res.json();
    },
  },

  // Poems
  poems: {
    async getAll() {
      const res = await fetch("/api/poems");
      if (!res.ok) throw new Error("Failed to fetch poems");
      return res.json();
    },
    async add(data) {
      const res = await fetch("/api/poems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add poem");
      return res.json();
    },
  },

  // Quotes
  quotes: {
    async getAll() {
      const res = await fetch("/api/quotes");
      if (!res.ok) throw new Error("Failed to fetch quotes");
      return res.json();
    },
    async add(data) {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add quote");
      return res.json();
    },
  },
};
