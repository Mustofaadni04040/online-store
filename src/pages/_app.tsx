import AppShell from "@/components/fragments/AppShell";
import { ToasterProvider } from "@/contexts/ToasterContext";
import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

declare global {
  interface Window {
    snap: any;
  }
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ToasterProvider>
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </ToasterProvider>
    </SessionProvider>
  );
}
