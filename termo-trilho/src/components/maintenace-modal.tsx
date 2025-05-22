"use client"

import type React from "react"
import { useState } from "react"
import { X } from "lucide-react"

interface Station {
  id: number
  name: string
}

interface MaintenanceModalProps {
  isOpen: boolean
  onClose: () => void
  currentLine: string
  onSubmit: (data: MaintenanceRequest) => void
  stations?: Station[]
}

export interface MaintenanceRequest {
  id: string
  location: string
  description: string
  alertLevel: string
  line: string
  date: Date
  railId: string
  stationId?: number
  apiId?: number // Adicionado para compatibilidade com a API
}

export default function MaintenanceModal({
  isOpen,
  onClose,
  currentLine,
  onSubmit,
  stations = [],
}: MaintenanceModalProps) {
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [alertLevel, setAlertLevel] = useState("1")
  const [railId, setRailId] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Find the selected station's ID
    const selectedStation = stations.find((station) => station.name === location)

    // Generate a unique ID for the maintenance request
    const id = `maint-${Date.now()}`

    const newRequest: MaintenanceRequest = {
      id,
      location,
      description,
      alertLevel,
      line: currentLine,
      date: new Date(),
      railId:
        railId ||
        Math.floor(Math.random() * 60)
          .toString()
          .padStart(2, "0"), // Use provided railId or generate one
      stationId: selectedStation?.id,
    }

    onSubmit(newRequest)

    // Reset form
    setLocation("")
    setDescription("")
    setAlertLevel("1")
    setRailId("")

    // Close modal
    onClose()
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocation = e.target.value
    setLocation(selectedLocation)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* Close button */}
        <button onClick={onClose} className="modal-close">
          <X size={24} />
        </button>

        <h2 className="modal-title">Acionando Manutenção</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Localização trilho:</label>
            <select value={location} onChange={handleLocationChange} className="form-select" required>
              <option value="">Selecione uma localização</option>
              {stations.map((station) => (
                <option key={station.id} value={station.name}>
                  {station.id} - {station.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">ID do trilho:</label>
            <input
              type="text"
              value={railId}
              onChange={(e) => setRailId(e.target.value)}
              className="form-select form-select-small"
              placeholder="Ex: 25"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Descrição do problema:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nível Alerta:</label>
            <select
              value={alertLevel}
              onChange={(e) => setAlertLevel(e.target.value)}
              className="form-select form-select-small"
              required
            >
              {[1, 2, 3, 4, 5].map((level) => (
                <option key={level} value={level.toString()}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-blue">
              Acionar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
