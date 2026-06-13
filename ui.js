const chatContainer =
  document.getElementById(
    "chat-container"
  );

const datasetList =
  document.getElementById(
    "dataset-list"
  );

const currentDatasetLabel =
  document.getElementById(
    "current-dataset"
  );

export function removeWelcomeCard() {

  document
    .getElementById(
      "welcome-card"
    )
    ?.remove();

}

export function setCurrentDataset(
  dataset
) {

  currentDatasetLabel.textContent =
    dataset || "None Selected";

}

export function renderDatasets(
  datasets,
  selectedDataset,
  onSelect
) {

  datasetList.innerHTML = "";

  if (
    !datasets ||
    datasets.length === 0
  ) {

    datasetList.innerHTML = `
      <div class="empty-state">
        No datasets uploaded
      </div>
    `;

    return;

  }

  datasets.forEach(
    (dataset) => {

      const item =
        document.createElement(
          "div"
        );

      item.className =
        "dataset-item";

      if (
        dataset ===
        selectedDataset
      ) {

        item.classList.add(
          "active"
        );

      }

      item.textContent =
        dataset;

      item.onclick = () =>
        onSelect(dataset);

      datasetList.appendChild(
        item
      );

    }
  );

}

export function renderUserMessage(
  message
) {

  removeWelcomeCard();

  const card =
    document.createElement(
      "div"
    );

  card.className =
    "user-card";

  card.innerHTML = `
    <strong>You</strong>
    <div style="margin-top:10px;">
      ${message}
    </div>
  `;

  chatContainer.appendChild(
    card
  );

  scrollToBottom();

}

export function renderResultCard(
  operation,
  result
) {

  const card =
    document.createElement(
      "div"
    );

  card.className =
    "result-card";

  let html = `
    <h3>Result</h3>
    <div class="result-grid">
  `;

  Object.entries(result)
    .forEach(
      ([key, value]) => {

        html += `
          <div class="result-row">
            <span class="result-key">
              ${formatLabel(key)}
            </span>
            <span class="result-value">
              ${
                typeof value === "object"
                  ? JSON.stringify(
                      value,
                      null,
                      2
                    )
                  : value
              }
            </span>
          </div>
        `;

      }
    );

  html += `
    </div>
  `;

  card.innerHTML = html;

  chatContainer.appendChild(
    card
  );

  scrollToBottom();

}

export function renderExplanationCard(
  explanation
) {

  const card =
    document.createElement(
      "div"
    );

  card.className =
    "explanation-card";

  card.innerHTML = `
    <h3>Explanation</h3>
    <p>
      ${explanation}
    </p>
  `;

  chatContainer.appendChild(
    card
  );

  scrollToBottom();

}

export function renderError(
  message
) {

  removeWelcomeCard();

  const card =
    document.createElement(
      "div"
    );

  card.className =
    "error-card";

  card.innerHTML = `
    <strong>Error</strong>
    <div style="margin-top:10px;">
      ${message}
    </div>
  `;

  chatContainer.appendChild(
    card
  );

  scrollToBottom();

}

export function setLoading(
  loading
) {

  const sendBtn =
    document.getElementById(
      "send-btn"
    );

  if (!sendBtn) {
    return;
  }

  sendBtn.disabled =
    loading;

  sendBtn.textContent =
    loading
      ? "Analyzing..."
      : "Analyze";

}

function scrollToBottom() {

  chatContainer.scrollTop =
    chatContainer.scrollHeight;

}

function formatLabel(
  text
) {

  return text
    .replaceAll("_", " ")
    .replace(
      /\b\w/g,
      char => char.toUpperCase()
    );

}
