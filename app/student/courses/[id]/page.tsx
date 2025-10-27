import { CourseTopicView } from "@/components/student/course-topic-view"

export default function StudentCoursePage({ params }: { params: { id: string } }) {
  return <CourseTopicView courseId={params.id} />
}
