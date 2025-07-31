const assistantId = process.env.ASSISTANT_ID;

if (!assistantId) {
  throw new Error("Missing Assistant ID — set ASSISTANT_ID in your environment variables.");
}

export { assistantId };
