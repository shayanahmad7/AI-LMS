import { StudentDetailView } from "@/components/teacher/student-detail-view"

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  return <StudentDetailView studentId={params.id} />
}
