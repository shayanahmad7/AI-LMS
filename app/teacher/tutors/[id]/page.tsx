import { AITutorEditor } from "@/components/teacher/ai-tutor-editor"

export default function AITutorEditorPage({ params }: { params: { id: string } }) {
  return <AITutorEditor tutorId={params.id} />
}
