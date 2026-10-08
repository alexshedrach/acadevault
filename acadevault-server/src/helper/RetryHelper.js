export async function retry(fn, retries = 3, delay = 1000) {
  let attempt = 0;

  while (attempt < retries) {
    try {
      return await fn();
    } catch (error) {
      attempt++;

      if (attempt >= retries) {
        throw new Error(
          `Operation failed after ${retries} attempts: ${error.message}`
        );
      }

      console.warn(
        `Retry attempt ${attempt} failed: ${error.message}. Retrying in ${delay}ms...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Increase delay exponentially (Exponential Backoff)
      delay *= 2;
    }
  }
}
