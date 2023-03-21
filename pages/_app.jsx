import '@/styles/globals.css'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import MainProvider from '@/contexts/Main'

export default function App({Component, pageProps}) {

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
        }}
      >
        <Notifications />
        <MainProvider>
          <Component {...pageProps} />
        </MainProvider>
      </MantineProvider>
    </>
  )
}