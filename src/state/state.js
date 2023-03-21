import create from 'zustand';

export const useNotesStore = create((set) => ({
  notes: [],
  addNewNote: (newNote) =>
    set((state) => ({ notes: [newNote, ...state.notes] })),
  removeNotes: () => set({ notes: [] }),
}));
