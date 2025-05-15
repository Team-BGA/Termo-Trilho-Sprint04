"use client"
import { useState } from "react"
import MaintenanceModal from "@/components/maintenace-modal"
import { useMaintenanceContext } from "@/context/maintenance-context"
import SidebarNav from "@/components/sidebar-nav"

// Updated stations with IDs
const stations = [
  { id: 1, name: "Júlio Prestes" },
  { id: 2, name: "Palmeiras-Barra Funda" },
  { id: 3, name: "Lapa" },
  { id: 4, name: "Domingos de Moraes" },
  { id: 5, name: "Imperatriz Leopoldina" },
  { id: 6, name: "Presidente Altino" },
  { id: 7, name: "Osasco" },
  { id: 8, name: "Comandante Sampaio" },
  { id: 9, name: "Quitaúna" },
  { id: 10, name: "General Miguel Costa" },
  { id: 11, name: "Carapicuíba" },
  { id: 12, name: "Santa Teresinha" },
  { id: 13, name: "Antônio João" },
  { id: 14, name: "Barueri" },
  { id: 15, name: "Jardim Belval" },
  { id: 16, name: "Jardim Silveira" },
  { id: 17, name: "Jandira" },
  { id: 18, name: "Sagrado Coração" },
  { id: 19, name: "Engenheiro Cardoso" },
  { id: 20, name: "Itapevi" },
  { id: 21, name: "Santa Rita" },
  { id: 22, name: "Amador Bueno" },
]

export default function Linha8() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addMaintenanceRequest, alertedStations } = useMaintenanceContext()

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <SidebarNav activePage="linha8" />

      {/* Main Content */}
      <div className="main-content linha-content">
        {/* Scrollable Train Line Container */}
        <div className="train-line-container">
          <div className="vertical-line gray"></div>

          {/* Stations */}
          <div className="stations-container">
            {stations.map((station) => {
              // Check if this station has an alert that's not completed
              const stationKey = `Linha 8-${station.id}`
              const isAlerted = alertedStations[stationKey] !== undefined

              return (
                <div key={station.id} className="station">
                  {/* Station Name (Left) */}
                  <div className="station-name">
                    <span className="station-id">ID: {station.id}</span>
                    {station.name}
                    {isAlerted && <span className="alert-badge">Alerta {alertedStations[stationKey]}</span>}
                  </div>

                  {/* Station Dot (Center) */}
                  <div className={`station-dot ${isAlerted ? "alerted" : ""}`}></div>

                  {/* Empty space (Right) to balance layout */}
                  <div className="station-spacer"></div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Maintenance Button - Fixed at bottom */}
        <div className="maintenance-button-container">
          <button onClick={() => setIsModalOpen(true)} className="maintenance-button">
            Acionar Manutenção!
          </button>
        </div>
      </div>

      {/* Maintenance Modal */}
      <MaintenanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentLine="Linha 8"
        onSubmit={addMaintenanceRequest}
        stations={stations}
      />
    </div>
  )
}
