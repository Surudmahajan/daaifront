import { CONFIG } from "./config.js";

export async function uploadDataset(file) {

  const formData = new FormData();

  formData.append(
    "file",
    file
  );

  const response = await fetch(
    `${CONFIG.API_BASE_URL}/upload`,
    {
      method: "POST",
      body: formData
    }
  );

  if (!response.ok) {

    const error =
      await response.text();

    throw new Error(
      error ||
      "Upload failed."
    );

  }

  return await response.json();

}

export async function listDatasets() {

  const response = await fetch(
    `${CONFIG.API_BASE_URL}/datasets`
  );

  if (!response.ok) {

    throw new Error(
      "Failed to load datasets."
    );

  }

  return await response.json();

}

export async function deleteDataset(
  datasetName
) {

  const response = await fetch(
    `${CONFIG.API_BASE_URL}/datasets/${encodeURIComponent(datasetName)}`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) {

    const error =
      await response.text();

    throw new Error(
      error ||
      "Failed to delete dataset."
    );

  }

  return await response.json();

}

export async function resetDatasets() {

  const response = await fetch(
    `${CONFIG.API_BASE_URL}/reset`,
    {
      method: "POST"
    }
  );

  if (!response.ok) {

    const error =
      await response.text();

    throw new Error(
      error ||
      "Failed to reset datasets."
    );

  }

  return await response.json();

}

export async function sendChat(
  dataset,
  message
) {

  const response = await fetch(
    `${CONFIG.API_BASE_URL}/chat`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify({
        dataset,
        message
      })
    }
  );

  if (!response.ok) {

    let errorMessage =
      "Request failed.";

    try {

      const error =
        await response.json();

      errorMessage =
        error.detail ||
        errorMessage;

    } catch {

    }

    throw new Error(
      errorMessage
    );

  }

  return await response.json();

}
