import { FC } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton, RevertButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";

type CardProps = {
  title: ListItem["title"];
  description: ListItem["description"];
};

type DeletedCardProps = {
  title: ListItem["title"];
};

export const Card: FC<CardProps> = ({ title, description }) => {
  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          <ExpandButton>
            <ChevronUpIcon />
          </ExpandButton>
          <DeleteButton />
        </div>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export const DeletedCard: FC<DeletedCardProps> = ({ title }) => {
  return (
    <div className="border border-black px-2 py-1.5 flex justify-between">
      <h1 className="font-medium">{title}</h1>
      <RevertButton />
    </div>
  );
};
