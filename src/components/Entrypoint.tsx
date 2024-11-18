import { useEffect, useState } from "react";
import { useListStore } from "../store"; // Zustand store imported here
import { useGetListData } from "../api/getListData";
import { Card, DeletedCard } from "./Cards";
import { Spinner } from "./Spinner";
import { ToggleButton } from "./ToggleButton"; //Generic Toggle button for reveal/hide feature

export const Entrypoint = () => {
  const {
    visibleCards,
    deletedCards,
    expandedCards,
    toggleExpandCard,
    persistState,
    loadPersistedState,
    refreshCards,
  } = useListStore(); // Access Zustand state and actions

  const [isRevealed, setIsRevealed] = useState(false);
  const toggleReveal = () => setIsRevealed((prev) => !prev);
  const listQuery = useGetListData();

  // Load persisted state on component mount
  useEffect(() => {
    loadPersistedState();
  }, []);

  // Persist state to localStorage whenever the state changes
  useEffect(() => {
    persistState();
  }, [visibleCards, deletedCards, expandedCards]);

  // Initialize visible cards from fetched data (if not already persisted) that is first render
  useEffect(() => {
    if (!listQuery.isLoading && listQuery.data && visibleCards.length === 0) {
      refreshCards(listQuery.data.filter((item) => item.isVisible) ?? []); // Use the new cards from react-query
    }
  }, [listQuery.data, listQuery.isLoading, visibleCards.length]);

  // Refresh functionality: fetch new data and reset the store
  const handleRefresh = () => {
    listQuery.refetch(); // Triggers a new data fetch using the refetch() method provided by react-query's useQuery hook
    if (!listQuery.data) return;
    refreshCards(listQuery.data.filter((item) => item.isVisible) ?? []); // Use the new cards from react-query
  };

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16 justify-center">
      <div className="w-[clamp(300px,30%,600px)]">
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
              isExpanded={expandedCards.has(card.id)} // Pass expansion state
              onExpand={() => toggleExpandCard(card.id)} // Toggle expansion
            />
          ))}
        </div>
      </div>
      <div className="w-[clamp(400px,30%,600px)]">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            Deleted Cards ({deletedCards.length})
          </h1>
          <ToggleButton
            isActive={isRevealed}
            onToggle={toggleReveal}
            activeLabel="Hide"
            inactiveLabel="Reveal"
          />
          <button
            onClick={handleRefresh}
            className="text-white text-sm transition-colors hover:bg-gray-800 bg-black rounded px-3 py-1"
          >
            Refresh
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
