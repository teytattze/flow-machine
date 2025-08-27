import { completable } from "@modelcontextprotocol/sdk/server/completable.js";
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const handler = createMcpHandler(
  async (server) => {
    // server.registerResource(
    //   "doc",
    //   new ResourceTemplate("docs://{docId}", { list: undefined }),
    //   {
    //     title: "Flow Machine document",
    //     description:
    //       "Document such as product requirement documentation, technical documentation, product requirement prompt documentation",
    //   },
    //   async (uri, { docId }) => ({
    //     contents: [
    //       {
    //         uri: uri.href,
    //         text: `The doc ID is ${docId}`,
    //         mimeType: "text/plain",
    //       },
    //     ],
    //   }),
    // );

    server.registerPrompt(
      "team-greeting",
      {
        title: "Team Greeting",
        description: "Generate a greeting for team members",
        argsSchema: {
          department: completable(z.string(), (value) => {
            // Department suggestions
            return ["engineering", "sales", "marketing", "support"].filter(
              (d) => d.startsWith(value),
            );
          }),
          name: completable(z.string(), (value, context) => {
            // Name suggestions based on selected department
            const department = context?.arguments?.["department"];
            if (department === "engineering") {
              return ["Alice", "Bob", "Charlie"].filter((n) =>
                n.startsWith(value),
              );
            } else if (department === "sales") {
              return ["David", "Eve", "Frank"].filter((n) =>
                n.startsWith(value),
              );
            } else if (department === "marketing") {
              return ["Grace", "Henry", "Iris"].filter((n) =>
                n.startsWith(value),
              );
            }
            return ["Guest"].filter((n) => n.startsWith(value));
          }),
        },
      },
      ({ department, name }) => ({
        messages: [
          {
            role: "assistant",
            content: {
              type: "text",
              text: `Hello ${name}, welcome to the ${department} team!`,
            },
          },
        ],
      }),
    );
    // server.registerTool(
    //   "get_doc",
    //   {
    //     title: "Retrieve doc",
    //     description:
    //       "Get documentation such as product requirement documentation, technical documentation and prompt documentation",
    //     inputSchema: {
    //       docId: z.string(),
    //     },
    //   },
    //   async ({ docId }) => ({
    //     content: [{ type: "text", text: `The doc ID is ${docId}` }],
    //   }),
    // );
  },
  {
    serverInfo: {
      name: "flow-machine",
      version: "0.0.0",
    },
    capabilities: {
      resources: {
        subscribe: true,
        listChanged: true,
      },
      prompts: {
        listChanged: true,
      },
    },
  },
  {
    basePath: "/api/v1/agents",
    verboseLogs: true,
    maxDuration: 60,
  },
);

export { handler as GET, handler as POST, handler as DELETE };
