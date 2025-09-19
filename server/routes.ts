import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add any API routes here if needed
  // All routes should be prefixed with /api

  const httpServer = createServer(app);

  return httpServer;
}
