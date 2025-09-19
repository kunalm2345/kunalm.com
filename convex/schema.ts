import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  pages: defineTable({
    path: v.string(),
    content: v.string(),
    updatedAt: v.number(),
  }).index("by_path", ["path"]),
  
  pageHistory: defineTable({
    path: v.string(),
    content: v.string(),
    timestamp: v.number(),
  }).index("by_path", ["path"]),
});