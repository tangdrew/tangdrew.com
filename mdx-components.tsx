import React, { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { highlight } from "sugar-high";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

const components = {
  h1: (props: HeadingProps) => (
    <h1
      className="font-serif font-medium pt-12 mb-4 text-3xl text-stone-900 dark:text-stone-100 tracking-tight"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="font-serif text-stone-800 dark:text-stone-200 font-medium mt-8 mb-3 text-xl tracking-tight"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="font-serif text-stone-800 dark:text-stone-200 font-medium mt-8 mb-3 text-lg tracking-tight"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="font-serif font-medium text-stone-800 dark:text-stone-200" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p
      className="text-stone-600 dark:text-stone-400 leading-relaxed font-sans"
      {...props}
    />
  ),
  ol: (props: ListProps) => (
    <ol
      className="text-stone-600 dark:text-stone-400 list-decimal pl-5 space-y-2 font-sans"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="text-stone-600 dark:text-stone-400 list-disc pl-5 space-y-1 font-sans"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="font-medium italic" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-stone-900 dark:text-stone-100" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      "text-stone-800 hover:text-teal-600 dark:text-stone-300 hover:dark:text-teal-400 underline underline-offset-4 decoration-stone-300 dark:decoration-stone-700 transition-colors duration-200 font-sans";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table className="text-stone-600 dark:text-stone-400">
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index} className="px-4 py-2 border-b border-stone-200 dark:border-stone-700 text-left font-serif font-medium text-stone-900 dark:text-stone-100">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index} className="border-b border-stone-100 dark:border-stone-800">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="px-4 py-2 font-sans">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-2 border-stone-300 pl-4 text-stone-700 dark:border-stone-600 dark:text-stone-300 italic font-serif"
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
