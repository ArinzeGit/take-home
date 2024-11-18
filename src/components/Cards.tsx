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
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          <ExpandButton onClick={onExpand}>
            {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </ExpandButton>
          <DeleteButton onClick={() => deleteCard(id)} />
        </div>
      </div>
      {isExpanded && <p className="text-sm">{description}</p>}
    </div>
  );
};

export const DeletedCard: FC<DeletedCardProps> = ({ id, title }) => {
  const { revertCard } = useListStore(); // Access Zustand action
  return (
    <div className="border border-black px-2 py-1.5 flex justify-between">
      <h1 className="font-medium">{title}</h1>
      <RevertButton onClick={() => revertCard(id)} />
    </div>
  );
};
