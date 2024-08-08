import { createRoot } from "react-dom/client"; // Import createRoot from React 18
import ReactMarkdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import React, { useRef } from "react";


import jsPDF from "jspdf";
import html2canvas from "html2canvas";


export function usePdfPageBP({ splitContent, setSplitContent }) {
  const rootRef = useRef(null); // Store the root instance

  // Function to split content into A4-sized chunks
  const checkSizeAndRender = async (words, A4_HEIGHT, measuringDivRef) => {
    // Initialize the root instance if there is none
    if (!rootRef.current) {
      rootRef.current = createRoot(measuringDivRef.current);
    }

    let toRender = "";
    let tempChunks = [];
    let lastWord = "";
    let secondLastWord = "";

    for (let word of words) {
      toRender += word;
      // 1500 is approximately the number of characters that can fit in an A4
      // page with 1in margin on all sides. This if saves times by not
      // rendering the content if it's less than 1500 characters.
      if (toRender.length > 1500) {
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

  const handleDownloadPdf = async () => {
    const pdf = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    for (let i = 0; i < splitContent.length; i++) {
      const element = document.getElementById(`page-${i}`);
      const canvas = await html2canvas(element, {
        scale: 2, // Increase the scale for better quality
      });

      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      if (i < splitContent.length - 1) {
        pdf.addPage();
      }
    }

    pdf.save("document.pdf");
  };

  return { checkSizeAndRender, handleDownloadPdf };
}
