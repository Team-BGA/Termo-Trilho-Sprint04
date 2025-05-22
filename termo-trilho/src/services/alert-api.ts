/**
 * Serviço para integração com a API de alertas
 * Este serviço faz chamadas para a API de alertas do backend
 */

// Interface para representar um alerta vindo da API
export interface AlertaAPI {
    id: number
    idTrilho: string
    local: string
    descricao: string
    nivelAlerta: number
    linha: string
    data: string
    estacaoId?: number
  }
  
  // Classe para gerenciar as chamadas à API de alertas
  export class AlertaService {
    private baseUrl = "https://quarkus-sprint-04.up.railway.app/alerta"
  
    /**
     * Busca todos os alertas disponíveis na API
     * @returns Promise com a lista de alertas ou [] em caso de erro
     */
    async buscarTodosAlertas(): Promise<AlertaAPI[]> {
      try {
        const response = await fetch(`${this.baseUrl}/all-alertas`)
  
        if (!response.ok) {
          throw new Error(`Erro HTTP ${response.status} ao buscar todos os alertas`)
        }
  
        const data = await response.json()
        return data
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("[AlertaService] Erro ao buscar todos os alertas:", error.message)
        } else {
          console.error("[AlertaService] Erro desconhecido ao buscar todos os alertas:", error)
        }
        return []
      }
    }
  
    /**
     * Busca um alerta específico pelo ID
     * @param id ID do alerta a ser buscado
     * @returns Promise com o alerta encontrado ou null em caso de erro
     */
    async buscarAlertaPorId(id: number): Promise<AlertaAPI | null> {
      try {
        const response = await fetch(`${this.baseUrl}/alertas-by-id/${id}`)
  
        if (!response.ok) {
          throw new Error(`Erro HTTP ${response.status} ao buscar alerta por ID`)
        }
  
        const data = await response.json()
        return data
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(`[AlertaService] Erro ao buscar alerta com ID ${id}:`, error.message)
        } else {
          console.error(`[AlertaService] Erro desconhecido ao buscar alerta com ID ${id}:`, error)
        }
        return null
      }
    }
  
    /**
     * Exclui um alerta pelo ID
     * @param id ID do alerta a ser excluído
     * @returns Promise com true se excluído ou false em caso de erro
     */
    async excluirAlerta(id: number): Promise<boolean> {
      try {
        const response = await fetch(`${this.baseUrl}/excluir-by-id/${id}`, {
          method: "DELETE",
        })
  
        if (!response.ok) {
          throw new Error(`Erro HTTP ${response.status} ao excluir alerta`)
        }
  
        return true
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(`[AlertaService] Erro ao excluir alerta com ID ${id}:`, error.message)
        } else {
          console.error(`[AlertaService] Erro desconhecido ao excluir alerta com ID ${id}:`, error)
        }
        return false
      }
    }
  
    /**
     * Converte um alerta da API para o formato usado no contexto de manutenção
     * @param alertaAPI Alerta vindo da API
     * @returns Alerta no formato do contexto de manutenção
     */
    converterParaMaintenanceRequest(alertaAPI: AlertaAPI) {
      return {
        id: `api-${alertaAPI.id}`,
        location: alertaAPI.local,
        description: alertaAPI.descricao,
        alertLevel: alertaAPI.nivelAlerta.toString(),
        line: alertaAPI.linha,
        date: new Date(alertaAPI.data),
        railId: alertaAPI.idTrilho,
        stationId: alertaAPI.estacaoId,
        apiId: alertaAPI.id, // Mantemos o ID original da API para referência
      }
    }
  }
  
  // Exporta uma instância única do serviço para ser usada em toda a aplicação
  export const alertaService = new AlertaService()
  