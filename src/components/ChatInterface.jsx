import React, { useState, useEffect, useRef } from "react";
import "./ChatInterface.css";
import logo from "../assets/skillsladder-logo.png";
import userIcon from "../assets/user-icon.png";
import sendIcon from "../assets/send-icon.png";
import LoadingSymbol from "./LoadingSymbol";
import ReactMarkdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [textareaRows, setTextareaRows] = useState(1);
  const chatBodyRef = useRef(null);
  const textareaRef = useRef(null);
  const placeholderIndexRef = useRef(null); // Ref to store the placeholder index

  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      const newMessage = {
        text: input,
        sender: "You",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");
      setTextareaRows(1);

      // Add a placeholder message bubble for the incoming message
      const placeholderMessage = {
        text: "...",
        sender: "skillsladder assistant",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, placeholderMessage];
        // Store the placeholder index in the ref
        placeholderIndexRef.current = updatedMessages.length - 1;
        return updatedMessages;
      });

      try {
        const response = await fetch("http://localhost:8000/api/ideation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let receivedMessage = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          receivedMessage += decoder.decode(value, { stream: true });

          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            // Use the stored placeholder index
            const messageIndex = placeholderIndexRef.current;
            if (messageIndex !== null) {
              updatedMessages[messageIndex] = {
                ...updatedMessages[messageIndex],
                text: receivedMessage,
              };
            }
            return updatedMessages;
          });
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const generatePDF = () => {
    // Implement PDF generation logic here
  };

  useEffect(() => {
    if (messages.length > 0 && chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [messages]);

  const handleInputChange = (e) => {
    const textareaLineHeight = 24;
    const previousRows = e.target.rows;
    e.target.rows = 1;
    const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    setInput(e.target.value);
    setTextareaRows(currentRows > 1 ? currentRows : 1);
  };

  return (
    <div className="container-fluid">
      <div className="chat-window">
        <div className="chat-header">
          <h5 className="m-0">Ideation Chat</h5>
        </div>
        <div className="chat-body" ref={chatBodyRef}>
          {messages.map((message, index) =>
            message.sender === "You" ? (
              <div key={index} className="message-wrapper sent">
                <div className="message-bubble sent">
                  <img
                    src={userIcon}
                    alt="User Icon"
                    width="24"
                    height="24"
                    className="d-inline-block align-text-top rounded-circle"
                  />
                  {message.text}
                </div>
                <div className="timestamp">{message.timestamp}</div>
              </div>
            ) : (
              <div key={index} className="message-wrapper received">
                <div className="message-bubble received">
                  <img
                    src={logo}
                    alt="skillsladder Icon"
                    width="24"
                    height="24"
                    className="d-inline-block align-text-top rounded-circle"
                  />
                  {message.text !== "..." ? (
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
                      {message.text}
                    </ReactMarkdown>
                  ) : (
                    <LoadingSymbol />
                  )}
                </div>
                <div className="timestamp">{message.timestamp}</div>
              </div>
            )
          )}
        </div>
        <div className="chat-footer">
          <textarea
            ref={textareaRef}
            className="form-control"
            placeholder="Type your message..."
            value={input}
            rows={textareaRows}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <button className="btn btn-primary mx-1" onClick={handleSendMessage}>
            <img
              src={sendIcon}
              alt="Send icon"
              width="24"
              height="24"
              className="d-inline-block align-text-top rounded-circle"
            />
          </button>
          <button className="btn btn-secondary" onClick={generatePDF}>
            Get PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
