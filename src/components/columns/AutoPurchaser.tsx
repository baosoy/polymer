import useStore from "../../state/store";
import { currency } from "../../utils/currency";
import Button from "../Button";
import ColumnInner from "../ColumnInner";
import ColumnInnerTitle from "../ColumnInnerTitle";

const Autopurchaser = () => {
  const store = useStore();
  return (
    <ColumnInner collapsible defaultOpen={false} title={`Autopurchaser`}>
      <p className="text-gray-500 mb-4">
        Autopurchaser allows you to automatically purchase plastic waste when
        you are running out.
      </p>
      <div>
        <ColumnInnerTitle title="Autopurchaser Purchased" />
        <div className="flex gap-1 items-center mb-4">
          <span className="text-sm">
            {store.autopurchaser ? "True" : "False"}
          </span>
        </div>
      </div>
      <div>
        <ColumnInnerTitle title="Autopurchaser Active" />
        <div className="flex gap-1 items-center mb-4">
          <span className="text-sm">
            {store.autopurchaserActive ? "True" : "False"}
          </span>
        </div>
      </div>
      {store.autopurchaser ? (
        <Button onClick={store.toggleAutopurchaser}>
          Toggle Autopurchaser
        </Button>
      ) : (
        <Button
          disabled={store.funds < store.autopurchasePrice}
          onClick={store.purchaseAutopurchaser}
        >
          Purchase Autopurchaser ({currency(store.autopurchasePrice)})
        </Button>
      )}
    </ColumnInner>
  );
};

export default Autopurchaser;
