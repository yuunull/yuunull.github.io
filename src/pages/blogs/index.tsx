import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";

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
  const years = fs.readdirSync("posts");
  let posts: BlogMeta[] = [];

  years.forEach((year) => {
    const yearDir = path.join("posts", year);
    const files = fs.readdirSync(yearDir);

    files.forEach((fileName) => {
      const slug = `${year}/${fileName.replace(/\.md$/, "")}`;
      const filePath = path.join(yearDir, fileName);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      posts.push({
        frontMatter: {
          title: data.title,
          date: data.date,
          description: data.description,
        },
        slug,
      });
    });
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
            <ul>
              <li>{post.frontMatter.date}</li>
              <li>
                <Link href={`/blogs/${post.slug}`}>
                  {post.frontMatter.title}
                </Link>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
