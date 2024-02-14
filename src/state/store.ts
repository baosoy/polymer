import { create } from "zustand";
import { persist } from "zustand/middleware";
import merge from "lodash.merge";

// const demand = (
//   price: number,
//   airQuality: number,
//   marketingEfforts: number
// ): [number, number, number] => {
//   let baseDemand = Math.pow(price / 4, -1.2);
//   const airQualityFactor =
//     ((1 - (1 + airQuality)) / (1 + (1 + airQuality))) * 2;
//   const marketingEffortsFactor = Math.pow(marketingEfforts, 2);

//   return [
//     (baseDemand *= (1 + airQualityFactor) * (1 + marketingEffortsFactor)),
//     airQualityFactor,
//     marketingEffortsFactor,
//   ];
// };

function convertToPercentage(number: number, min: number, max: number): number {
  return (number - min) / (max - min);
}

export type ResearchArgs = {
  funds: number;
  plasticWastePerMeter?: number;
  plasticWasteCost?: number;
  autorecyclerProductivity?: number;
};

interface PolymerStore {
  environment: {
    id: null | number;
    city: null | string;
    local: boolean;
    values: {
      pm2_5: number;
      pm10: number;
      temperature: number;
      sound: number;
      timestamp: string;
    };
  };
  ticks: number;
  funds: number;
  demand: number;
  totalMeters: number;
  unsoldMeters: number;
  plasticWaste: number;
  plasticWasteBaseCost: number;
  plasticWasteCost: number;
  plasticWastePerMeter: number;
  plasticWastePurchaseSize: number;
  price: number;
  priceInterval: number;
  autorecyclers: number;
  autorecyclerPrice: number;
  autorecyclerProductivity: number;
  autopurchaser: boolean;
  autopurchaserActive: boolean;
  autopurchasePrice: number;
  research: number;
  marketing: number;
  marketingPrice: number;
  fetchEnvironment: () => Promise<void>;
  updateEnvironmentType: (args: {
    local?: boolean;
    id?: number;
    city?: string;
  }) => void;
  purchaseAutopurchaser: () => void;
  toggleAutopurchaser: () => void;
  purchaseAutorecycler: () => void;
  purchaseMarketing: () => void;
  lowerPrice: () => void;
  increasePrice: () => void;
  generateRecycledPlastic: () => void;
  generateAutomatedRecycledPlastic: () => void;
  purchasePlasticWaste: () => void;
  calculateDemand: () => void;
  tick: () => void;
  completeResearch: (args: ResearchArgs) => void;
  repurchaserCheck: () => void;
  reset: () => void;
}

const useStore = create(
  persist<PolymerStore>(
    (set, get) => ({
      ticks: 0,
      environment: {
        values: {
          pm10: 0,
          pm2_5: 0,
          temperature: 0,
          sound: 0,
          timestamp: new Date().toISOString(),
        },
        local: false,
        city: "London, UK",
        id: 152,
      },
      funds: 0,
      demand: 0,
      totalMeters: 0,
      unsoldMeters: 0,
      plasticWaste: 1000,
      plasticWasteBaseCost: 100,
      plasticWasteCost: 100,
      plasticWastePerMeter: 3,
      plasticWastePurchaseSize: 1000,
      price: 3,
      priceInterval: 0.2,
      autorecyclers: 0,
      autorecyclerPrice: 200,
      autorecyclerProductivity: 1,
      marketing: 0,
      marketingPrice: 200,
      research: 0,
      autopurchaser: false,
      autopurchaserActive: false,
      autopurchasePrice: 800,
      reset: () => {
        const { fetchEnvironment } = get();
        set(() => ({
          ticks: 0,
          environment: {
            values: {
              pm10: 0,
              pm2_5: 0,
              temperature: 0,
              sound: 0,
              timestamp: new Date().toISOString(),
            },
            local: false,
            city: "London, UK",
            id: 152,
          },
          funds: 0,
          demand: 0,
          totalMeters: 0,
          unsoldMeters: 0,
          plasticWaste: 1000,
          plasticWasteBaseCost: 100,
          plasticWasteCost: 100,
          plasticWastePerMeter: 3,
          plasticWastePurchaseSize: 1000,
          price: 3,
          priceInterval: 0.2,
          autorecyclers: 0,
          autorecyclerPrice: 200,
          autorecyclerProductivity: 1,
          marketing: 0,
          marketingPrice: 200,
          research: 0,
          autopurchaser: false,
          autopurchaserActive: false,
          autopurchasePrice: 800,
        }));

        fetchEnvironment();
      },
      purchaseAutopurchaser: () => {
        const { funds, autopurchasePrice, autopurchaser } = get();

        if (funds >= autopurchasePrice && autopurchaser === false) {
          set((state) => ({
            funds: state.funds - state.autopurchasePrice,
            autopurchaser: true,
            autopurchaserActive: true,
          }));
        }
      },
      toggleAutopurchaser: () => {
        set((state) => ({ autopurchaserActive: !state.autopurchaserActive }));
      },
      completeResearch: (args) => {
        const { funds } = get();
        if (funds >= args.funds) {
          set((state) => ({
            funds: state.funds - args.funds,
            research: state.research + 1,
            autorecyclerProductivity: args.autorecyclerProductivity
              ? state.autorecyclerProductivity * args.autorecyclerProductivity
              : state.autorecyclerProductivity,
            plasticWasteCost: args.plasticWasteCost
              ? Math.round(state.plasticWasteCost * args.plasticWasteCost)
              : state.plasticWasteCost,
            plasticWastePerMeter: args.plasticWastePerMeter
              ? Math.round(
                  state.plasticWastePerMeter * args.plasticWastePerMeter
                )
              : state.plasticWastePerMeter,
          }));
        }
      },
      lowerPrice: () => {
        const { price, priceInterval } = get();
        if (price > priceInterval) {
          const { calculateDemand } = get();
          set((state) => ({
            price: Number((state.price - state.priceInterval).toFixed(2)),
          }));
          calculateDemand();
        }
      },
      increasePrice: () => {
        const { calculateDemand } = get();
        set((state) => ({
          price: Number((state.price + state.priceInterval).toFixed(2)),
        }));
        calculateDemand();
      },
      generateRecycledPlastic: () => {
        const { plasticWaste, plasticWastePerMeter } = get();

        if (plasticWaste >= plasticWastePerMeter) {
          set((state) => ({
            plasticWaste: state.plasticWaste - state.plasticWastePerMeter,
            totalMeters: state.totalMeters + 1,
            unsoldMeters: state.unsoldMeters + 1,
          }));
          return;
        }
      },
      generateAutomatedRecycledPlastic: () => {
        const { plasticWaste, plasticWastePerMeter, autorecyclers } = get();

        const metersNeeded = plasticWastePerMeter * autorecyclers;

        if (plasticWaste >= metersNeeded) {
          set((state) => ({
            plasticWaste:
              state.plasticWaste -
              state.plasticWastePerMeter * state.autorecyclers,
            totalMeters: state.totalMeters + state.autorecyclers,
            unsoldMeters: state.unsoldMeters + state.autorecyclers,
          }));
        } else {
          const totalToMake = Math.floor(plasticWaste / plasticWastePerMeter);
          set((state) => ({
            plasticWaste:
              state.plasticWaste - state.plasticWastePerMeter * totalToMake,
            totalMeters: state.totalMeters + totalToMake,
            unsoldMeters: state.unsoldMeters + totalToMake,
          }));
        }
      },
      purchasePlasticWaste: () => {
        const { plasticWasteCost, funds } = get();
        if (funds >= plasticWasteCost) {
          set((state) => ({
            funds: state.funds - state.plasticWasteCost,
            plasticWaste: state.plasticWaste + state.plasticWastePurchaseSize,
          }));
        }
      },

      calculateDemand: () => {
        const { price, marketing, environment } = get();
        const baseDemand = Math.pow(price / 2, -1.2);

        const marketingEffortsFactor = Math.pow(1 + (marketing + 1) * 0.1, 2);
        const envFactor = environment.values.pm2_5 + environment.values.pm10;
        const envPercentage = convertToPercentage(envFactor, 0, 2000);

        set(() => ({
          demand:
            baseDemand *
            marketingEffortsFactor *
            (1 - Math.pow(envPercentage, 0.6)),
        }));
      },
      purchaseAutorecycler: () => {
        const { autorecyclerPrice, funds } = get();

        if (funds >= autorecyclerPrice) {
          set((state) => ({
            funds: state.funds - state.autorecyclerPrice,
            autorecyclerPrice: state.autorecyclerPrice * 1.2,
            autorecyclers: state.autorecyclers + 1,
          }));
        }
      },
      repurchaserCheck: () => {
        const {
          plasticWastePerMeter,
          purchasePlasticWaste,
          plasticWaste,
          autopurchaserActive,
          autopurchaser,
        } = get();

        if (
          autopurchaser &&
          autopurchaserActive &&
          plasticWaste <= plasticWastePerMeter
        ) {
          purchasePlasticWaste();
        }
      },
      tick: () => {
        const {
          demand,
          unsoldMeters,
          autorecyclers,
          autopurchaser,
          autopurchaserActive,
          generateAutomatedRecycledPlastic,
          repurchaserCheck,
          calculateDemand,
        } = get();
        calculateDemand();

        if (autorecyclers > 0) {
          generateAutomatedRecycledPlastic();
        }

        if (autopurchaser && autopurchaserActive) {
          repurchaserCheck();
        }

        const random = Math.random();

        if (random < demand && unsoldMeters > 0) {
          set((state) => ({
            unsoldMeters:
              state.unsoldMeters < Math.round(random * 5 * demand)
                ? state.unsoldMeters - state.unsoldMeters
                : state.unsoldMeters - Math.round(random * 5 * demand),
            funds: state.funds + state.price,
          }));
        }
      },
      purchaseMarketing: () => {
        const { marketingPrice, funds } = get();

        if (funds >= marketingPrice) {
          set((state) => ({
            marketing: state.marketing + 1,
            marketingPrice: state.marketingPrice * 1.4,
            funds: state.funds - state.marketingPrice,
          }));
        }
      },
      fetchEnvironment: async () => {
        const { environment } = get();

        if (environment.local) {
          const data = await fetch(import.meta.env.VITE_AQ_API_URL).then((r) =>
            r.json()
          );
          if (data) {
            set((state) => ({
              environment: {
                ...state.environment,
                values: {
                  ...state.environment.values,
                  pm2_5: data.pm2_5,
                  pm10: data.pm10,
                  sound: 0,
                  temperature: data.temperature,
                  timestamp: data.timestamp,
                },
              },
            }));
          }
        } else {
          const data = await fetch(
            `https://api.openaq.org/v2/locations/${environment.id}?limit=1&page=1&offset=0&sort=desc`
          ).then((r) => r.json());

          const weather = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${
              environment.city
            }&units=metric&APPID=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
          ).then((r) => r.json());

          if (data) {
            set((state) => ({
              environment: {
                ...state.environment,
                values: {
                  ...state.environment.values,
                  pm2_5: data.results[0].parameters.filter(
                    (i: any) => i.parameter === "pm25"
                  )[0].average,
                  pm10: data.results[0].parameters.filter(
                    (i: any) => i.parameter === "pm10"
                  )[0].average,
                  sound: 0,
                  temperature: weather?.main?.temp ?? 16,
                  timestamp: data.results[0].parameters.filter(
                    (i: any) => i.parameter === "pm25"
                  )[0].lastUpdated,
                },
              },
            }));
          }
        }
      },
      updateEnvironmentType: (props) => {
        const store = get();
        set((state) => ({
          environment: {
            ...state.environment,
            ...props,
          },
        }));

        store.fetchEnvironment();
      },
    }),
    {
      name: "polymer-storage",
      merge: (persistedState, currentState) => {
        return merge({}, currentState, persistedState);
      },
    }
  )
);

export default useStore;
