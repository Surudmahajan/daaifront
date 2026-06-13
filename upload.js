import {
  uploadDataset,
  listDatasets,
  resetDatasets,
  deleteDataset
} from "./api.js";

import {
  renderDatasets,
  setCurrentDataset,
  renderError
} from "./ui.js";

let selectedDataset = null;

export function getSelectedDataset() {

  return selectedDataset;

}

export async function initializeDatasets() {

  try {

    const response =
      await listDatasets();

    const datasets =
      response.datasets || [];

    if (
      datasets.length > 0 &&
      !selectedDataset
    ) {

      selectedDataset =
        datasets[0];

      setCurrentDataset(
        selectedDataset
      );

    }

    renderDatasets(
      datasets,
      selectedDataset,
      selectDataset
    );

  } catch (error) {

    renderError(
      error.message
    );

  }

}

export function setupUploadHandlers() {

  const uploadBtn =
    document.getElementById(
      "upload-btn"
    );

  const fileInput =
    document.getElementById(
      "file-input"
    );

  const resetBtn =
    document.getElementById(
      "reset-btn"
    );

  uploadBtn.onclick = () => {

    fileInput.click();

  };

  fileInput.onchange =
    async (event) => {

      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

      try {

        uploadBtn.disabled =
          true;

        uploadBtn.textContent =
          "Uploading...";

        const result =
          await uploadDataset(
            file
          );

        selectedDataset =
          result.dataset;

        setCurrentDataset(
          selectedDataset
        );

        await initializeDatasets();

      } catch (error) {

        renderError(
          error.message
        );

      } finally {

        uploadBtn.disabled =
          false;

        uploadBtn.textContent =
          "Upload Dataset";

        fileInput.value =
          "";

      }

    };

  resetBtn.onclick =
    async () => {

      const confirmed =
        confirm(
          "Remove all datasets?"
        );

      if (!confirmed) {
        return;
      }

      try {

        await resetDatasets();

        selectedDataset =
          null;

        setCurrentDataset(
          null
        );

        await initializeDatasets();

      } catch (error) {

        renderError(
          error.message
        );

      }

    };

}

function selectDataset(
  dataset
) {

  selectedDataset =
    dataset;

  setCurrentDataset(
    dataset
  );

  initializeDatasets();

}
