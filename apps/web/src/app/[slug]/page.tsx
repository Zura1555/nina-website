import { client } from "@/sanity/client";
import PageBuilder from "@/components/PageBuilder";
import { notFound } from "next/navigation";

interface Page {
    title: string;
    pageBuilder: any[];
}

const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  title,
  pageBuilder
}`;

export default async function GenericPage({ params }: { params: { slug: string } }) {
    const { slug } = await params; // Next.js 15+ param handling
    const page = await client.fetch<Page>(PAGE_QUERY, { slug });

    if (!page) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
            <PageBuilder blocks={page.pageBuilder} />
        </main>
    );
}
