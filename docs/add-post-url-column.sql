-- Adicionar coluna post_url na tabela lc_links
-- Esta coluna vai armazenar o link do post/thread original onde o link foi encontrado

ALTER TABLE lc_links 
ADD COLUMN post_url TEXT NULL;

-- Adicionar comentário explicativo
COMMENT ON COLUMN lc_links.post_url IS 'URL do post/thread original (Twitter/LinkedIn) onde o link foi compartilhado';

-- Opcional: criar um índice para performance se precisar buscar por post_url
-- CREATE INDEX idx_lc_links_post_url ON lc_links(post_url) WHERE post_url IS NOT NULL;