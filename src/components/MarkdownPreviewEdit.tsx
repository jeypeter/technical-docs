import * as React from "react";
import { styled } from "@mui/material/styles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Grid, TextareaAutosize } from "@mui/material";

const StyledMarkdownMui = styled("div")({
  // Add your MUI styles here
  fontFamily: "Roboto, sans-serif",
  padding: "16px",
  backgroundColor: "#f6f6f6",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  maxWidth: "100%",
  margin: "0 auto",
  "& li": {
    paddingLeft: 5,
    textDecoration: "none",
  },
});

const MarkdownContent = styled("div")({
  // Add styles for the Markdown content
  color: "#333",
  fontSize: "16px",
  lineHeight: "1.6",
});

export default function MarkdownPreviewEdit({
  markdownContent,
  isEditing,
  setMarkdownContent,
}) {
  const handleTextareaChange = (event) => {
    setMarkdownContent(event.target.value);
  };

  return (
    <Grid item xs={12}>
      {isEditing ? (
        <TextareaAutosize
          value={markdownContent}
          onChange={handleTextareaChange}
          style={{
            width: "100%",
            minHeight: "200px",
            marginBottom: "16px",
          }}
        />
      ) : (
        <StyledMarkdownMui>
          <MarkdownContent>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // eslint-disable-next-line react/no-unstable-nested-components
                code(props) {
                  const { children, className, node, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      {...rest}
                      PreTag="div"
                      children={String(children).replace(/\n$/, "")}
                      language={match[1]}
                      style={dark}
                    />
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
              // components={{
              //   code(props) {
              //     const { children, className, node, ...rest } = props;
              //     const match = /language-(\w+)/.exec(className || "");
              //     return match ? (
              //       <SyntaxHighlighter
              //         {...rest}
              //         PreTag="div"
              //         children={String(children).replace(/\n$/, "")}
              //         language={match[1]}
              //         style={dark}
              //       />
              //     ) : (
              //       <code {...rest} className={className}>
              //         {children}
              //       </code>
              //     );
              //   },
              // }}
            >
              {markdownContent}
            </ReactMarkdown>
          </MarkdownContent>
        </StyledMarkdownMui>
      )}
    </Grid>
  );
}
