import axios from 'axios';
import type { Note } from '../types/note.ts';

const API_URL = 'https://notehub-public.goit.study/api';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  // page: number;
  // perPage: number;
}
export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`${API_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(`${API_URL}/notes`, {
    params: {
      page,
      perPage: 12,
      search,
      ...(tag && tag !== 'all' ? { tag } : {}),
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export interface CreateNotePayload {
  title: string;
  content?: string;
  tag: Note['tag'];
}

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const response = await axios.post<Note>(`${API_URL}/notes`, note, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(`${API_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};