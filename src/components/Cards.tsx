import { FC } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton, RevertButton } from "./Buttons";
import { ChevronUpIcon, ChevronDownIcon } from "./icons";
import { useListStore } from "../store"; // Zustand store imported here

type CardProps = {
  id: ListItem["id"];
  title: ListItem["title"];
  description: ListItem["description"];
  isExpanded: boolean;
  onExpand: () => void;
};

type DeletedCardProps = {
  id: ListItem["id"];
  title: ListItem["title"];
};

export const Card: FC<CardProps> = ({
  id,
  title,
  description,
  isExpanded,
  onExpand,
}) => {
  const { deleteCard } = useListStore(); // Access Zustand action

  return (
    <div className="border border-gray-300 rounded-lg shadow-md px-4 py-3 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h1 className="font-semibold text-lg text-gray-800">{title}</h1>
        <div className="flex gap-2">
          <ExpandButton onClick={onExpand}>
            {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </ExpandButton>
          <DeleteButton onClick={() => deleteCard(id)} />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export const DeletedCard: FC<DeletedCardProps> = ({ id, title }) => {
  const { revertCard } = useListStore(); // Access Zustand action
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-sm px-4 py-3 flex justify-between items-center hover:bg-gray-200 transition-all">
      <h1 className="font-semibold text-gray-800">{title}</h1>
      <RevertButton onClick={() => revertCard(id)} />
    </div>
  );
};
