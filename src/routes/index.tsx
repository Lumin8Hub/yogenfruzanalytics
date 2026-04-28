import { createFileRoute } from "@tanstack/react-router";
import CISInfographicSite from "@/components/CISInfographicSite.jsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Community Impact Report 2025-26" },
      {
        name: "description",
        content:
          "Infographic report website sharing the 2025-26 Community Impact Study findings for Jewish Canada.",
      },
      { property: "og:title", content: "Community Impact Report 2025-26" },
      {
        property: "og:description",
        content:
          "Explore key findings on safety, priorities, institutional satisfaction, and community resilience.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <CISInfographicSite />;
}
