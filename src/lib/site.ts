const defaultReviewEmail = "kuba.opoczka@gmail.com";

export function safeReviewEmail(value: string | undefined): string {
  const normalized = value?.trim() || "";
  return /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i.test(normalized) ? normalized : defaultReviewEmail;
}

export function safeCheckoutUrl(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    const isGumroadHost = url.hostname === "gumroad.com" || url.hostname.endsWith(".gumroad.com");
    return url.protocol === "https:"
      && isGumroadHost
      && !url.username
      && !url.password
      && !url.port
      && url.pathname.startsWith("/l/")
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

export const reviewEmail = safeReviewEmail(import.meta.env.VITE_REVIEW_EMAIL);

const reviewSubject = encodeURIComponent("Evidence Studio specialist review");
const reviewBody = encodeURIComponent(
  "Hi Kuba,\n\nI audit accessibility and would like to review Evidence Studio.\n\nMy typical audit workflow is:\n\nThe reporting problem I most want solved is:\n",
);

export const contactHref = `mailto:${reviewEmail}?subject=${reviewSubject}&body=${reviewBody}`;

export const agencyPilotHref = "/pilot";

const supportSubject = encodeURIComponent("Evidence Studio support");
const supportBody = encodeURIComponent(
  "Hi Kuba,\n\nEvidence Studio version:\nChrome version:\n\nWhat I expected:\n\nWhat happened:\n\nSteps that reproduce it:\n",
);

export const supportHref = `mailto:${reviewEmail}?subject=${supportSubject}&body=${supportBody}`;

export const specialistReviewHref = "/review";

export const chromeWebStoreHref = "https://chromewebstore.google.com/detail/evidence-studio/afnfhhfbcbgagblgankihdfejaiccjdn";

const configuredCheckoutUrl = safeCheckoutUrl(import.meta.env.VITE_CHECKOUT_URL);

export const checkoutHref = configuredCheckoutUrl || specialistReviewHref;

export const checkoutIsLive = configuredCheckoutUrl !== null;
