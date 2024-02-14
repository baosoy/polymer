import useStore from "../../state/store";
import Button from "../Button";
import ColumnInner from "../ColumnInner";
import ColumnInnerTitle from "../ColumnInnerTitle";

const Info = () => {
  const store = useStore();
  return (
    <ColumnInner collapsible defaultOpen={false} title={`What is this?`}>
      <p className="text-gray-500 mb-4">
        Polymer is a production game, focused on the idea of recycling plastic
        waste into new plastic sheets. Utilising the mechanisms of capitalism,
        the game actually explores the impact of the environment on demand. As
        the air quality becomes worse, the game becomes increasingly difficult -
        somewhat reflecting the current state of affairs.
      </p>
      <p className="text-gray-500 mb-4">
        Polymer can also be connected to a local air quality monitor, such as an
        Enviro Urban. This allows you to connect the mechanics of the game to
        your own local environment.
      </p>
      <div>
        <ColumnInnerTitle title="Repository" />
        <div className="flex gap-1 items-center mb-4">
          <a href="https://github.com/kerimhudson/polymer" className="text-sm">
            Github
          </a>
        </div>
      </div>
      <Button onClick={store.reset}>Reset</Button>
    </ColumnInner>
  );
};

export default Info;
