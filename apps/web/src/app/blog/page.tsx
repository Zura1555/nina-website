import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
}

const POSTS_QUERY = `*[_type == "post"]|order(publishedAt desc){
  _id,
  title,
  slug,
  mainImage,
  publishedAt
}`;

export default async function BlogIndex() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#ededed] py-20">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Nina's Blog
          </h1>
          <p className="text-xl text-gray-400">Welcome to my world of thoughts and stories.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 backdrop-blur-sm"
              >
                {post.mainImage && (
                  <div className="h-64 overflow-hidden">
                    <img
                      src={urlFor(post.mainImage).width(800).height(400).url()}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{post.title}</h2>
                  <time className="text-sm text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</time>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No posts found. Start writing in Sanity Studio!</p>
          )}
        </div>
      </div>
    </main>
  );
}
