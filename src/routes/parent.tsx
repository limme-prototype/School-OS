import { createFileRoute } from "@tanstack/react-router";
import { ParentApp } from "@/components/parent-app";

export const Route = createFileRoute("/parent")({
  head: () => ({
    meta: [
      { title: "Parent App — School OS" },
      {
        name: "description",
        content: "Bilingual parent portal for student progress, Bakong KHQR fees, bus events, and messaging.",
      },
    ],
  }),
  component: ParentRoute,
});

function ParentRoute() {
  return <ParentApp />;
}
