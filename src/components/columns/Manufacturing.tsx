import useStore from "../../state/store";
import { currency } from "../../utils/currency";
import Button from "../Button";
import ColumnInner from "../ColumnInner";
import ColumnInnerTitle from "../ColumnInnerTitle";

const Manufacturing = () => {
  const store = useStore();
  return (
    <ColumnInner title="Manufacturing">
      <div>
        <ColumnInnerTitle title="Plastic Waste" />
        <div className="flex gap-1 items-center mb-4">
          <span
            className={[
              "text-sm",
              store.plasticWaste === 0 ? "text-red-500" : "",
            ].join(" ")}
          >
            {store.plasticWaste} kg
          </span>
        </div>
      </div>
      <div>
        <ColumnInnerTitle title="Waste per meter" />
        <div className="flex gap-1 items-center mb-4">
          <span className="text-sm">
            {store.plasticWastePerMeter} / m<sup>2</sup>
          </span>
        </div>
      </div>
      <div>
        <ColumnInnerTitle title="Raw Materials Cost" />
        <div className="flex gap-1 items-center mb-4">
          <span className="text-sm">
            {currency(store.plasticWasteCost)} /{" "}
            {store.plasticWastePurchaseSize} kg
          </span>
        </div>
      </div>
      <Button
        onClick={store.purchasePlasticWaste}
        disabled={store.funds < store.plasticWasteCost}
      >
        Purchase Plastic Waste
      </Button>
    </ColumnInner>
  );
};

export default Manufacturing;
