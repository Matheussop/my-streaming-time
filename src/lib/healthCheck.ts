import axiosInstance from "./axiosConfig";

/**
 * Checks if the backend is available by making a simple request
 * @returns Promise<boolean> - true if backend is available, false otherwise
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    // Try to make a simple request to check if backend is responding
    const response = await axiosInstance.get("/health", {
      timeout: 5000, // 5 second timeout for health check
    });
    return response.status === 200;
  } catch (error) {
    console.log("Backend não está respondendo, aguardando...");
    return false;
  }
}

/**
 * Waits for the backend to become available
 * @param maxAttempts - Maximum number of attempts to check backend health
 * @param delayBetweenAttempts - Delay in milliseconds between attempts
 * @returns Promise<boolean> - true when backend is ready
 */
export async function waitForBackend(
  maxAttempts = 10,
  delayBetweenAttempts = 2000,
  onProgress?: (
    attempt: number,
    maxAttempts: number,
    elapsedTime: number,
  ) => void,
): Promise<boolean> {
  const startTime = Date.now();

  for (let i = 0; i < maxAttempts; i++) {
    const elapsedTime = Date.now() - startTime;
    console.log(`Verificando backend... Tentativa ${i + 1}/${maxAttempts}`);

    // Report progress
    if (onProgress) {
      onProgress(i + 1, maxAttempts, elapsedTime);
    }

    if (await checkBackendHealth()) {
      console.log("✅ Backend está pronto!");
      return true;
    }

    if (i < maxAttempts - 1) {
      console.log(
        `⏳ Aguardando ${delayBetweenAttempts}ms antes da próxima tentativa...`,
      );
      await new Promise((resolve) => setTimeout(resolve, delayBetweenAttempts));
    }
  }

  throw new Error("Backend não ficou disponível após todas as tentativas");
}

/**
 * Checks if backend is ready, if not waits for it
 * @param onProgress - Callback function to report progress
 * @returns Promise<boolean> - true when backend is ready
 */
export async function ensureBackendReady(
  onProgress?: (
    attempt: number,
    maxAttempts: number,
    elapsedTime: number,
  ) => void,
): Promise<boolean> {
  // First check if backend is already available
  if (await checkBackendHealth()) {
    return true;
  }

  // If not available, wait for it
  return await waitForBackend(12, 5000, onProgress);
}
