import { PageContent } from "@/components/PageContent";
import { getHomepage } from "@/sanity/queries";

export async function generateMetadata() {
  const homepage = await getHomepage();

  if (homepage?.seo?.metaTitle || homepage?.seo?.metaDescription) {
    return {
      title: homepage.seo.metaTitle || "Nina's Personal Website",
      description: homepage.seo.metaDescription || "Personal brand, projects, and blog by Nina",
    };
  }

  return {
    title: "Nina's Personal Website",
    description: "Personal brand, projects, and blog by Nina",
  };
}

export default async function Home() {
  const homepage = await getHomepage();

  if (homepage) {
    return <PageContent page={homepage} />;
  }

  // No homepage page created yet - show a simple message
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome</h1>
        <p className="text-muted-foreground mb-8">
          Create a Page document in Sanity with slug &quot;home&quot; to see your homepage.
        </p>
        <a
          href="/studio"
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Go to Sanity Studio
        </a>
      </div>
    </div>
  );
}
