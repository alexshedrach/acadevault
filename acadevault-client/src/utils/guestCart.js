export function getGuestInfoFromStorage() {
  if (typeof window === "undefined") return {};
  return {
    guestEmail: localStorage.getItem("guestEmail") || null,
    fullName: localStorage.getItem("guestFullName") || null,
    phoneNumber: localStorage.getItem("guestPhoneNumber") || null,
    shippingAddress: localStorage.getItem("shippingAddress") || null,
  };
}
