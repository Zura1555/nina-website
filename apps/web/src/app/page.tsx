import { HomeContent } from "@/components/HomeContent";
import { getFeaturedProjects, getLatestPosts } from "@/sanity/queries";

export const metadata = {
  title: "Nina's Personal Website",
  description: "Personal brand, projects, and blog by Nina",
};

export default async function Home() {
  const [featuredProjects, latestPosts] = await Promise.all([
    getFeaturedProjects(),
    getLatestPosts(),
  ]);

  return <HomeContent featuredProjects={featuredProjects} latestPosts={latestPosts} />;
}
