import * as React from "react";
import {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from "react";
import CustomerlyContext from "./context";
import initialize from "./initialize";
import {
  CustomerlyCallback,
  CustomerlyContextValues,
  CustomerlyProviderValues,
  CustomerlySettings,
} from "./types";
import { isSSR } from "./helpers";
import Caller from "./caller";

export const CustomerlyProvider: FunctionComponent<PropsWithChildren<
  CustomerlyProviderValues
>> = ({ appId, beta, children }) => {
  const canInitialize = !isSSR;

  const isLoaded = useRef(false);
  const isInitialized = useRef(false);

  const load = useCallback(
    (settings?: CustomerlySettings) => {
      if (!window.customerly && !canInitialize) {
        return;
      }

      if (isLoaded.current) {
        return;
      }

      Caller("load", {
        ...settings,
        app_id: appId,
      });

      isLoaded.current = true;
    },
    [appId, canInitialize]
  );

  if (!isSSR && canInitialize && !isInitialized.current) {
    initialize({ beta });

    isInitialized.current = true;
  }

  const safeCall = useCallback(
    (callback: (() => void) | (() => string)) => {
      if (!window.customerly && !canInitialize) {
        return;
      }

      return callback();
    },
    [canInitialize]
  );

  const update = useCallback(
    (settings?: CustomerlySettings) => {
      safeCall(() => {
        Caller("update", {
          ...settings,
          app_id: appId,
        });
      });
    },
    [appId, safeCall]
  );

  const hide = useCallback(() => {
    safeCall(() => {
      Caller("hide");
    });
  }, [safeCall]);

  const show = useCallback(() => {
    safeCall(() => {
      Caller("show");
    });
  }, [safeCall]);

  const open = useCallback(() => {
    safeCall(() => {
      Caller("open");
    });
  }, [safeCall]);

  const close = useCallback(() => {
    safeCall(() => {
      Caller("close");
    });
  }, [safeCall]);

  const event = useCallback(
    (eventName: string) => {
      safeCall(() => {
        Caller("event", eventName);
      });
    },
    [safeCall]
  );

  const attribute = useCallback(
    (attributeIdentifier: string, attributeValue: any) => {
      safeCall(() => {
        Caller("attribute", attributeIdentifier, attributeValue);
      });
    },
    [safeCall]
  );

  const showNewMessage = useCallback(
    (message: string) => {
      safeCall(() => {
        Caller("showNewMessage", message);
      });
    },
    [safeCall]
  );

  const sendNewMessage = useCallback(
    (message: string) => {
      safeCall(() => {
        Caller("sendNewMessage", message);
      });
    },
    [safeCall]
  );

  const logout = useCallback(() => {
    safeCall(() => {
      Caller("logout");
    });
  }, [safeCall]);

  const registerCallback = useCallback(
    (callback: CustomerlyCallback) => {
      safeCall(() => {
        window.customerly[callback.type] = callback.function;
      });
    },
    [safeCall]
  );

  const providerValue = useMemo<CustomerlyContextValues>(() => {
    return {
      load,
      update,
      open,
      hide,
      show,
      close,
      event,
      attribute,
      showNewMessage,
      sendNewMessage,
      logout,
      registerCallback,
    };
  }, [
    attribute,
    close,
    event,
    hide,
    load,
    logout,
    open,
    sendNewMessage,
    show,
    showNewMessage,
    update,
    registerCallback,
  ]);

  return (
    <CustomerlyContext.Provider value={providerValue}>
      {children}
    </CustomerlyContext.Provider>
  );
};

export const useCustomerlyContext = () => {
  const context = useContext(CustomerlyContext);

  if (__DEV__ && context === undefined) {
    throw new Error(
      "`useCustomerly` must be used within `CustomerlyProvider`."
    );
  }

  return context as CustomerlyContextValues;
};
