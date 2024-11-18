import { useEffect, useState } from "react";
import { useListStore } from "../store/listStore"; // Zustand store imported here
import { useGetListData } from "../api/getListData";
import { Card, DeletedCard } from "./Cards";
import { Spinner } from "./Spinner";

export const Entrypoint = () => {
  const { visibleCards, setVisibleCards, deletedCards } = useListStore(); // Access Zustand state and actions
  const [isRevealed, setIsRevealed] = useState(false);
  const toggleReveal = () => {
    setIsRevealed(!isRevealed);
  };
  const listQuery = useGetListData();

  // TOOD
  // const deletedCards: DeletedListItem[] = [];

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }

    setVisibleCards(listQuery.data?.filter((item) => item.isVisible) ?? []);
  }, [listQuery.data, listQuery.isLoading]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <h1 className="mb-1 font-medium text-lg">
          My Awesome List ({visibleCards.length})
        </h1>
        <div className="flex flex-col gap-y-3">
          {visibleCards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            Deleted Cards ({deletedCards.length})
          </h1>
          <button
            onClick={toggleReveal}
            className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
          >
            {isRevealed ? "Hide" : "Reveal"}
          </button>
        </div>
        {isRevealed && (
          <div className="flex flex-col gap-y-3">
            {deletedCards.map((card) => (
              <DeletedCard key={card.id} id={card.id} title={card.title} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
