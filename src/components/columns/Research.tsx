import useStore, { ResearchArgs } from "../../state/store";
import { currency } from "../../utils/currency";
import Button from "../Button";
import ColumnInner from "../ColumnInner";
import ColumnInnerTitle from "../ColumnInnerTitle";

const RESEARCH_OPTIONS: (ResearchArgs & {
  title: string;
  description: string;
})[] = [
  {
    title: "Optimise Plastic Sheet Production",
    description:
      "Brings down the amount of plastic waste used per meter by 75%",
    funds: 1000,
    plasticWastePerMeter: 0.75,
  },
  {
    title: "Improved AI Technology",
    description: "Increases the Autorecycler productivity by 2x",
    funds: 2000,
    autorecyclerProductivity: 2,
  },
  {
    title: "Better Waste Sorting",
    description: "Cuts the cost of plastic waste by 50%",
    funds: 3000,
    plasticWasteCost: 0.5,
  },
];

const Research = () => {
  const store = useStore();

  const availableResearch = RESEARCH_OPTIONS[store.research];
  return (
    <ColumnInner
      collapsible
      defaultOpen={false}
      title={`Research (${store.research})`}
    >
      <p className="text-gray-500 mb-4">
        Research allows you to improve production speeds, and bring down costs.
      </p>
      {availableResearch ? (
        <>
          <div>
            <ColumnInnerTitle title={"Available Research"} />
            <div>
              <h2 className="text-sm font-medium mb-1">
                {availableResearch.title}
              </h2>
              <p className="text-xs mb-4">{availableResearch.description}</p>
            </div>
          </div>

          <Button
            disabled={store.funds < availableResearch.funds}
            onClick={() => {
              const { title, description, ...rest } = availableResearch;
              store.completeResearch(rest);
            }}
          >
            Purchase ({currency(availableResearch.funds)})
          </Button>
        </>
      ) : (
        <span className="font-medium">Research completed.</span>
      )}
    </ColumnInner>
  );
};

export default Research;
