let config = {};

export async function loadConfig() {
  const response = await fetch('/config.json');
  config = await response.json();
}

export function getBackendApi() {
  return config.apiEndpoint;
}