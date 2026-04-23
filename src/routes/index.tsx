import { createFileRoute } from "@tanstack/react-router";
import YogenFruzDashboard from "@/components/YogenFruzDashboard.jsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yogen Früz Marketing Dashboard" },
      {
        name: "description",
        content: "Interactive Yogen Früz campaign analytics dashboard for spend, clicks, conversions, channels, keywords, and creatives.",
      },
      { property: "og:title", content: "Yogen Früz Marketing Dashboard" },
      {
        property: "og:description",
        content: "Explore campaign performance across Yogen Früz paid media channels and local conversion actions.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <YogenFruzDashboard />;
}
