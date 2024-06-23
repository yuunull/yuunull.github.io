import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticPropsContext } from "next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BlogMeta } from "..";
import "github-markdown-css/github-markdown-light.css";
import { CodeBlock } from "../../../../components/blogs/CodeBlock";

type BlogContents = {
  content: string;
} & BlogMeta;

export async function getStaticProps(
  context: GetStaticPropsContext<{ year: string; slug: string }>
) {
  const { year, slug } = context.params!;
  const filePath = path.join("posts", year, `${slug}.md`);
  const file = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(file);
  return { props: { frontMatter: data, content } };
}

export async function getStaticPaths() {
  const years = fs.readdirSync("posts");
  let paths: { params: { year: string; slug: string } }[] = [];

  years.forEach((year) => {
    const yearDir = path.join("posts", year);
    const files = fs.readdirSync(yearDir);

    files.forEach((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      paths.push({
        params: {
          year,
          slug,
        },
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
}

export default function Post({ frontMatter, content }: BlogContents) {
  return (
    <div className="wrapper">
      <h1 className="blog-title">{frontMatter.title}</h1>
      <article className="markdown-body">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            pre: CodeBlock,
          }}
        >
          {content}
        </Markdown>
      </article>
    </div>
  );
}
