import { createFileRoute } from "@tanstack/react-router";
import { ApplicantPortal } from "@/components/portals/applicant-portal";

export const Route = createFileRoute("/applicant")({
  head: () => ({
    meta: [
      { title: "Applicant Portal — School OS" },
      {
        name: "description",
        content: "Multi-step online admissions and application status tracking for prospective students.",
      },
    ],
  }),
  component: ApplicantRoute,
});

function ApplicantRoute() {
  return <ApplicantPortal />;
}
