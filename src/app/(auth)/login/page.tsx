'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      console.log('Fazendo login com:', email)
      const { error } = await signIn(email, password)
      
      if (error) {
        console.log('Erro no login:', error.message)
        setError(error.message)
        setIsLoading(false)
      } else {
        console.log('Login successful!')
        // Redirecionar imediatamente
        router.push('/dashboard')
        setIsLoading(false)
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Erro ao fazer login')
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Entrar
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Entre com seu email e senha para acessar sua conta
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Entrar
          </Button>
        </form>

        <div className="text-center text-sm">
          <Link
            href="/register"
            className="text-primary hover:underline"
          >
            Não tem uma conta? Cadastre-se
          </Link>
        </div>
        
        <div className="text-center text-sm">
          <Link
            href="/forgot-password"
            className="text-muted-foreground hover:underline"
          >
            Esqueceu sua senha?
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}