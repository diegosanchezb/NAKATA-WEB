interface Props {
  className?: string;
}

export const Separator = ({ className }) => {
  return <div className={`bg-pink-300 h-px my-5 ${className}`} />;
};
