import { client } from "@/sanity/client";
import PageBuilder from "@/components/PageBuilder";
import type { PageSection } from "@/types/sanity";
import { notFound } from "next/navigation";

interface GenericPageData {
    title: string;
    pageBuilder: PageSection[];
}

const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  title,
  pageBuilder
}`;

export default async function GenericPage({ params }: { params: { slug: string } }) {
    const { slug } = await params; // Next.js 15+ param handling
    const page = await client.fetch<GenericPageData>(PAGE_QUERY, { slug });

    if (!page) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
            <PageBuilder blocks={page.pageBuilder} />
        </main>
    );
}
