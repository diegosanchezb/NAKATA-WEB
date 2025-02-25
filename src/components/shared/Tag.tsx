type TagType = "disponible" | "agotado";
interface Props {
  contentTag: TagType;
}

const getTagColor = (content: TagType) => {
  const lowerContent = content.toLocaleLowerCase();
  if (lowerContent === "disponible") return "bg-pink-300";
  if (lowerContent === "agotado") return "bg-pink-300";

  return "bg-pink-300";
};

export const Tag = ({ contentTag }: Props) => {
  return (
    <div className={`text-black w-fit px-2 ${getTagColor(contentTag)}`}>
      <p className="uppercase text-s font-medium">{contentTag}</p>
    </div>
  );
};
