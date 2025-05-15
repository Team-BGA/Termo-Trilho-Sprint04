"use client"
import { useMaintenanceContext } from "@/context/maintenance-context"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import SidebarNav from "@/components/sidebar-nav"

export default function Alertas() {
  const { maintenanceRequests, completedAlerts, markAlertAsCompleted } = useMaintenanceContext()

  // Show all active alerts (not completed)
  const activeAlerts = maintenanceRequests
    .filter((request) => !completedAlerts.includes(request.id))
    .sort((a, b) => Number.parseInt(b.alertLevel) - Number.parseInt(a.alertLevel)) // Sort by alert level (highest first)

  const formatDate = (date: Date) => {
    return format(new Date(date), "dd/MM/yyyy", { locale: ptBR })
  }

  const handleComplete = (id: string) => {
    markAlertAsCompleted(id)
  }

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <SidebarNav activePage="alertas" />

      {/* Main Content */}
      <div className="main-content alertas-content">
        <div className="alertas-container">
          <h1 className="alertas-title">Últimos Alertas</h1>

          <div className="table-container">
            {activeAlerts.length > 0 ? (
              <table className="alertas-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Local</th>
                    <th>Id trilho</th>
                    <th>Nivel</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {activeAlerts.map((item) => (
                    <tr key={item.id}>
                      <td>{formatDate(item.date)}</td>
                      <td>{item.location}</td>
                      <td>{item.railId}</td>
                      <td>Nivel {item.alertLevel}</td>
                      <td>
                        <button className="complete-button" onClick={() => handleComplete(item.id)}>
                          Concluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <p>Nenhum alerta ativo no momento.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
