import { Fragment } from "react";
import useStore from "../../state/store";
import ColumnInner from "../ColumnInner";
import ColumnInnerTitle from "../ColumnInnerTitle";
import { Tab } from "@headlessui/react";
const locations = [
  {
    id: 152,
    city: "London, United Kingdom",
  },
  {
    id: 4769,
    city: "Berlin, Germany",
  },
  {
    id: 72211,
    city: "New Delhi, India",
  },
  {
    id: 5243,
    city: "São Paulo, Brazil",
  },
  {
    id: 2352,
    city: "Bangkok, Thailand",
  },
  {
    id: 7239,
    city: "Kraków, Poland",
  },
  {
    id: 1894641,
    city: "Lahore, Pakistan",
  },
  {
    id: 2334,
    city: "Los Angeles, USA",
  },
  {
    id: 6161,
    city: "Stockholm, Sweden",
  },
];

const Environment = () => {
  const store = useStore();
  return (
    <ColumnInner collapsible defaultOpen={true} title={`Environment`}>
      <p className="text-gray-500 mb-4">
        Change your environment to explore how the game mechanics change
        depending on the air quality and temperature.
      </p>
      <div>
        <ColumnInnerTitle title="Current Environment" />
        <div className="flex gap-1 items-center mb-4">
          <span className="text-sm">{store.environment.city}</span>
        </div>
      </div>
      <Tab.Group
        onChange={(index) => {
          store.updateEnvironmentType({
            local: index === 0,
          });
        }}
      >
        <Tab.List className="flex border rounded-lg overflow-hidden">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={[
                  "focus:outline-none",
                  "flex-1 py-2  rounded-l-lg border-r hover:bg-lime-100",
                  !selected ? "bg-gray-50" : "bg-white",
                ].join(" ")}
              >
                Local
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={[
                  "focus:outline-none",
                  "flex-1 py-2 hover:bg-lime-100",
                  !selected ? "bg-gray-100" : "bg-white",
                ].join(" ")}
              >
                City
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="flex gap-1 items-center mb-4 pt-4">
              <span className="text-sm">
                Last Reading: {store.environment.values.timestamp}
              </span>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="pt-4">
              <ColumnInnerTitle title="Change City" />
              <div className="flex gap-1 items-center mb-4">
                <select
                  onChange={(e) =>
                    store.updateEnvironmentType({
                      local: false,
                      id: Number(e.currentTarget.value),
                      city: locations.filter(
                        (i) => i.id === Number(e.currentTarget.value)
                      )[0].city,
                    })
                  }
                  className="rounded bg-transparent appearance-none py-2 px-2 border w-full"
                >
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <div>
        <div>
          <ColumnInnerTitle title="Current Scores" />
          <div className="flex flex-col gap-2  mb-4">
            <span className="text-sm">
              PM2.5: {Math.round(store.environment.values.pm2_5)}
            </span>
            <span className="text-sm">
              PM10: {Math.round(store.environment.values.pm10)}
            </span>
            <span className="text-sm">
              Temperature: {Math.round(store.environment.values.temperature)} °C
            </span>
          </div>
        </div>
      </div>
    </ColumnInner>
  );
};

export default Environment;
