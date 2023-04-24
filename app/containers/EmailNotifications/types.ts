export type ActionType = {
  type: string;
  email: string;
  code: string;
  isSubscribed: boolean;
  currentEmail: string;
};

export type ReducerType = {
  showModal: boolean;
  content: null | string;
  sendEmailProcessing: boolean;
  confirmEmailProcessing: boolean;
  verificationCodeError: null | boolean;
  email: null | string;
  currentEmail: null | string;
  isSubscribed: boolean;
  verificationCode: null | number;
  verificationCodeRequest: number;
};

export type sendRequestType = {
  type: string;
};

export type argsType = [
  {
    size: number;
    root: { ownerID: undefined | number; entries: [string, string] };
  },
  () => void,
  { emailAddress: string },
];

export type EmailNotificationsProps = {
  hideChangeEmailModalDispatch: () => void;
  showModal: boolean;
  content: string;
  sendEmailDispatch: () => void;
  confirmEmailDispatch: () => void;
  confirmEmailProcessing: boolean;
  sendEmailProcessing: boolean;
  sendAnotherCodeDispatch: () => void;
  setOpen: (open: boolean) => void;
  open: boolean;
  verificationCodeError: boolean;
  disabled: boolean;
  verificationCode: string;
  verificationCodeRequest: number;
};

export type EmailNotificationsSelectorsProps = {
  content: string;
  showModal: boolean;
  sendEmailProcessing: boolean;
  confirmEmailProcessing: boolean;
  verificationCodeError: boolean;
  verificationCode: string;
  verificationCodeRequest: number;
};

export type SendEmailFormProps = {
  handleSubmit: (
    sendEmail: () => void,
  ) => React.FormEventHandler<HTMLFormElement> | undefined;
  sendEmail: () => void;
  sendEmailProcessing: boolean;
  emailAddress: string;
  closeModal: () => void;
};

export type ConfirmEmailFormProps = {
  handleSubmit: (
    confirmEmail: () => void,
  ) => React.FormEventHandler<HTMLFormElement> | undefined;
  confirmEmail: () => void;
  confirmEmailProcessing: boolean;
  sendAnotherCode: () => void;
  emailAddress: string;
  closeModal: () => void;
  verificationCodeError: boolean;
  verificationCode: string;
  verificationCodeRequest: number;
  dispatch: () => void;
};

export interface ActionResult<T> extends Action<string> {
  type: string;
  payload: T;
}
