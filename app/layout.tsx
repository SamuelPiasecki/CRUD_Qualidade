import React from "react";
import StyledJsxRegistry from "./registry";

export const metadata = {
  title: "CRUD com Qualidade",
  description: "Um CRUD criado com muita qualidade",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
      </body>
    </html>
  );
}
