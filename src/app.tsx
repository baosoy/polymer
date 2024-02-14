import { useEffect } from "react";
import Column from "./components/Column";
import HighlightBox from "./components/HighlightBox";
import BusinessOverview from "./components/columns/BusinessOverview";
import Manufacturing from "./components/columns/Manufacturing";
import useStore from "./state/store";
import { currency } from "./utils/currency";
import Autorecycler from "./components/columns/Autorecycler";
import Marketing from "./components/columns/Marketing";
import Research from "./components/columns/Research";
import Autopurchaser from "./components/columns/AutoPurchaser";
import Environment from "./components/columns/Environment";
import FadeIn from "./components/FadeIn";
import Info from "./components/columns/Info";

export function App() {
  const store = useStore();

  useEffect(() => {
    store.fetchEnvironment();
    const interval = setInterval(store.tick, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="px-4 pt-4 pb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-medium tracking-tight">Polymer 1.0</h1>
          <span className="inline-block leading-none bg-lime-300 rounded-full text-xs uppercase px-2 py-1">
            Beta
          </span>
        </div>
      </header>
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 mb-4">
        <Column>
          <div className="flex gap-4">
            <HighlightBox
              title="Demand"
              value={(store.demand * 100).toFixed(1) + "%"}
            />
            <HighlightBox
              title="Available Funds"
              value={currency(store.funds)}
            />
          </div>
          <BusinessOverview />
          <Manufacturing />
        </Column>
        <Column>
          <FadeIn show={store.totalMeters > 20}>
            <Autorecycler />
          </FadeIn>
          <FadeIn show={store.totalMeters > 100}>
            <Autopurchaser />
          </FadeIn>
          <FadeIn show={store.totalMeters > 200}>
            <Marketing />
          </FadeIn>
          <FadeIn show={store.totalMeters > 500}>
            <Research />
          </FadeIn>
        </Column>
        <Column>
          <Environment />
          <Info />
        </Column>
      </main>
    </div>
  );
}
