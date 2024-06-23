import React from "react";
import type { ClassAttributes, HTMLAttributes } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import type { ExtraProps } from "react-markdown";

export const CodeBlock = ({
  children,
  ...props
}: ClassAttributes<HTMLPreElement> &
  HTMLAttributes<HTMLPreElement> &
  ExtraProps) => {
  if (!children || typeof children !== "object") {
    return <code {...props}>{children}</code>;
  }
  const childType = "type" in children ? children.type : "";
  if (childType !== "code") {
    return <code {...props}>{children}</code>;
  }

  const childProps = "props" in children ? children.props : {};
  const { className, children: code } = childProps;
  const language = className?.replace("language-", "");

  return (
    <SyntaxHighlighter language={language} style={oneLight}>
      {String(code).replace(/\n$/, "")}
    </SyntaxHighlighter>
  );
};
