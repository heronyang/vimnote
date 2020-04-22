import "./index.css";

const CodeMirror = require("codemirror");
require("codemirror/mode/markdown/markdown");
require("codemirror/keymap/vim");

// Initializes UI components.
const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  mode: "markdown",
  keyMap: "vim",
});

// Initializes the content based on URL.
function handleRootRequest() {
  // Create a new doc.
  // TODO: read url from env variable.
  // TODO: move calls to another js file. this file focus on user interactions.
  $.post("http://0.0.0.0:8888/create", function(data) {
    // Redirects to the doc page created.
    console.log(data);
    window.location = url.origin + "/" + data;
  }).fail(function() {
    console.error("create new doc.");
  });
}

function handleDocRequest(docId) {
  console.log(docId);
  $.get("http://0.0.0.0:8888/download?docId=" + docId, function(data) {
    // Loads the data content onto UI.
    console.log(data);
    // TODO: title is not working yet as it's always empty
    document.title = data.title;
    editor.getDoc().setValue(data.content);
    saveDoc(); // just for debugging
  }).fail(function() {
    console.error("upload doc failed.");
  });
}

var jquery = require("jquery");
window.$ = window.jQuery = jquery;

const url = new URL(document.URL);
if (url.pathname == '/') {
  handleRootRequest();
} else {
  // Try to load an old doc.
  handleDocRequest(url.pathname.slice(1));
}

// Handles the user's input.
$('#save').click(saveDoc);
function saveDoc() {
  // Flushes the local content to server.
  const docId = getDocId();
  const content = editor.getDoc().getValue();
  $.post("http://0.0.0.0:8888/upload",
    {docId: docId, content: content, title: 'fake title'}, function(data) {
    console.log('saved');
  }).fail(function() {
    console.error("save doc failed.");
  });
}

function getDocId() {
  // TODO: handle many kinds of corner cases.
  const url = new URL(document.URL);
  return url.pathname.slice(1);
}
