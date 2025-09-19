import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAllPages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("pages").collect();
  },
});

export const getPageContent = query({
  args: { path: v.string() },
  handler: async (ctx, args) => {
    const page = await ctx.db
      .query("pages")
      .withIndex("by_path", (q) => q.eq("path", args.path))
      .first();
    return page?.content || null;
  },
});

export const getPage = query({
  args: { path: v.string() },
  handler: async (ctx, args) => {
    const page = await ctx.db
      .query("pages")
      .withIndex("by_path", (q) => q.eq("path", args.path))
      .first();
    return page;
  },
});

export const getPageHistory = query({
  args: { path: v.string() },
  handler: async (ctx, args) => {
    const history = await ctx.db
      .query("pageHistory")
      .withIndex("by_path", (q) => q.eq("path", args.path))
      .order("desc")
      .take(10); // Last 10 edits
    return history;
  },
});

export const savePageContent = mutation({
  args: {
    path: v.string(),
    content: v.string()
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Get current content to save to history
    const currentPage = await ctx.db
      .query("pages")
      .withIndex("by_path", (q) => q.eq("path", args.path))
      .first();

    // Save current content to history before updating
    if (currentPage) {
      await ctx.db.insert("pageHistory", {
        path: args.path,
        content: currentPage.content,
        timestamp: currentPage.updatedAt,
      });
    }

    // Update or insert the current page
    if (currentPage) {
      await ctx.db.patch(currentPage._id, {
        content: args.content,
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("pages", {
        path: args.path,
        content: args.content,
        updatedAt: now,
      });
    }

    return { success: true };
  },
});

export const deletePage = mutation({
  args: {
    path: v.string()
  },
  handler: async (ctx, args) => {
    // Get the page to delete
    const pageToDelete = await ctx.db
      .query("pages")
      .withIndex("by_path", (q) => q.eq("path", args.path))
      .first();

    if (!pageToDelete) {
      throw new Error("Page not found");
    }

    // Delete the page
    await ctx.db.delete(pageToDelete._id);

    // Optionally, you could also delete the history entries for this page
    // const historyEntries = await ctx.db
    //   .query("pageHistory")
    //   .withIndex("by_path", (q) => q.eq("path", args.path))
    //   .collect();
    //
    // for (const entry of historyEntries) {
    //   await ctx.db.delete(entry._id);
    // }

    return { success: true };
  },
});