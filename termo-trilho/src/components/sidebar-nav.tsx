"use client"

import Link from "next/link"
import { MessageCircle, LogOut } from "lucide-react"
import { useMaintenanceContext } from "@/context/maintenance-context"

interface SidebarNavProps {
  activePage: "home" | "historico" | "alertas" | "linha8" | "linha9"
}

export default function SidebarNav({ activePage }: SidebarNavProps) {
  const { alertedStations } = useMaintenanceContext()

  // Check if there are alerts for each line
  const hasLinha8Alerts = Object.keys(alertedStations).some((key) => key.startsWith("Linha 8"))
  const hasLinha9Alerts = Object.keys(alertedStations).some((key) => key.startsWith("Linha 9"))

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div>
          <div className="logo-text">
            <span className="blue-text">T</span>
            <span className="gray-text">ermo</span>
          </div>
          <div className="logo-text">
            <span className="gray-text">T</span>
            <span className="blue-text">rilho</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav-menu">
        <Link href="/dashboard" className={`nav-item ${activePage === "home" ? "active" : ""}`}>
          Home
        </Link>

        <Link href="/historico" className={`nav-item ${activePage === "historico" ? "active" : ""}`}>
          Manutenções
        </Link>

        <Link href="/alertas" className={`nav-item ${activePage === "alertas" ? "active" : ""}`}>
          Alertas
        </Link>

        <Link href="/linha8" className={`nav-item nav-item-with-icon ${activePage === "linha8" ? "active" : ""}`}>
          <span className={`status-dot ${hasLinha8Alerts ? "alert-active" : "green"}`}></span>
          Linha 8
        </Link>

        <Link href="/linha9" className={`nav-item nav-item-with-icon ${activePage === "linha9" ? "active" : ""}`}>
          <span className={`status-dot ${hasLinha9Alerts ? "alert-active" : "red"}`}></span>
          Linha 9
        </Link>
      </nav>

      {/* Bottom Actions */}
      <div className="sidebar-footer">
        <Link href="/contact" className="footer-item">
          <MessageCircle className="footer-icon" />
          Contate
        </Link>
        <Link href="/" className="footer-item">
          <LogOut className="footer-icon" />
          Sair
        </Link>
      </div>
    </div>
  )
}
