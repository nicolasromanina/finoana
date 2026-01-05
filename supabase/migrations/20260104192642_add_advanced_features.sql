/*
  # Add Advanced Features for Theological Teaching

  1. New Tables
    - `saved_passages`
      - `id` (uuid, primary key)
      - `conversation_id` (uuid, foreign key)
      - `reference` (text) - Bible reference (e.g., "Jean 3:16")
      - `content` (text) - The passage content
      - `notes` (text) - User notes on the passage
      - `created_at` (timestamptz)
    
    - `theological_topics`
      - `id` (uuid, primary key)
      - `slug` (text, unique) - Topic identifier
      - `title_fr` (text)
      - `title_mg` (text)
      - `description_fr` (text)
      - `description_mg` (text)
      - `catechism_references` (jsonb) - References to catechisms
      - `confessions` (text[]) - Related confessions
      - `key_verses` (text[]) - Key Bible verses
      - `created_at` (timestamptz)
    
    - `confessional_references`
      - `id` (uuid, primary key)
      - `source` (text) - Westminster, Belgic, Heidelberg, etc
      - `section` (text) - Section/question reference
      - `content_fr` (text)
      - `content_mg` (text)
      - `topic` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access
*/

CREATE TABLE IF NOT EXISTS saved_passages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  reference text NOT NULL,
  content text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS theological_topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title_fr text NOT NULL,
  title_mg text NOT NULL,
  description_fr text,
  description_mg text,
  catechism_references jsonb DEFAULT '{}',
  confessions text[] DEFAULT '{}',
  key_verses text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS confessional_references (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL,
  section text NOT NULL,
  content_fr text NOT NULL,
  content_mg text,
  topic text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE saved_passages ENABLE ROW LEVEL SECURITY;
ALTER TABLE theological_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE confessional_references ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view saved passages"
  ON saved_passages
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can save passages"
  ON saved_passages
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view theological topics"
  ON theological_topics
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can view confessional references"
  ON confessional_references
  FOR SELECT
  TO anon
  USING (true);

CREATE INDEX saved_passages_conversation_id_idx ON saved_passages(conversation_id);
CREATE INDEX theological_topics_slug_idx ON theological_topics(slug);
CREATE INDEX confessional_references_source_idx ON confessional_references(source);
CREATE INDEX confessional_references_topic_idx ON confessional_references(topic);