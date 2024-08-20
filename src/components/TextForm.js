import React, { useState } from "react";

export default function TextForm(props) {
  const handleOnChange = (event) => {
    setHistory([...history, event.target.value]);
    setRedoHistory([]);
    setText(event.target.value);
  };
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase!", "success");
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase!", "success");
  };

  const handleClearClick = () => {
    let newText = "";
    setText(newText);
    setIsBold(false);
    props.showAlert("Text Cleared!", "success");
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Copied to Clipboard!", "success");
  };
  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra spaces removed!", "success");
  };
  const handleMinify = () => {
    let newText = text.replace(/\s+/g, "");
    setText(newText);
    props.showAlert("Text Minified!!", "success");
  };
  const handleComments = () => {
    let newText = text
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\/\/.*$/gm, "")
      .trim();
    setText(newText);
    props.showAlert("Comments removed successfully!!", "success");
  };
  const handleRead = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[3];
    speechSynthesis.speak(utterance);
  };
  const handleStop = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      console.log("Speech stopped.");
    } else {
      console.log("No speech is currently being spoken.");
    }
  };
  const handlePaste = async () => {
    try {
      if (navigator.clipboard) {
        const clipboardText = await navigator.clipboard.readText();
        setText(clipboardText);
      } else console.error("Clipboard API not supported");
    } catch (error) {
      console.error("Failed to read clipboard contents:", error);
    }
    props.showAlert("Pasted from Clipboard!!", "success");
  };
  const handleSpecialSymbols = () => {
    let newText = text.replace(/[^\w\s]/g, "");
    setText(newText);
    props.showAlert("Special Characters removed Successfully!!", "success");
  };
  const handleUndo = () => {
    if (history.length > 0) {
      const lastText = history.pop();
      setRedoHistory([text, ...redoHistory]);
      setText(lastText);
      setHistory([...history]);
    } else {
      console.log("No history to undo");
    }
  };
  const handleRedo = () => {
    if (redoHistory.length > 0) {
      const lastRedoText = redoHistory.shift();
      setHistory([...history, text]);
      setText(lastRedoText);
      setRedoHistory([...redoHistory]);
    } else {
      console.log("No redo history to redo");
    }
  };
  const handleBold = () => {
    if (text.trim().length > 0) {
      setIsBold(!isBold);
      props.showAlert("Text bold state toggled!", "success");
    } else {
      props.showAlert("Text area is empty!", "failure");
    }
  };

  const handleItalic = () => {
    if (text.trim().length > 0) {
      setIsItalic(!isItalic);
      props.showAlert("Text italic state toggled!", "success");
    } else {
      props.showAlert("Text area is empty!", "failure");
    }
  };

  const handleUnderline = () => {
    if (text.trim().length > 0) {
      setIsUnderline(!isUnderline);
      props.showAlert("Text underline state toggled!", "success");
    } else {
      props.showAlert("Text area is empty!", "failure");
    }
  };

  const handleNormal = () => {
    if (text.trim().length > 0) {
      setIsBold(false);
      setIsItalic(false);
      setIsUnderline(false);
      props.showAlert("Text format reset to normal!", "success");
    } else {
      props.showAlert("Text area is empty!", "failure");
    }
  };
  const [text, setText] = useState("");
  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h1 className="mb-4">{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "dark" ? "#13466e" : "white",
              color: props.mode === "dark" ? "white" : "#042743",
            }}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleUpClick}
        >
          Convert to Uppercase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleLoClick}
        >
          Convert to Lowercase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleClearClick}
        >
          Clear Text
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleCopy}
        >
          Copy Text
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleExtraSpaces}
        >
          Remove Extra Spaces
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleMinify}
        >
          Minfy
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleComments}
        >
          Remove Comments
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleSpecialSymbols}
        >
          Remove Special Symbols
        </button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleUndo}>
          Ctrl + Z
        </button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleRedo}>
          Ctrl + Y
        </button>
        <button className="btn btn-primary mx-1 my-1" onClick={handlePaste}>
          Paste
        </button>
      </div>
      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h2>Text Formatting Tools</h2>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleBold}
        >
          <b>Bold</b>
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleItalic}
        >
          <i>Italic</i>
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleUnderline}
        >
          <u>Underline</u>
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleNormal}
        >
          Normal
        </button>
      </div>
      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h2>Your text summary</h2>
        <p>
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }{" "}
          words and {text.length} characters
        </p>
        <p>
          {0.008 *
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length}{" "}
          Minutes read
        </p>
        <h2>Preview</h2>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleRead}
        >
          Read for me!
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-danger mx-1 my-1"
          onClick={handleStop}
        >
          Stop
        </button>
        <p
          style={{
            fontWeight: isBold ? "bold" : "normal",
            fontStyle: isItalic ? "italic" : "normal",
            textDecoration: isUnderline ? "underline" : "none",
          }}
        >
          {text.length > 0 ? text : "Nothing to preview!"}
        </p>
      </div>
    </>
  );
}
