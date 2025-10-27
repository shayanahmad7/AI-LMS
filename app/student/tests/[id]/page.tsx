import { TestTaking } from "@/components/student/test-taking"

export default function TakeTestPage({ params }: { params: { id: string } }) {
  return <TestTaking testId={params.id} />
}
