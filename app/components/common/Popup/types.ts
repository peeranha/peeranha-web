export type PopupProps = {
  isTest?: boolean;
  isOpen?: boolean;
  /**
   * Popup size. Full by default.
   */
  size?: 'full' | 'big' | 'medium' | 'small' | 'tiny' | 'atom';
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
