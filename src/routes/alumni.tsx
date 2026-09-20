import { createFileRoute } from "@tanstack/react-router";
import { AlumniPortal } from "@/components/portals/alumni-portal";

export const Route = createFileRoute("/alumni")({
  head: () => ({
    meta: [
      { title: "Alumni Portal — School OS" },
      {
        name: "description",
        content: "Lifelong community network, reunion events, and student mentorship directory.",
      },
    ],
  }),
  component: AlumniRoute,
});

function AlumniRoute() {
  return <AlumniPortal />;
}
