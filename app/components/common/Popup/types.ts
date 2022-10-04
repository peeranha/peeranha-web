export type TypePopup = 'default' | 'advertising';

export type PopupProps = {
  isTest?: boolean;
  isOpen?: boolean;
  /**
   * Popup size. Full by default.
   */
  size?: 'full' | 'big' | 'medium' | 'small' | 'tiny' | 'atom';
  /**
   * Popup type. Default for all excluding advertising popups.
   */
  type?: TypePopup;
  /**
   * Optional onClose handler.
   */
  onClose?: () => void;
  /**
   * Custom popup header
   */
  header?: React.ReactNode;
  /** CSS classes */
  className?: string;
  /** popup header title */
  title?: string;
  /**
   * Animation popup
   * */
  isTransition?: boolean;
};
