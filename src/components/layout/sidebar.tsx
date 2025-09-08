'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Home,
  Star,
  Archive,
  Tag,
  Folder,
  Twitter,
  Linkedin,
  Globe,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock data - will be replaced with real data later
const mockStats = {
  total: 42,
  unread: 8,
  favorites: 12,
  archived: 5,
  twitter: 15,
  linkedin: 18,
  other: 9,
}

const mockCategories = [
  { id: '1', name: 'Desenvolvimento', count: 15, color: '#3b82f6' },
  { id: '2', name: 'Design', count: 8, color: '#f59e0b' },
  { id: '3', name: 'Negócios', count: 12, color: '#10b981' },
  { id: '4', name: 'Tecnologia', count: 7, color: '#8b5cf6' },
]

const mockTags = [
  'react', 'nextjs', 'typescript', 'design', 'ux', 'startup',
  'ai', 'machine-learning', 'web-development', 'productivity'
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navigation = [
    {
      name: 'Todos os Links',
      href: '/dashboard',
      icon: Home,
      count: mockStats.total,
    },
    {
      name: 'Não Lidos',
      href: '/dashboard/unread',
      icon: TrendingUp,
      count: mockStats.unread,
    },
    {
      name: 'Favoritos',
      href: '/dashboard/favorites',
      icon: Star,
      count: mockStats.favorites,
    },
    {
      name: 'Arquivados',
      href: '/dashboard/archived',
      icon: Archive,
      count: mockStats.archived,
    },
  ]

  const platforms = [
    {
      name: 'Twitter',
      href: '/dashboard/platform/twitter',
      icon: Twitter,
      count: mockStats.twitter,
    },
    {
      name: 'LinkedIn',
      href: '/dashboard/platform/linkedin',
      icon: Linkedin,
      count: mockStats.linkedin,
    },
    {
      name: 'Outros',
      href: '/dashboard/platform/other',
      icon: Globe,
      count: mockStats.other,
    },
  ]

  const NavItem = ({ item, isActive }: { item: any; isActive: boolean }) => (
    <Link href={item.href}>
      <Button
        variant={isActive ? 'secondary' : 'ghost'}
        className={cn(
          'w-full justify-start',
          isActive && 'bg-secondary'
        )}
      >
        <item.icon className="mr-2 h-4 w-4" />
        <span className="flex-1">{item.name}</span>
        {item.count > 0 && (
          <Badge variant="secondary" className="ml-auto">
            {item.count}
          </Badge>
        )}
      </Button>
    </Link>
  )

  return (
    <aside className="w-64 border-r border-border bg-background">
      <ScrollArea className="h-full py-6">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {/* Main Navigation */}
            <div className="pb-4">
              <h2 className="mb-2 px-2 text-lg font-semibold">Navegação</h2>
              <div className="space-y-1">
                {navigation.map((item) => (
                  <NavItem
                    key={item.href}
                    item={item}
                    isActive={pathname === item.href}
                  />
                ))}
              </div>
            </div>

            <Separator />

            {/* Platforms */}
            <div className="py-4">
              <h2 className="mb-2 px-2 text-lg font-semibold">Plataformas</h2>
              <div className="space-y-1">
                {platforms.map((item) => (
                  <NavItem
                    key={item.href}
                    item={item}
                    isActive={pathname === item.href}
                  />
                ))}
              </div>
            </div>

            <Separator />

            {/* Categories */}
            <div className="py-4">
              <div className="flex items-center justify-between mb-2 px-2">
                <h2 className="text-lg font-semibold">Categorias</h2>
                <Button variant="ghost" size="sm">
                  <Folder className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-1">
                {mockCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/dashboard/category/${category.id}`}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      <div
                        className="mr-2 h-3 w-3 rounded-sm"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="flex-1">{category.name}</span>
                      <Badge variant="secondary" className="ml-auto">
                        {category.count}
                      </Badge>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            <Separator />

            {/* Tags */}
            <div className="py-4">
              <div className="flex items-center justify-between mb-2 px-2">
                <h2 className="text-lg font-semibold">Tags Populares</h2>
                <Button variant="ghost" size="sm">
                  <Tag className="h-4 w-4" />
                </Button>
              </div>
              <div className="px-2">
                <div className="flex flex-wrap gap-1">
                  {mockTags.slice(0, 8).map((tag) => (
                    <Link key={tag} href={`/dashboard/tag/${tag}`}>
                      <Badge
                        variant="outline"
                        className="text-xs cursor-pointer hover:bg-secondary"
                      >
                        #{tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 h-6 text-xs w-full"
                >
                  Ver todas as tags
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}