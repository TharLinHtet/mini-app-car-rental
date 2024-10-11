import React, { Dispatch, SetStateAction } from "react";
import { Sheet } from "react-modal-sheet";
interface Props {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}
const ModalSheet = ({ isOpen, setOpen, children }: Props) => {
  return (
    <Sheet
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      snapPoints={[600, 0]}
      className="motion-preset-slide-up-lg"
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>{children}</Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={() => setOpen(false)} />
    </Sheet>
  );
};

export default ModalSheet;
