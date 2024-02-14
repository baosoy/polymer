import useStore from "../../state/store";
import { currency } from "../../utils/currency";
import Button from "../Button";
import ColumnInner from "../ColumnInner";
import ColumnInnerTitle from "../ColumnInnerTitle";

const Autorecycler = () => {
  const store = useStore();
  return (
    <ColumnInner
      collapsible
      defaultOpen={false}
      title={`Autorecyclers (${store.autorecyclers})`}
    >
      <p className="text-gray-500 mb-4">
        Autorecyclers allow you to automatically refine plastic waste into new
        plastic sheet material
      </p>
      <div>
        <ColumnInnerTitle title="Autorecyclers" />
        <div className="flex gap-1 items-center mb-4">
          <span className="text-sm">{store.autorecyclers}</span>
        </div>
      </div>
      <div>
        <ColumnInnerTitle title="Autorecycler Price" />
        <div className="flex gap-1 items-center mb-4">
          <span className="text-sm">{currency(store.autorecyclerPrice)}</span>
        </div>
      </div>

      <Button
        disabled={store.funds < store.autorecyclerPrice}
        onClick={store.purchaseAutorecycler}
      >
        Purchase Autorecycler ({currency(store.autorecyclerPrice)})
      </Button>
    </ColumnInner>
  );
};

export default Autorecycler;
