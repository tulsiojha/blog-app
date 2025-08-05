import Wrapper from "@/components/wrapper";
import "./globals.css";
import "@zener/nepali-datepicker-react/index.css";
import "@zener/react-select/index.css";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className="h-full w-full">
      <head>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
                try {
                  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.querySelector('html').setAttribute('data-theme', 'dark')
                  } else {
                    document.querySelector('html').setAttribute('data-theme', 'light')                  
                  }
                } catch (_) {}
              `,
          }}
        />
      </head>
      <body className={`antialiased h-full w-full bg-secondary`}>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
