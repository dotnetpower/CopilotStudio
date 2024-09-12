payload="{\"messages\":[{\"role\":\"system\",\"content\":[{\"type\":\"text\",\"text\":\"You are an AI assistant that helps people find information.\"}]}],\"temperature\":0.7,\"top_p\":0.95,\"max_tokens\":800}"
   curl "https://aoai-swedn.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-02-15-preview" \
  -H "Content-Type: application/json" \
  -H "api-key: eb599976c0e943ea9e742f12659cd4d0" \
  -d "$payload"
