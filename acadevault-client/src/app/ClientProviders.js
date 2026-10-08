"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";
import AppInitializer from "./AppInitializer";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { CountryProvider } from "@/contexts/CountryContext";
import { PortalProvider } from "@/contexts/PortalProvider";
import { ChatProvider } from "@/contexts/ChatContext";
import ChatButton from "@/components/chats/LiveChat/ChatButton";
import ChatPanel from "@/components/chats/ChatBot/ChatPanel";
// import AppThemeProvider from "./theme-provider";

export default function ClientProviders({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <AppThemeProvider> */}
        <CountryProvider>
          <CurrencyProvider>
            <PortalProvider>
              <ChatProvider>
                <AppInitializer />
                {children} {/*  All layouts inherit from this  */}
                {/* Global Chat */}
                {/* <ChatButton /> */}
                {/* <ChatPanel /> */}
              </ChatProvider>
            </PortalProvider>
          </CurrencyProvider>
        </CountryProvider>
        {/* </AppThemeProvider> */}
      </PersistGate>
    </Provider>
  );
}

