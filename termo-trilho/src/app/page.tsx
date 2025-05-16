"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Fingerprint, Lock } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate credentials here
    router.push("/dashboard")
  }

  return (
    <div className="login-container">
      {/* Left side - Login Form */}
      <div className="login-form-container">
        <div className="login-form">
          <h1>Faça Seu Login!</h1>
          <p>Utilize seus dados</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="input-icon">
                <Fingerprint className="h-5 w-5" />
              </div>
              <input
                type="text"
                className="input-field"
                placeholder="ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>

            <div className="input-group">
              <div className="input-icon">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type="password"
                className="input-field"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="forgot-password">
              <a href="#">Esqueceu a sua Senha?</a>
            </div>

            <button type="submit" className="btn-primary">
              Entrar
            </button>
          </form>
        </div>
      </div>

      {/* Right side - Brand */}
      <div className="brand-container">
        <div className="brand-logo">
          <div>
            <h2>
              <span className="blue-text">T</span>
              <span className="gray-text">ermo</span>
            </h2>
            <h2>
              <span className="gray-text">T</span>
              <span className="blue-text">rilho</span>
            </h2>
          </div>
        </div>

        <div className="welcome-text">
          <h3>Olá, tudo bem?</h3>
          <p>Utilize seu ID CCR pra utilizar o Termo Trilho.</p>
        </div>
      </div>
    </div>
  )
}
