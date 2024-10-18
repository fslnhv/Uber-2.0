import { useState, useEffect, useCallback } from "react";

export const fetchAPI = async (url: string, options?: RequestInit) => {
  console.log("🚀 fetchAPI called with:", { url, options });

  try {
    console.log("📡 Making fetch request...");
    const response = await fetch(url, options);
    console.log("📥 Received response:", {
      status: response.status,
      ok: response.ok,
      statusText: response.statusText,
    });

    if (!response.ok) {
      console.warn("⚠️ Response not OK");
      // HERE'S THE FIRST MAJOR ISSUE - Error is created but not thrown
      new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("🔄 Parsing response as JSON...");
    const jsonData = await response.json();
    console.log("✅ Parsed JSON data:", jsonData);
    return jsonData;
  } catch (error) {
    console.error("❌ Fetch error:", error);
    throw error;
  }
};

export const useFetch = <T>(url: string, options?: RequestInit) => {
  console.log("🎣 useFetch hook called with:", { url, options });

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    console.log("🔄 fetchData called");
    console.log("📍 Current state:", { data, loading, error });

    setLoading(true);
    setError(null);

    try {
      console.log("🚀 Calling fetchAPI...");
      const result = await fetchAPI(url, options);
      console.log("📦 Received result:", result);

      // HERE'S THE SECOND POTENTIAL ISSUE
      // If result.data is undefined, this will fail silently
      console.log("🔍 Attempting to access result.data:", result.data);
      setData(result.data);
    } catch (err) {
      console.error("❌ Error caught in fetchData:", err);
      setError((err as Error).message);
    } finally {
      console.log("✅ Setting loading to false");
      setLoading(false);
    }
  }, [url, options]); // NOTE: options object in dependency array might cause unnecessary rerenders

  useEffect(() => {
    console.log("⚡ Effect triggered with dependencies:", { url, options });
    fetchData();
  }, [fetchData]);

  const currentState = { data, loading, error, refetch: fetchData };
  console.log("📊 Current hook state:", currentState);
  return currentState;
};
