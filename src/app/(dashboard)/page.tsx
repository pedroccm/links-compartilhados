'use client'

import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Bem-vindo, {user?.email}!
            </p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            Sair
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total de Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Nenhum link adicionado ainda
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Não Lidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Links para ler
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Favoritos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Links favoritos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sistema de Links Funcionando!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>✅ Autenticação funcionando</p>
                <p>✅ Dashboard carregado</p>
                <p>✅ Usuário logado: {user?.email}</p>
                
                <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Sistema Funcionando!
                  </h3>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Agora vamos implementar o resto das funcionalidades passo a passo.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}