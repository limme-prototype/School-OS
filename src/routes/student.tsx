import { createFileRoute } from "@tanstack/react-router";
import { StudentApp } from "@/components/student-app";

export const Route = createFileRoute("/student")({
  head: () => ({
    meta: [
      { title: "Student App — School OS" },
      {
        name: "description",
        content: "Bilingual timetable, homework tracking, academic results, and school bus status for students.",
      },
    ],
  }),
  component: StudentRoute,
});

function StudentRoute() {
  return <StudentApp />;
}
