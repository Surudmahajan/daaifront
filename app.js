import {
  sendChat
} from "./api.js";

import {
  renderUserMessage,
  renderResultCard,
  renderExplanationCard,
  renderError,
  setLoading
} from "./ui.js";

import {
  initializeDatasets,
  setupUploadHandlers,
  getSelectedDataset
} from "./upload.js";

const messageInput =
  document.getElementById(
    "message-input"
  );

const sendBtn =
  document.getElementById(
    "send-btn"
  );

async function handleSend() {

  const dataset =
    getSelectedDataset();

  if (!dataset) {

    renderError(
      "Please upload and select a dataset first."
    );

    return;

  }

  const message =
    messageInput.value
      .trim();

  if (!message) {

    return;

  }

  renderUserMessage(
    message
  );

  messageInput.value =
    "";

  try {

    setLoading(
      true
    );

    const response =
      await sendChat(
        dataset,
        message
      );

    renderResultCard(
      response.operation,
      response.result
    );

    sendVisuals(
      response.result
    );

    renderExplanationCard(
      response.explanation
    );

  } catch (error) {

    renderError(
      error.message
    );

  } finally {

    setLoading(
      false
    );

  }

}
function sendVisuals(
  result
) {

  const iframe =
    document.getElementById(
      "visuals-iframe"
    );

  if (!iframe) {
    return;
  }

 iframe.contentWindow?.postMessage(
  {
    type: "ENGINE_RESULT",

    payload: {
      data: result
    }
  },
  "*"
);
}

sendBtn.addEventListener(
  "click",
  handleSend
);

messageInput.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      handleSend();

    }

  }
);

window.addEventListener(
  "DOMContentLoaded",
  async () => {

    setupUploadHandlers();

    await initializeDatasets();

    initializeGuidePanel();

  }
);
function initializeGuidePanel() {

  const tabs =
    document.querySelectorAll(
      ".guide-tab"
    );

  const content =
    document.getElementById(
      "guide-content"
    );

  const guideHTML = `
    <h4>📘 DAAI Guide</h4>

    <ul>
      <li>Upload CSV or Excel files for analytics.</li>
      <li>Upload PDF, DOCX or TXT files for document analysis.</li>
      <li>Use natural language questions.</li>
      <li>Visualizations appear below the workspace.</li>
    </ul>
  `;

  const examplesHTML = `

  <h4>📊 Example Prompts</h4>

  <div class="examples-grid">

    <div class="example-chip">
      Calculate mean profit
    </div>

    <div class="example-chip">
      Summarize document
    </div>

    <div class="example-chip">
      Generate summary statistics
    </div>

    <div class="example-chip">
      Extract key insights
    </div>

    <div class="example-chip">
      Find correlation between revenue and cost
    </div>

    <div class="example-chip">
      List action items
    </div>

    <div class="example-chip">
      Perform regression analysis
    </div>

    <div class="example-chip">
      Provide recommendations
    </div>

    <div class="example-chip">
      Forecast next month's sales
    </div>

    <div class="example-chip">
      Explain key findings
    </div>

  </div>

`;

  const helpHTML = `
    <h4>🛠 Need Help?</h4>

    <p>
      Found a bug?
      Need a feature?
    </p>

    <p>
      Contact the developer.
    </p>

    <a
      href="https://forms.gle/vizVmbk56jYBTCdt6"
      class="guide-link"
    >
      Open Support Form
    </a>
  `;

  tabs.forEach(
    (tab) => {

      tab.addEventListener(
        "click",
        () => {

          tabs.forEach(
            (t) =>
              t.classList.remove(
                "active"
              )
          );

          tab.classList.add(
            "active"
          );

          const type =
            tab.dataset.tab;

          if (
            type === "guide"
          ) {

            content.innerHTML =
              guideHTML;

          }

          if (
            type === "examples"
          ) {

            content.innerHTML =
              examplesHTML;

          }

          if (
            type === "help"
          ) {

            content.innerHTML =
              helpHTML;

          }

        }
      );

    }
  );

}
