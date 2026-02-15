// Read token for draft mode and preview
export const token = process.env.SANITY_API_READ_TOKEN

// Only throw at runtime, not during build
export function getToken(): string {
  if (!token) {
    throw new Error('Missing SANITY_API_READ_TOKEN environment variable')
  }
  return token
}
