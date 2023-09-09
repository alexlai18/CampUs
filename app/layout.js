"use client"

import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ui/themeprovider'
import { Provider } from "react-redux";
import store from "./store/store";
import { PersistGate } from "redux-persist/es/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { useEffect } from 'react';
import { PrivateRoute } from '../components/PrivateRoute';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CampUs',
}

export default function RootLayout({children}) {
  const persistor = persistStore(store, { manualPersist: true });
  useEffect(persistor.persist, []);
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <PrivateRoute>
                {children}
              </PrivateRoute>
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
