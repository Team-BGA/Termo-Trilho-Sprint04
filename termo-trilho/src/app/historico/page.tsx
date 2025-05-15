"use client"
import { useMaintenanceContext } from "@/context/maintenance-context"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import SidebarNav from "@/components/sidebar-nav"

export default function Historico() {
  const { maintenanceRequests, removeMaintenanceRequest, completedAlerts } = useMaintenanceContext()

  const formatDate = (date: Date) => {
    return format(new Date(date), "dd/MM/yyyy", { locale: ptBR })
  }

  const handleDelete = (id: string) => {
    removeMaintenanceRequest(id)
  }

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <SidebarNav activePage="historico" />

      {/* Main Content */}
      <div className="main-content historico-content">
        <div className="historico-container">
          <h1 className="historico-title">Últimas Manutenções</h1>

          <div className="table-container">
            {maintenanceRequests.length > 0 ? (
              <table className="maintenance-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Local</th>
                    <th>Id trilho</th>
                    <th>Alerta</th>
                    <th>Descrição</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {maintenanceRequests.map((item) => (
                    <tr key={item.id}>
                      <td>{formatDate(item.date)}</td>
                      <td>{item.location}</td>
                      <td>{item.railId}</td>
                      <td>Nivel {item.alertLevel}</td>
                      <td>{item.description}</td>
                      <td>
                        <span className={`status-badge ${completedAlerts.includes(item.id) ? "completed" : "active"}`}>
                          {completedAlerts.includes(item.id) ? "Concluído" : "Ativo"}
                        </span>
                      </td>
                      <td>
                        <button className="delete-button" onClick={() => handleDelete(item.id)}>
                          Deletar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <p>
                  Nenhuma manutenção registrada. Adicione manutenções através do botão Acionar Manutenção! nas páginas
                  de linha.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
