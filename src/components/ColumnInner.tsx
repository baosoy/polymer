import { FunctionComponent, PropsWithChildren } from "react";
import { Disclosure } from "@headlessui/react";
import ChevronIcon from "./icons/ChevronIcon";
const ColumnInner: FunctionComponent<
  PropsWithChildren<{
    title: string;
    collapsible?: boolean;
    defaultOpen?: boolean;
    open?: boolean;
  }>
> = ({ title, children, defaultOpen = true, collapsible }) => {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <div className="bg-white border border-gray-200 text-xs text-gray-600 rounded-lg px-4 py-4">
          {title ? (
            <Disclosure.Button
              disabled={!collapsible}
              className="flex w-full justify-between items-center"
            >
              <h2 className="text-gray-400 font-medium uppercase">{title}</h2>
              {collapsible ? (
                <div
                  className={[
                    "w-4 h-4 bg-white flex items-center justify-center transform transition duration-200 text-gray-400",
                    open ? "" : "rotate-180",
                  ].join(" ")}
                >
                  <ChevronIcon />
                </div>
              ) : null}
            </Disclosure.Button>
          ) : null}
          <Disclosure.Panel>
            <div className="pb-2 pt-4">{children}</div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default ColumnInner;
