import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (project) => `/${project._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (project) =>
      project._raw.flattenedPath.split("/").slice(1).join("/"),
  },
};

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "projects/**/*.mdx",
  contentType: "mdx",
  fields: {
    order: {
      type: "number",
      required: true,
    },
    title: {
      type: "string",
      required: true,
    },
    previewImage: {
      type: "image",
      required: false,
    },
    slogan: {
      type: "string",
      required: false,
    },
    description: {
      type: "string",
      required: true,
    },
    badges: {
      type: "list",
      of: {
        type: "string",
      },
      required: false,
    },
    published: {
      type: "boolean",
      default: false,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Project],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            // prevent lines from collapsing in `display:grid` mode, and allow empty
            // lines to be copied to the clipboard
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: "" }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHiglightedWord(node) {
            node.properties.className.push("word--highlighted");
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
