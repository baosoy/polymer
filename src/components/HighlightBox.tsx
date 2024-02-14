import { FunctionComponent } from "react";

interface Props {
  title: string;
  value: string;
}

const HighlightBox: FunctionComponent<Props> = ({ title, value }) => {
  return (
    <div className="flex-1 border border-lime-400 basis-1/2 overflow-hidden bg-lime-300 rounded-lg py-4 px-4">
      <h2 className="text-xs text-lime-700 font-medium uppercase mb-2">
        {title}
      </h2>
      <span className="text-2xl font-medium">{value}</span>
    </div>
  );
};

export default HighlightBox;
