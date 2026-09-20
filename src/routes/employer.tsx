import { createFileRoute } from "@tanstack/react-router";
import { EmployerPortal } from "@/components/portals/employer-portal";

export const Route = createFileRoute("/employer")({
  head: () => ({
    meta: [
      { title: "Employer Portal — School OS" },
      {
        name: "description",
        content: "Corporate partner gateway for student internships, vocational apprenticeships, and recruiting.",
      },
    ],
  }),
  component: EmployerRoute,
});

function EmployerRoute() {
  return <EmployerPortal />;
}
