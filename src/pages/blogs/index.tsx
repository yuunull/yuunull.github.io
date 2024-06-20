import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";

import styles from "@/styles/blogs/Blogs.module.css";

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

  posts.sort(
    (a, b) =>
      new Date(b.frontMatter.date).getTime() -
      new Date(a.frontMatter.date).getTime()
  );

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
          <div key={post.slug} className={`${styles.BlogsContainer}`}>
            <ul className={`${styles.BlogsList}`}>
              <li className={`${styles.BlogsListDate}`}>
                {post.frontMatter.date}
              </li>
              <li className={`${styles.BlogsListTitle}`}>
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
