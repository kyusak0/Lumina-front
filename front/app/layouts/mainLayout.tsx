import Header from "../components/Header";

import { ReactNode } from "react";

interface mainLayoutProps {
    children: ReactNode;
}

export default function mainLayout({ children }: mainLayoutProps) {
  return (
    <html>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}