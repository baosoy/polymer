import useStore from "../../state/store";
import { currency } from "../../utils/currency";
import Button from "../Button";
import ColumnInner from "../ColumnInner";
import ColumnInnerTitle from "../ColumnInnerTitle";

const MARKETING_SLOGANS = [
  "Print flyers",
  "Send a mass mail",
  "Buy a tube ad",
  "Rebranding Project",
  "Give out branded bottles",
  "Go to a trade fair",
  "Sponsor a marathon",
  "Setup a DIY plastic workshop",
  "Purchase Superbowl Ad",
  "Cable TV Advert",
  "Radio Interview",
  "Sponsor a Building",
  "Hot Air Balloon",
];

const Marketing = () => {
  const store = useStore();
  return (
    <ColumnInner
      collapsible
      defaultOpen={false}
      title={`Marketing (${store.marketing})`}
    >
      <p className="text-gray-500 mb-4">Marketing helps increase the demand.</p>
      <div>
        <ColumnInnerTitle title="Marketing Level" />
        <div className="flex gap-1 items-center mb-4">
          <span className="text-sm">{store.marketing}</span>
        </div>
      </div>

      <Button
        disabled={store.funds < store.marketingPrice}
        onClick={store.purchaseMarketing}
      >
        {MARKETING_SLOGANS[store.marketing]} ({currency(store.marketingPrice)})
      </Button>
    </ColumnInner>
  );
};

export default Marketing;
