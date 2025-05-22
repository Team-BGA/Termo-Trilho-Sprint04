"use client"
import { useMaintenanceContext } from "@/context/maintenance-context"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import SidebarNav from "@/components/sidebar-nav"
import { useState, useEffect } from "react"
import { Search, RefreshCw } from "lucide-react"

export default function Historico() {
  // Usando o contexto de manutenção para acessar os dados
  const { maintenanceRequests, removeMaintenanceRequest, completedAlerts, isLoading, refreshAlertas } =
    useMaintenanceContext()
  // Estado para armazenar a consulta de pesquisa
  const [searchQuery, setSearchQuery] = useState("")

  // Atualiza os alertas quando a página é carregada
  useEffect(() => {
    refreshAlertas()
  }, [])

  // Função para formatar a data no padrão brasileiro
  const formatDate = (date: Date) => {
    return format(new Date(date), "dd/MM/yyyy", { locale: ptBR })
  }

  // Função para lidar com a exclusão de uma solicitação de manutenção
  const handleDelete = (id: string) => {
    removeMaintenanceRequest(id)
  }

  // Função para atualizar os dados
  const handleRefresh = async () => {
    await refreshAlertas()
  }

  // Filtra as solicitações de manutenção com base na consulta de pesquisa
  // Busca por ID do trilho ou ID da solicitação
  const filteredRequests = maintenanceRequests.filter(
    (item) =>
      searchQuery === "" ||
      item.railId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="app-container">
      {/* Barra lateral esquerda */}
      <SidebarNav activePage="historico" />

      {/* Conteúdo principal */}
      <div className="main-content historico-content">
        <div className="historico-container">
          <div className="historico-header">
            <h1 className="historico-title">Últimas Manutenções</h1>

            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              {/* Botão de atualizar */}
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

              {/* Barra de pesquisa */}
              <div className="search-container">
                <Search className="search-icon" size={18} />
                <input
                  type="text"
                  placeholder="Buscar por id"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
          </div>

          <div className="table-container">
            {isLoading ? (
              <div className="loading-state" style={{ textAlign: "center", padding: "2rem" }}>
                <p>Carregando dados...</p>
              </div>
            ) : filteredRequests.length > 0 ? (
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
                  {filteredRequests.map((item) => (
                    <tr key={item.id}>
                      <td>{formatDate(item.date)}</td>
                      <td>{item.location}</td>
                      <td>{item.railId}</td>
                      <td>Nivel {item.alertLevel}</td>
                      <td>{item.description}</td>
                      <td>
                        {/* Exibe o status como "Concluído" ou "Ativo" */}
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
                  {/* Mensagem diferente dependendo se está pesquisando ou não */}
                  {searchQuery
                    ? "Nenhum resultado encontrado para sua busca."
                    : 'Nenhuma manutenção registrada. Adicione manutenções através do botão "Acionar Manutenção!" nas páginas de linha.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
