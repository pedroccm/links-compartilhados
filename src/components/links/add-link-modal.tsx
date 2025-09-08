'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CreateLinkData } from '@/types/links'
import { Loader2, X } from 'lucide-react'

const formSchema = z.object({
  url: z.string().url('URL do conteúdo inválida'),
  post_url: z.string().url('URL do post inválida').optional().or(z.literal('')),
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional(),
  author: z.string().optional(),
  platform: z.enum(['twitter', 'linkedin', 'other']),
})

type FormData = z.infer<typeof formSchema>

interface AddLinkModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: CreateLinkData) => Promise<{ success: boolean; error?: string }>
}

export function AddLinkModal({ open, onOpenChange, onSubmit }: AddLinkModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
      post_url: '',
      title: '',
      description: '',
      author: '',
      platform: 'other',
    },
  })

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true)
    
    const linkData: CreateLinkData = {
      ...data,
      post_url: data.post_url || undefined,
      tags,
    }

    const result = await onSubmit(linkData)
    
    if (result.success) {
      form.reset()
      setTags([])
      setTagInput('')
      onOpenChange(false)
    }
    
    setIsLoading(false)
  }

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      form.reset()
      setTags([])
      setTagInput('')
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Link</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Conteúdo *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://artigo.com/exemplo"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="post_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Post/Thread</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://twitter.com/user/status/123... ou https://linkedin.com/posts/..."
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-muted-foreground">
                    Link do post no Twitter/LinkedIn onde você encontrou este conteúdo
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Título do link"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Breve descrição do conteúdo..."
                      className="resize-none"
                      rows={3}
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Autor</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome do autor"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plataforma</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar plataforma" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="other">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <FormLabel>Tags</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="Adicionar tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddTag}
                  disabled={!tagInput.trim() || isLoading}
                >
                  Adicionar
                </Button>
              </div>
              
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 border rounded-md bg-muted/50">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="gap-1"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive"
                        disabled={isLoading}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Adicionar Link
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}