"use client"

import { createContext, useState, useContext, type ReactNode, useEffect } from "react"
import type { MaintenanceRequest } from "@/components/maintenace-modal"

interface MaintenanceContextType {
  maintenanceRequests: MaintenanceRequest[]
  addMaintenanceRequest: (request: MaintenanceRequest) => void
  removeMaintenanceRequest: (id: string) => void
  alertedStations: Record<string, number>
  completedAlerts: string[]
  generateRandomAlert: () => void
  markAlertAsCompleted: (id: string) => void
}

const MaintenanceContext = createContext<MaintenanceContextType | undefined>(undefined)

export function MaintenanceProvider({ children }: { children: ReactNode }) {
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([])
  const [alertedStations, setAlertedStations] = useState<Record<string, number>>({})
  const [completedAlerts, setCompletedAlerts] = useState<string[]>([])

  // Generate a random alert when the app loads
  useEffect(() => {
    generateRandomAlert()
  }, [])

  const addMaintenanceRequest = (request: MaintenanceRequest) => {
    setMaintenanceRequests((prev) => [request, ...prev]) // Add new requests to the beginning
    console.log("New maintenance request added:", request)
  }

  const removeMaintenanceRequest = (id: string) => {
    // Remove from maintenanceRequests
    setMaintenanceRequests((prev) => prev.filter((item) => item.id !== id))

    // If this was an alert, also remove it from alertedStations
    const alertToRemove = maintenanceRequests.find((req) => req.id === id)
    if (alertToRemove && alertToRemove.stationId) {
      setAlertedStations((prev) => {
        const newAlertedStations = { ...prev }
        delete newAlertedStations[`${alertToRemove.line}-${alertToRemove.stationId}`]
        return newAlertedStations
      })
    }

    // Also remove from completedAlerts if it was there
    setCompletedAlerts((prev) => prev.filter((completedId) => completedId !== id))
  }

  // Function to mark an alert as completed (keep in history but remove visual indicator)
  const markAlertAsCompleted = (id: string) => {
    setCompletedAlerts((prev) => [...prev, id])

    // Find the alert to get its station ID and line
    const alertToComplete = maintenanceRequests.find((req) => req.id === id)
    if (alertToComplete && alertToComplete.stationId) {
      // Remove the station from alertedStations to remove the red circle
      setAlertedStations((prev) => {
        const newAlertedStations = { ...prev }
        delete newAlertedStations[`${alertToComplete.line}-${alertToComplete.stationId}`]
        return newAlertedStations
      })
    }
  }

  // Function to generate a random alert
  const generateRandomAlert = () => {
    // Randomly decide which line to alert (8 or 9)
    const line = Math.random() > 0.5 ? "Linha 8" : "Linha 9"

    // Get a random station ID based on the line
    const minId = line === "Linha 8" ? 1 : 23
    const maxId = line === "Linha 8" ? 22 : 42
    const stationId = Math.floor(Math.random() * (maxId - minId + 1)) + minId

    // Generate a random alert level (1-5)
    const alertLevel = Math.floor(Math.random() * 5) + 1

    // Find the station name based on ID
    let stationName = ""
    if (line === "Linha 8") {
      const linha8Stations = [
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
      const station = linha8Stations.find((s) => s.id === stationId)
      if (station) stationName = station.name
    } else {
      const linha9Stations = [
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
      const station = linha9Stations.find((s) => s.id === stationId)
      if (station) stationName = station.name
    }

    // Create a random rail ID
    const railId = Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0")

    // Create the maintenance request
    const newAlert: MaintenanceRequest = {
      id: `alert-${Date.now()}`,
      location: stationName,
      description: `Alerta automático gerado para a estação ${stationName}`,
      alertLevel: alertLevel.toString(),
      line,
      date: new Date(),
      railId,
      stationId,
    }

    // Add the alert to maintenance requests
    addMaintenanceRequest(newAlert)

    // Update the alerted stations state
    setAlertedStations((prev) => ({
      ...prev,
      [`${line}-${stationId}`]: alertLevel,
    }))

    console.log(`Random alert generated for ${line}, Station ID: ${stationId}, Alert Level: ${alertLevel}`)
  }

  return (
    <MaintenanceContext.Provider
      value={{
        maintenanceRequests,
        addMaintenanceRequest,
        removeMaintenanceRequest,
        alertedStations,
        completedAlerts,
        generateRandomAlert,
        markAlertAsCompleted,
      }}
    >
      {children}
    </MaintenanceContext.Provider>
  )
}

export function useMaintenanceContext() {
  const context = useContext(MaintenanceContext)
  if (context === undefined) {
    throw new Error("useMaintenanceContext must be used within a MaintenanceProvider")
  }
  return context
}
