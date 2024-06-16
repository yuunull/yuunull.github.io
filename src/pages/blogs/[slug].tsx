import fs from "fs";
import matter from "gray-matter";
import { GetStaticPropsContext } from "next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { BlogMeta } from ".";
import "github-markdown-css/github-markdown-light.css";

type BlogContents = {
  content: string;
} & BlogMeta;

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
) {
  const { slug } = context.params!;
  const file = fs.readFileSync(`posts/${slug}.md`, "utf-8");
  const { data, content } = matter(file);
  return { props: { frontMatter: data, content } };
}

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ frontMatter, content }: BlogContents) {
  return (
    <div className="wrapper">
      <h1>{frontMatter.title}</h1>
      <article className="markdown-body">
        <Markdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
          {content}
        </Markdown>
      </article>
    </div>
  );
}
