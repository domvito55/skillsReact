// ### Imports ###
import { useOutletContext } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";

import { usePdfPageBP } from "../../../hooks/usePdfPageBP";

import styles from "./styles.module.css";

// ### end Imports ###

export default function PreviewPageBP() {
  const { streamData } = useOutletContext();
  const [splitContent, setSplitContent] = useState([]);
  const measuringDivRef = useRef(null); // Reference to the measuring div

  const { checkSizeAndRender, handleDownloadPdf } = usePdfPageBP({
    splitContent,
    setSplitContent,
  });

  const calculateDPI = () => {
    const div = document.createElement("div");
    div.style.width = "1in";
    document.body.appendChild(div);
    const dpi = div.offsetWidth;
    document.body.removeChild(div);
    return dpi;
  };

  const dpi = calculateDPI();
  const A4_WIDTH = 8.27; // Width of an A4 sheet in inches
  const A4_HEIGHT = 11.69; // Height of an A4 sheet in inches
  const PADDING = 1; // Padding in inches
  const ADJUSTMENT = 5; // Fine-tuning adjustment in pixels

  const A4_HEIGHT_PX = A4_HEIGHT * dpi - ADJUSTMENT; // Height of an A4 sheet in mm

  console.log("A4_HEIGHT_PX", A4_HEIGHT_PX);

  useEffect(() => {
    const words = streamData.split(/(\s+|\n)/).filter(Boolean);

    // Call the function to split content
    checkSizeAndRender(words, A4_HEIGHT_PX, measuringDivRef);
  }, [streamData]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <button onClick={handleDownloadPdf} className="btn btn-primary mt-3">
        Download PDF
      </button>

      {/* Measuring div */}
      <div
        ref={measuringDivRef}
        style={{
          width: `${A4_WIDTH}in`,
          border: "1px solid red",
          // marginBottom: "20px",
          padding: `${PADDING}in`,
          // position: "absolute",
          // left: "-10000px", // Move the div far to the left off-screen
          // top: "0px", // Keep it aligned to the top of the page
        }}
      />

      {/* Render the split content */}
      <div>
        {splitContent.map((chunk, index) => (
          <div
            key={index}
            id={`page-${index}`} // Assign id for each page
            style={{
              width: `${A4_WIDTH}in`,
              height: `${A4_HEIGHT}in`,
              border: "1px solid blue",
              // marginBottom: "20px",
              padding: `${PADDING}in`,
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
              {chunk}
            </ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
}

