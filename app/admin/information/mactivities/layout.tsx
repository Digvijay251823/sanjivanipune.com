import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities Master",
  description: "Generated by sanjivanipune.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        {children}
      </div>
  );
}
