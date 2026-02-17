import { draftMode } from "next/headers";
import { client } from "./client";
import { token } from "./token";

/**
 * Used to fetch data in Server Components, it will automatically enable draft mode
 * if the user is currently in draft mode.
 */
export async function sanityFetch<QueryResponse>({
    query,
    params = {},
    tags,
}: {
    query: string;
    params?: Record<string, unknown>;
    tags?: string[];
}) {
    const isDraftMode = (await draftMode()).isEnabled;

    if (isDraftMode && !token) {
        throw new Error(
            "The `SANITY_API_READ_TOKEN` environment variable is required."
        );
    }

    return client.fetch<QueryResponse>(query, params, {
        ...(isDraftMode && {
            token: token,
            perspective: "previewDrafts",
        }),
        next: {
            revalidate: isDraftMode ? 0 : 60, // 60 seconds revalidation for production
            tags,
        },
    });
}
