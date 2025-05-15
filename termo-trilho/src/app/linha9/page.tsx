"use client"
import { useState } from "react"
import MaintenanceModal from "@/components/maintenace-modal"
import { useMaintenanceContext } from "@/context/maintenance-context"
import SidebarNav from "@/components/sidebar-nav"

// Updated stations with IDs (continuing from Linha 8)
const stations = [
  { id: 23, name: "Osasco" },
  { id: 24, name: "Presidente Altino" },
  { id: 25, name: "Ceasa" },
  { id: 26, name: "Villa Lobos - Jaguaré" },
  { id: 27, name: "Cidade Universitária" },
  { id: 28, name: "Pinheiros" },
  { id: 29, name: "Hebraica - Rebouças" },
  { id: 30, name: "Cidade Jardim" },
  { id: 31, name: "Vila Olímpia" },
  { id: 32, name: "Berrini" },
  { id: 33, name: "Morumbi" },
  { id: 34, name: "Granja Julieta" },
  { id: 35, name: "João Dias" },
  { id: 36, name: "Santo Amaro" },
  { id: 37, name: "Socorro" },
  { id: 38, name: "Jurubatuba" },
  { id: 39, name: "Autódromo" },
  { id: 40, name: "Primavera - Interlagos" },
  { id: 41, name: "Grajaú" },
  { id: 42, name: "Vila Natal" },
]

export default function Linha9() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addMaintenanceRequest, alertedStations } = useMaintenanceContext()

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <SidebarNav activePage="linha9" />

      {/* Main Content */}
      <div className="main-content linha-content">
        {/* Scrollable Train Line Container */}
        <div className="train-line-container">
          <div className="vertical-line teal"></div>

          {/* Stations */}
          <div className="stations-container">
            {stations.map((station) => {
              // Check if this station has an alert that's not completed
              const stationKey = `Linha 9-${station.id}`
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
        currentLine="Linha 9"
        onSubmit={addMaintenanceRequest}
        stations={stations}
      />
    </div>
  )
}
