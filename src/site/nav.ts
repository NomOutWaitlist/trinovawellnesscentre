import { useRouter } from "@tanstack/react-router";

export function useSiteNav() {
  const router = useRouter();
  return (path: string, opts?: { category?: string | undefined; practitioner?: string | undefined }) => {
    const params = new URLSearchParams();
    if (opts?.category) params.set("category", opts.category);
    if (opts?.practitioner) params.set("practitioner", opts.practitioner);
    const qs = params.toString();
    router.history.push(qs ? `${path}?${qs}` : path);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };
}
