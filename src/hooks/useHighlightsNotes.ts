import { useState, useEffect, useCallback } from 'react';
import { IndexedDbService } from '@/services/indexedDbService';
import type { VerseHighlight, VerseNote, HighlightColor } from '@/types/bible';

interface UseHighlightsNotesProps {
  dbService: IndexedDbService | null;
  language: string;
  book: string;
  chapter: number;
}

export function useHighlightsNotes({ dbService, language, book, chapter }: UseHighlightsNotesProps) {
  const [highlights, setHighlights] = useState<VerseHighlight[]>([]);
  const [notes, setNotes] = useState<VerseNote[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load highlights and notes for current chapter
  useEffect(() => {
    const loadData = async () => {
      if (!dbService || !book) return;
      
      setIsLoading(true);
      try {
        const [chapterHighlights, chapterNotes] = await Promise.all([
          dbService.getHighlightsForChapter(language, book, chapter),
          dbService.getNotesForChapter(language, book, chapter),
        ]);
        setHighlights(chapterHighlights);
        setNotes(chapterNotes);
      } catch (error) {
        console.error('Error loading highlights/notes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dbService, language, book, chapter]);

  const addHighlight = useCallback(async (verse: number, color: HighlightColor) => {
    if (!dbService) return;
    
    const id = `${language}-${book}-${chapter}-${verse}-${Date.now()}`;
    const highlight: VerseHighlight = {
      id,
      language,
      book,
      chapter,
      verse,
      color,
      timestamp: Date.now(),
    };
    
    try {
      await dbService.saveHighlight(highlight);
      setHighlights(prev => [...prev.filter(h => h.verse !== verse), highlight]);
    } catch (error) {
      console.error('Error saving highlight:', error);
    }
  }, [dbService, language, book, chapter]);

  const removeHighlight = useCallback(async (verse: number) => {
    if (!dbService) return;
    
    const highlight = highlights.find(h => h.verse === verse);
    if (!highlight) return;
    
    try {
      await dbService.deleteHighlight(highlight.id);
      setHighlights(prev => prev.filter(h => h.verse !== verse));
    } catch (error) {
      console.error('Error removing highlight:', error);
    }
  }, [dbService, highlights]);

  const addOrUpdateNote = useCallback(async (verse: number, text: string) => {
    if (!dbService) return;
    
    const existingNote = notes.find(n => n.verse === verse);
    const id = existingNote?.id || `${language}-${book}-${chapter}-${verse}-note-${Date.now()}`;
    
    const note: VerseNote = {
      id,
      language,
      book,
      chapter,
      verse,
      text,
      timestamp: existingNote?.timestamp || Date.now(),
      updatedAt: Date.now(),
    };
    
    try {
      await dbService.saveNote(note);
      setNotes(prev => [...prev.filter(n => n.verse !== verse), note]);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  }, [dbService, language, book, chapter, notes]);

  const deleteNote = useCallback(async (verse: number) => {
    if (!dbService) return;
    
    const note = notes.find(n => n.verse === verse);
    if (!note) return;
    
    try {
      await dbService.deleteNote(note.id);
      setNotes(prev => prev.filter(n => n.verse !== verse));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }, [dbService, notes]);

  const getHighlightForVerse = useCallback((verse: number): VerseHighlight | undefined => {
    return highlights.find(h => h.verse === verse);
  }, [highlights]);

  const getNoteForVerse = useCallback((verse: number): VerseNote | undefined => {
    return notes.find(n => n.verse === verse);
  }, [notes]);

  const hasHighlight = useCallback((verse: number): boolean => {
    return highlights.some(h => h.verse === verse);
  }, [highlights]);

  const hasNote = useCallback((verse: number): boolean => {
    return notes.some(n => n.verse === verse);
  }, [notes]);

  return {
    highlights,
    notes,
    isLoading,
    addHighlight,
    removeHighlight,
    addOrUpdateNote,
    deleteNote,
    getHighlightForVerse,
    getNoteForVerse,
    hasHighlight,
    hasNote,
  };
}
