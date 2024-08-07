import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";

export default function HiddenElement({ content }) {
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      console.log("a4Content dimensions:", {
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, [content]);

  return (
    <div
      id="a4Container"
      style={{
        margin: "20px",
      }}
      className="bg-primary"
    >
      <div
        id="a4Content"
        className="bg-secondary"
        ref={divRef}
        style={{
          width: "8.27in",
          height: "11.69in",
          margin: "0.5in",
        }}
      >
        {/* logo */}
        {/* <img src="/src/assets/skillsladder-logo.png" alt="" width={"30px"} /> */}
        {/* Content */}
        <ReactMarkdown
          rehypePlugins={[
            [
              rehypeExternalLinks,
              {
                target: "_blank",
                rel: ["nofollow", "noopener", "noreferrer"],
              },
            ],
          ]}
          allowedElements={[
            "p",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "ul",
            "ol",
            "li",
            "strong",
            "em",
          ]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
