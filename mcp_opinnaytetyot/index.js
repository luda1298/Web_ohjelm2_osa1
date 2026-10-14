import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import mysql from "mysql2/promise";
import "dotenv/config";

// Creates Express application
const app = express();

app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function createMcpServer() {
  const server = new McpServer({
    name: "opinnaytetyot",
    version: "1.0.0",
  });

  // tool 1
  server.registerTool(
    "Hae_opinnaytetoiden_vaiheet_tietokannasta_lyhyesti",
    {
      title: "Hae_opinnaytetoiden_vaiheet_tietokannasta_lyhyesti",
      description: "Hakee opinnaytetöiden vaiheet tietokannasta lyhyesti",
      inputSchema: z.object({}),
    },
    async () => {
      const [rows] = await pool.query("SELECT vaihe FROM vaiheet;");

      if (rows.length === 0) {
        return {
          content: [{ type: "text", text: "Vaiheita ei löytynyt" }],
        };
      }

      const list = rows.map((r) => `- ${r.vaihe} `).join("\n");
      return { content: [{ type: "text", text: list }] };
    },
  );

  // tool 2
  server.registerTool(
    "Hae_vaiheen_selitys_tietokannasta",
    {
      title: "Hae_vaiheen_selitys_tietokannasta",
      description: "Hakee vaiheen selityksen tietokannasta",
      inputSchema: z.object({
        query: z.string().min(1).describe("Vaiheen nimi"),
      }),
    },
    async ({ query }) => {
      const like = `%${query}%`;

      const [rows] = await pool.query(
        "SELECT selitys FROM vaiheet WHERE vaihe LIKE ?;",
        [like],
      );

      if (rows.length === 0) {
        return {
          content: [{ type: "text", text: `ei löydy "${query}".` }],
        };
      }

      const list = rows.map((r) => `- ${r.selitys} `).join("\n");
      return { content: [{ type: "text", text: list }] };
    },
  );
  return server;
}

app.post("/", async (req, res) => {
  try {
    const server = createMcpServer();

    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error(error);
  }
});

app.listen(3000, () => {
  console.log("MCP server running at http://localhost:3000/");
});
