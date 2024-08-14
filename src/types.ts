export type LogLevel = "info" | "error" | "warn";

export type CustomerlyPosition = {
  bottom: number;
  side: number;
};

export type CustomerlyMessengerPosition = {
  mobile: CustomerlyPosition;
  desktop: CustomerlyPosition;
};

export type CustomerlyMessenger = {
  direction?: "right" | "left";
  accentColor?: string;
  contrastColor?: string;
  autodetectLocale?: boolean;
  visible?: boolean;
  visibleOnMobile?: boolean;
  screenshotAvailable?: boolean;
  attachmentsAvailable?: boolean;
  singleConversation?: boolean;
  position?: CustomerlyMessengerPosition;
  disableCSSOMInjection?: boolean;
};

export type CustomerlyContactProperty = {
  user_id?: string | number;
  name?: string;
  email?: string;
  email_hash?: string;
  attributes?: any;
};

export interface CustomerlyCompanyProperty {
  company?: {
    company_id: string | number;
    name?: string;
    attributes?: any;
  };
}

export type CustomerlySettings = CustomerlyMessenger &
  CustomerlyContactProperty &
  CustomerlyCompanyProperty;

export type CustomerlyCallerMethod =
  | "load"
  | "update"
  | "show"
  | "hide"
  | "open"
  | "close"
  | "attribute"
  | "event"
  | "showNewMessage"
  | "sendNewMessage"
  | "logout"
  | "registerCallback";

export type CustomerlyCallbackOnChatClosed = {
  type: "onChatClosed";
  function: () => void;
};

export type CustomerlyCallbackOnChatOpened = {
  type: "onChatOpened";
  function: () => void;
};

export type CustomerlyCallbackOnRealtimeVideoAnswered = {
  type: "onRealtimeVideoAnswered";
  function: () => void;
};

export type CustomerlyCallbackOnRealtimeVideoRejected = {
  type: "onRealtimeVideoRejected";
  function: () => void;
};

export type CustomerlyCallbackOnLeadGenerated = {
  type: "onLeadGenerated";
  function: (email: string) => void;
};

export type CustomerlyCallbackOnNewConversation = {
  type: "onNewConversation";
  function: (message: string, attachments: any) => void;
};

export type CustomerlyCallbackOnProfilingQuestionAsked = {
  type: "onProfilingQuestionAsked";
  function: (attribute: string) => void;
};

export type CustomerlyCallbackOnProfilingQuestionAnswered = {
  type: "onProfilingQuestionAnswered";
  function: (attribute: string, value: any) => void;
};

export type CustomerlyCallbackOnHelpCenterArticleOpened = {
  type: "onHelpCenterArticleOpened";
  function: (article: any) => void;
};

export type CustomerlyCallbackOnChatflowNotificationViewed = {
  type: "onChatflowNotificationViewed";
  function: (notificationId: number, email?: string) => void;
};

export type CustomerlyCallbackOnChatflowNotificationClicked = {
  type: "onChatflowNotificationClicked";
  function: (
    notificationId: number,
    item: ChatflowNotificationCallbackItem,
    email?: string
  ) => void;
};

export type CustomerlyCallback =
  | CustomerlyCallbackOnChatClosed
  | CustomerlyCallbackOnChatOpened
  | CustomerlyCallbackOnNewConversation
  | CustomerlyCallbackOnProfilingQuestionAnswered
  | CustomerlyCallbackOnProfilingQuestionAsked
  | CustomerlyCallbackOnLeadGenerated
  | CustomerlyCallbackOnHelpCenterArticleOpened
  | CustomerlyCallbackOnRealtimeVideoAnswered
  | CustomerlyCallbackOnRealtimeVideoRejected
  | CustomerlyCallbackOnChatflowNotificationViewed
  | CustomerlyCallbackOnChatflowNotificationClicked;

export type CustomerlyContextValues = {
  load: (settings: CustomerlySettings) => void;
  update: (settings: CustomerlySettings) => void;
  show: () => void;
  hide: () => void;
  open: () => void;
  close: () => void;
  attribute: (attributeIdentifier: string, attributeValue: any) => void;
  event: (eventName: string) => void;
  showNewMessage: (message: string) => void;
  sendNewMessage: (message: string) => void;
  logout: () => void;
  registerCallback: (callback: CustomerlyCallback) => void;
};

export type CustomerlyProviderValues = {
  appId: string;
  beta?: boolean;
};

enum ChatflowNotificationCallbackItemType {
  Article = "article",
  Attributes = "attributes",
  Button = "button",
  CalendarButton = "calendar_button",
  CloseButton = "close_button",
}

type ChatflowNotificationCallbackItem =
  | ChatflowNotificationCallbackItemArticle
  | ChatflowNotificationCallbackItemAttribute
  | ChatflowNotificationCallbackItemButton
  | ChatflowNotificationCallbackItemCalendarButton
  | ChatflowNotificationCallbackItemCloseButton;

interface ChatflowNotificationCallbackItemArticle {
  article: {
    article_id: number;
    collection_id: number;
    title: string;
    description: string;
    author: {
      account_id: number;
      name?: string;
    };
  };
  type: ChatflowNotificationCallbackItemType.Article;
}

interface ChatflowNotificationCallbackItemAttribute {
  attributes: {
    name: string;
    value: boolean | number | string;
  }[];
  type: ChatflowNotificationCallbackItemType.Attributes;
}

interface ChatflowNotificationCallbackItemButton {
  button: {
    caption: string;
    link: string;
  };
  type: ChatflowNotificationCallbackItemType.Button;
}

interface ChatflowNotificationCallbackItemCalendarButton {
  button: {
    caption: string;
    link: string;
  };
  type: ChatflowNotificationCallbackItemType.CalendarButton;
}

interface ChatflowNotificationCallbackItemCloseButton {
  type: ChatflowNotificationCallbackItemType.CloseButton;
}
