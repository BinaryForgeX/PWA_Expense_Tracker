import { ModalType } from "@/types";

export interface ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  show?: boolean;
  type?: ModalType;
}
