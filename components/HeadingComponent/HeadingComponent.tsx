interface HeadingComponentProps {
  title: string;
  descriptons: string;
}

const HeadingComponent: React.FC<HeadingComponentProps> = ({
  title,
  descriptons,
}) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tighter">{title}</h2>
      <p className="text-sm opacity-75">{descriptons}</p>
    </div>
  );
};

export default HeadingComponent;
