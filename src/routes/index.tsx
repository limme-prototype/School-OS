import { createFileRoute } from "@tanstack/react-router";
import { ShowcaseHub } from "@/components/showcase-hub";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "School OS — UX Prototype Showcase" },
      {
        name: "description",
        content:
          "Unified interactive UX prototypes for School OS covering Student, Parent, Teacher, Admin, and Bus Staff roles.",
      },
      { property: "og:title", content: "School OS — UX Prototype Showcase" },
      {
        property: "og:description",
        content:
          "Explore and test high-fidelity UX prototypes built for School OS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <ShowcaseHub />;
}
