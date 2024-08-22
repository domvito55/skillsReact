// ### Imports ###
import { useOutletContext } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from React 18
import ReactMarkdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import styles from "./styles.module.css";

// ### end Imports ###

export default function PreviewPageBP() {
  const { streamData } = useOutletContext();
  const [splitContent, setSplitContent] = useState([]);
  const measuringDivRef = useRef(null); // Reference to the measuring div
  const rootRef = useRef(null); // Store the root instance

  const A4_WIDTH = 794; // margin already included
  const A4_HEIGHT = 1122; // margin already included

  useEffect(() => {
    // Initialize the root instance if there is none
    // This is necessary to render the markdown content in the measuring div
    if (!rootRef.current) {
      rootRef.current = createRoot(measuringDivRef.current);
    }

    let toRender = "";
    // Split the streamData into words, spaces and new lines will be kept
    // as separate words. The filter(Boolean) will remove empty strings "".
    const words = streamData.split(/(\s+|\n)/).filter(Boolean);
    let tempChunks = [];
    let lastWord = "";
    let secondLastWord = "";

    const checkSizeAndRender = async () => {
      for (let word of words) {
        toRender += word;
        // 2060 is approximately the number of characters that can fit in an A4
        // page with 3cm margin on all sides. This if saves times by not
        // rendering the content if it's less than 2060 characters.
        if(toRender.length > 2060) {
          rootRef.current.render(
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
                "h1", "h2", "h3", "h4", "h5", "h6",
                "ul", "ol", "li",
                "strong", "em",
              ]}
            >
              {toRender}
            </ReactMarkdown>
          );

          // Ensure the DOM updates and then measure
          await new Promise((resolve) => setTimeout(resolve, 0));

          // Check if the content exceeds the A4 height
          if (measuringDivRef.current.offsetHeight > A4_HEIGHT) {
            toRender = toRender.slice(0, -(word.length + 1));
            tempChunks.push(toRender);

            // This will avoid that the markdown syntax is split between two pages
            // like:
            // ## (first page)
            // Title name (second page)
            if (secondLastWord.startsWith("#")) {
              toRender = secondLastWord + lastWord + word;
            } else {
              toRender = word;
            }
          }
          secondLastWord = lastWord;
          lastWord = word;
        }
      }
      tempChunks.push(toRender);
      setSplitContent(tempChunks);
    };

    checkSizeAndRender();
  }, [streamData]);

  const handleDownloadPdf = () => {
    // Your logic to download PDF using splitContent
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <button onClick={handleDownloadPdf} className="btn btn-primary mt-3">
        Download PDF
      </button>

      {/* Measuring div */}
      <div
        ref={measuringDivRef}
        style={{
          width: A4_WIDTH,
          border: "1px solid red",
          marginBottom: "20px",
          padding: "10px",
          position: "absolute",
          left: "-10000px", // Move the div far to the left off-screen
          top: "0px", // Keep it aligned to the top of the page
        }}
      />

      {/* Render the split content */}
      <div className="bg-light">
        {splitContent.map((chunk, index) => (
          <div
            key={index}
            style={{
              width: A4_WIDTH,
              height: A4_HEIGHT,
              border: "1px solid blue",
              marginBottom: "20px",
              padding: "10px",
            }}
          >
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
                "h1", "h2", "h3", "h4", "h5", "h6",
                "ul", "ol", "li",
                "strong", "em",
              ]}
            >
              {chunk}
            </ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
}
