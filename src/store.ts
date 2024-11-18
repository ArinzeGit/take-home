//Zustand Store created to manage state globally
import { create } from "zustand";
import { ListItem } from "./api/getListData";

type Store = {
  visibleCards: ListItem[];
  deletedCards: ListItem[];
  expandedCards: Set<number>; // Tracks expanded card IDs
  setVisibleCards: (cards: ListItem[]) => void;
  deleteCard: (id: number) => void;
  revertCard: (id: number) => void;
  toggleExpandCard: (id: number) => void;
  persistState: () => void;
  loadPersistedState: () => void;
  refreshCards: (newCards: ListItem[]) => void; // Refresh functionality
};

export const useListStore = create<Store>((set) => ({
    visibleCards: [],
    deletedCards: [],
    expandedCards: new Set<number>(), // Initialize with an empty set

    // Set visible cards
    setVisibleCards: (cards) => set({ visibleCards: cards }),

    // Delete a card
    deleteCard: (id) =>
        set((state) => {
            const deletedCard = state.visibleCards.find((card) => card.id === id);
            return {
                visibleCards: state.visibleCards.filter((card) => card.id !== id),
                deletedCards: deletedCard
                ? [...state.deletedCards, deletedCard]
                : state.deletedCards,
            };
        }),
    
    // Revert a card from deleted back to visible
    revertCard: (id) =>
        set((state) => {
          const revertedCard = state.deletedCards.find((card) => card.id === id);
          return {
            visibleCards: revertedCard
              ? [...state.visibleCards, revertedCard]
              : state.visibleCards,
            deletedCards: state.deletedCards.filter((card) => card.id !== id),
          };
        }),

        // Toggle card expansion
  toggleExpandCard: (id) =>
    set((state) => {
      const updatedExpandedCards = new Set(state.expandedCards);
      if (updatedExpandedCards.has(id)) {
        updatedExpandedCards.delete(id); // Collapse the card
      } else {
        updatedExpandedCards.add(id); // Expand the card
      }
      return { expandedCards: updatedExpandedCards };
    }),

  // Persist the current state to localStorage
  persistState: () =>
    set((state) => {
      const stateToPersist = {
        visibleCards: state.visibleCards,
        deletedCards: state.deletedCards,
        expandedCards: Array.from(state.expandedCards),
      };
      localStorage.setItem("listState", JSON.stringify(stateToPersist));
      return state; // Explicitly return the current state
    }),

  // Load the persisted state from localStorage
  loadPersistedState: () =>
    set(() => {
      const persistedState = localStorage.getItem("listState");
      if (persistedState) {
        const { visibleCards, deletedCards, expandedCards } = JSON.parse(
          persistedState
        );
        return {
          visibleCards,
          deletedCards,
          expandedCards: new Set<number>(expandedCards),
        };
      }
      return {}; // Return an empty object if no state is found
    }),

  // Refresh the list with new cards (replace visibleCards entirely)
  refreshCards: (newCards) =>
    set(() => ({
      visibleCards: newCards,
      deletedCards: [],
      expandedCards: new Set<number>(),
    })),
    
}));
