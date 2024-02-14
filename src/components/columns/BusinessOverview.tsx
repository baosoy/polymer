import useStore from "../../state/store";
import { currency } from "../../utils/currency";
import Button from "../Button";
import ColumnInner from "../ColumnInner";
import ColumnInnerTitle from "../ColumnInnerTitle";

const BusinessOverview = () => {
  const store = useStore();
  return (
    <ColumnInner title="Business Overview">
      <div>
        <ColumnInnerTitle title="Sale Price" />
        <div className="flex gap-1 items-center mb-4">
          <span className="text-sm">{currency(store.price)}</span>
        </div>
      </div>
      <div>
        <ColumnInnerTitle title="Unsold Recycled Plastic" />
        <div className="flex gap-1 items-center mb-4">
          <span className="text-sm">
            {store.unsoldMeters} m<sup>2</sup>
          </span>
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <Button
          disabled={store.price <= store.priceInterval}
          onClick={store.lowerPrice}
        >
          Decrease Price (-{store.priceInterval.toFixed(2)} €)
        </Button>
        <Button onClick={store.increasePrice}>
          Increase Price (+{store.priceInterval.toFixed(2)} €)
        </Button>
      </div>
      <Button
        disabled={store.plasticWaste < store.plasticWastePerMeter}
        onClick={store.generateRecycledPlastic}
      >
        Generate Plastic Sheet (1m<sup>2</sup>)
      </Button>
    </ColumnInner>
  );
};

export default BusinessOverview;
