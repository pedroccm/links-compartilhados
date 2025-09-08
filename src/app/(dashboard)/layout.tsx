import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const handleSearch = (query: string) => {
    // TODO: Implement search functionality
    console.log('Searching for:', query)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}