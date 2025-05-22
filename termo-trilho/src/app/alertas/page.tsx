"use client"
import { useMaintenanceContext } from "@/context/maintenance-context"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import SidebarNav from "@/components/sidebar-nav"
import { RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"

export default function Alertas() {
  const {
    maintenanceRequests,
    completedAlerts,
    markAlertAsCompleted,
    isLoading,
    refreshAlertas,
  } = useMaintenanceContext()

  const [erro, setErro] = useState<string | null>(null)

  // Atualiza os alertas quando a página é carregada
  useEffect(() => {
    const carregar = async () => {
      try {
        setErro(null)
        await refreshAlertas()
      } catch (e) {
        setErro("Erro ao carregar os alertas. Verifique sua conexão ou tente novamente mais tarde.")
        console.error("Erro em refreshAlertas:", e)
      }
    }

    carregar()
  }, [])

  const activeAlerts = maintenanceRequests
    .filter((request) => !completedAlerts.includes(request.id))
    .sort((a, b) => Number.parseInt(b.alertLevel) - Number.parseInt(a.alertLevel))

  const formatDate = (date: Date) => {
    return format(new Date(date), "dd/MM/yyyy", { locale: ptBR })
  }

  const handleComplete = (id: string) => {
    markAlertAsCompleted(id)
  }

  const handleRefresh = async () => {
    try {
      setErro(null)
      await refreshAlertas()
    } catch (e) {
      setErro("Erro ao atualizar os alertas.")
      console.error("Erro ao atualizar alertas:", e)
    }
  }

  return (
    <div className="app-container">
      <SidebarNav activePage="alertas" />
      <div className="main-content alertas-content">
        <div className="alertas-container">
          <div className="historico-header">
            <h1 className="alertas-title">Últimos Alertas</h1>
            <button
              onClick={handleRefresh}
              className="refresh-button"
              disabled={isLoading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#333",
              }}
            >
              <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
              {isLoading ? "Atualizando..." : "Atualizar"}
            </button>
          </div>

          {/* Mensagem de erro */}
          {erro && (
            <div className="erro-alerta" style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>
              {erro}
            </div>
          )}

          <div className="table-container">
            {isLoading ? (
              <div className="loading-state" style={{ textAlign: "center", padding: "2rem" }}>
                <p>Carregando alertas...</p>
              </div>
            ) : activeAlerts.length > 0 ? (
              <table className="alertas-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Local</th>
                    <th>Id trilho</th>
                    <th>Nível</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {activeAlerts.map((item) => (
                    <tr key={item.id}>
                      <td>{formatDate(item.date)}</td>
                      <td>{item.location}</td>
                      <td>{item.railId}</td>
                      <td>Nível {item.alertLevel}</td>
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
