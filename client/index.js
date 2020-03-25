import "./index.css";

const CodeMirror = require("codemirror");
require("codemirror/mode/markdown/markdown");
require("codemirror/keymap/vim");

const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  mode: "markdown",
  keyMap: "vim",
});
