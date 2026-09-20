import { createFileRoute } from "@tanstack/react-router";
import { BusStaffApp } from "@/components/bus-staff-app";

export const Route = createFileRoute("/bus-staff")({
  head: () => ({
    meta: [
      { title: "Bus Staff App — School OS" },
      {
        name: "description",
        content: "Offline-tolerant bus trip management, rider boarding checks, and incident reporting prototype.",
      },
    ],
  }),
  component: BusStaffRoute,
});

function BusStaffRoute() {
  return <BusStaffApp />;
}
