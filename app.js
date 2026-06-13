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

  }
);
