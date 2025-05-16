import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { MaintenanceProvider } from "@/context/maintenance-context"

// Initialize the Inter font
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata = {
  title: "Termo Trilho",
  description: "Monitoramento inteligente para a segurança ferroviária",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <MaintenanceProvider>{children}</MaintenanceProvider>
      </body>
    </html>
  )
}
