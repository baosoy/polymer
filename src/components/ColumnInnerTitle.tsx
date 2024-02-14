import { FunctionComponent } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import HelperIcon from "./icons/HelperIcon";

const ColumnInnerTitle: FunctionComponent<{
  title: string;
  hasTooltip?: boolean;
  tooltipContent?: string;
}> = ({ title, hasTooltip, tooltipContent }) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="uppercase text-gray-500 mb-1">{title}</h3>
      {hasTooltip ? (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button className="IconButton">
                <HelperIcon />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="py-2 px-2 text-gray-600 rounded-lg max-w-[200px] text-xs border border-gray-300 bg-white"
                sideOffset={5}
              >
                {tooltipContent}
                <Tooltip.Arrow className="TooltipArrow" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      ) : null}
    </div>
  );
};

export default ColumnInnerTitle;
