import { createFileRoute } from "@tanstack/react-router";
import { AdminPortal } from "@/components/admin-portal";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — School OS" },
      {
        name: "description",
        content: "School administration workspace for SIS student records, Bakong finance, fleet transport, and roles.",
      },
    ],
  }),
  component: AdminRoute,
});

function AdminRoute() {
  return <AdminPortal />;
}
