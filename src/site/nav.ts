import { useRouter } from "@tanstack/react-router";

export function useSiteNav() {
  const router = useRouter();
  return (path: string, opts?: { category?: string | undefined; practitioner?: string | undefined }) => {
    const params = new URLSearchParams();
    if (opts?.category) params.set("category", opts.category);
    if (opts?.practitioner) params.set("practitioner", opts.practitioner);
    const qs = params.toString();
    const href = qs ? `${path}?${qs}` : path;
    const jumpsToForm = href.includes("concern=");
    const [to, queryString] = href.split("?");
    const search = queryString
      ? Object.fromEntries(new URLSearchParams(queryString))
      : {};
    void router.navigate({
      to: to || "/",
      search,
      resetScroll: !jumpsToForm,
    });
  };
}
