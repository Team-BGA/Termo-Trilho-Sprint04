"use client"

import Image from "next/image"
import Link from "next/link"
import SidebarNav from "@/components/sidebar-nav"

export default function Dashboard() {
  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <SidebarNav activePage="home" />

      {/* Main Content */}
      <div className="main-content">
        {/* Welcome Box */}
        <div className="welcome-box">
          <h1>Bem-vindo ao Termo-Trilho!</h1>
          <p>Monitoramento inteligente para a segurança ferroviária. Prevenindo falhas e otimizando a manutenção</p>
        </div>

        {/* Action Buttons - Adjusted position with Links */}
        <div className="action-buttons">
          <Link href="/linha8" className="action-button">
            Linha 8
          </Link>
          <Link href="/linha9" className="action-button">
            Linha 9
          </Link>
        </div>

        {/* Train Image with Curved Background */}
        <div className="train-container">
          {/* Curved Background */}
          <div className="train-bg-white"></div>

          {/* Blue Curved Overlay */}
          <div className="train-bg-blue"></div>

          

          {/* Train Image */}
          <div className="train-image">
            <Image
              src="/trem.png"
              alt="Train"
              width={600}
              height={400}
              className="train-image"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
