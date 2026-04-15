-- Adiciona coluna is_featured à tabela posts
-- Apenas um post pode estar em destaque por vez (enforced via application logic)
ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false;
