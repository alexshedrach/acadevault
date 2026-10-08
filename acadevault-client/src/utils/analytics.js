export const trackEvent = (eventName, properties = {}) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", eventName, {
      event_category: "engagement",
      ...properties,
    });
  }
};
