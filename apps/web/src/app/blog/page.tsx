import Link from "next/link";
import { Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { urlFor } from "@/sanity/image";
import { client } from "@/sanity/client";
import { FadeIn } from "@/components/layout/FadeIn";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: any;
  publishedAt: string;
  tags?: string[];
}

const POSTS_QUERY = `*[_type == "post"]|order(publishedAt desc){
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  tags
}`;

export const metadata = {
  title: "Blog",
  description: "Thoughts, stories, and insights from Nina",
};

export default async function BlogIndex() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY);

  return (
    <>
      {/* Page Header */}
      <section className="py-8 md:py-16 lg:py-20 px-4">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Blog
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Thoughts, stories, and insights on career, life, and everything in between.
            </p>
          </div>
        </Container>
      </section>

      {/* Posts Grid */}
      <section className="py-8 md:py-12 px-4 bg-muted/30">
        <Container>
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <FadeIn key={post._id} delay={index * 0.1}>
                  <Link href={`/blog/${post.slug.current}`}>
                    <Card hoverable>
                      {/* Cover Image */}
                      <div className="aspect-[16/10] bg-gradient-to-br from-primary-lighter to-muted flex items-center justify-center relative overflow-hidden">
                        {post.mainImage ? (
                          <img
                            src={urlFor(post.mainImage).width(800).height(500).url()}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-5xl">✍️</span>
                        )}
                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="absolute bottom-3 left-3 flex gap-2">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <CardContent>
                        {/* Meta */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        {/* Title */}
                        <h2 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                          {post.title}
                        </h2>
                        {/* Excerpt */}
                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No posts found.</p>
              <Link
                href="/studio"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Create your first post in Sanity Studio
              </Link>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
