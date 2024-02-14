import { Transition } from "@headlessui/react";
import { PropsWithChildren } from "react";

const FadeIn = ({ show, children }: PropsWithChildren<{ show: boolean }>) => {
  return (
    <Transition show={show}>
      <Transition.Child
        enter="transition-opacity duration-700"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {children}
      </Transition.Child>
    </Transition>
  );
};

export default FadeIn;
