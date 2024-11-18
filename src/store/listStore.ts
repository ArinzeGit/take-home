//Zustand Store created to manage state globally
import { create } from "zustand";
import { ListItem } from "../api/getListData";

type Store = {
  visibleCards: ListItem[];
  deletedCards: ListItem[];
  setVisibleCards: (cards: ListItem[]) => void;
  deleteCard: (id: number) => void;
};

export const useListStore = create<Store>((set) => ({
  visibleCards: [],
  deletedCards: [],
  setVisibleCards: (cards) => set({ visibleCards: cards }),
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
}));
