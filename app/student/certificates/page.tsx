import { CertificateViewer } from "@/components/student/certificate-viewer"
import { PageHeader } from "@/components/ui/page-header"

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Certificates"
        description="View and download your earned certificates"
        showBack
        backHref="/student"
        breadcrumbs={[{ label: "Dashboard", href: "/student" }, { label: "Certificates" }]}
      />

      <main className="container mx-auto px-4 py-8">
        <CertificateViewer />
      </main>
    </div>
  )
}
