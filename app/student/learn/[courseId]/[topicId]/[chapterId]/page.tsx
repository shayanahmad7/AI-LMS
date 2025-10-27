import { LearningInterface } from "@/components/student/learning-interface"

export default function LearningPage({
  params,
}: {
  params: { courseId: string; topicId: string; chapterId: string }
}) {
  return <LearningInterface courseId={params.courseId} topicId={params.topicId} chapterId={params.chapterId} />
}
