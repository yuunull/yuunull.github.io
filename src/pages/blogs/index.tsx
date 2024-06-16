import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";

type Props = {
  posts: BlogMeta[];
};

export type BlogMeta = {
  frontMatter: {
    title: string;
    date: string;
    description: string;
  };
  slug: string;
};

export const getStaticProps = () => {
  const files = fs.readdirSync("posts");
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fileContent = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
    };
  });

  return {
    props: {
      posts,
    },
  };
};

export default function Blogs({ posts }: Props) {
  return (
    <>
      <div className="wrapper">
        {posts?.map((post) => (
          <div key={post.slug}>
            <Link href={`/blogs/${post.slug}`}>{post.frontMatter.title}</Link>
          </div>
        ))}
      </div>
    </>
  );
}
