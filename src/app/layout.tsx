'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useMemo } from 'react';
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let browserQueryClient: QueryClient | undefined = undefined;

  const makeQueryClient = (): QueryClient => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
    });
  };

  const useQueryClient = (): QueryClient =>
    useMemo(() => {
      if (isServer) {
        return makeQueryClient();
      } else {
        if (!browserQueryClient) {
          browserQueryClient = makeQueryClient();
        }
        return browserQueryClient;
      }
    }, []);

  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <QueryClientProvider client={useQueryClient()}>
            {children}
          </QueryClientProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
