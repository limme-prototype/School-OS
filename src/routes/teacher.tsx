import { createFileRoute } from "@tanstack/react-router";
import { TeacherApp } from "@/components/teacher-app";

export const Route = createFileRoute("/teacher")({
  head: () => ({
    meta: [
      { title: "Teacher App — School OS" },
      {
        name: "description",
        content: "Mobile classroom schedule, fast attendance with bus sync, homework posting, and grade entry.",
      },
    ],
  }),
  component: TeacherRoute,
});

function TeacherRoute() {
  return <TeacherApp />;
}
