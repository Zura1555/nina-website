import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";

interface Post {
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
  body: any[];
  author: {
    name: string;
    image: any;
  };
}

// Fetch single post
async function getPost(slug: string) {
  return client.fetch<Post>(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      slug,
      mainImage,
      publishedAt,
      body,
      author->{name, image}
    }`,
    { slug }
  );
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(600).url()
    : null;

  return (
    <article className="min-h-screen">
      <Container className="max-w-4xl pt-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          ← Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            {post.author?.image && (
              <img
                src={urlFor(post.author.image).width(100).height(100).url()}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border border-border"
              />
            )}
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">
                {post.author?.name}
              </span>
              <span>•</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </header>
      </Container>

      {/* Cover Image */}
      {imageUrl && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-[300px] md:h-[500px] mb-8"
        >
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      <Container className="max-w-4xl">
        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} />
        </div>

        {/* Tags/_categories could go here */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Blog</Badge>
            <Badge variant="outline">{new Date(post.publishedAt).getFullYear()}</Badge>
          </div>
        </div>
      </Container>
    </article>
  );
}
