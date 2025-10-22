// Admin authentication utilities
const ADMIN_PASSWORD = "admin123" // À changer en production

export function validateAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD
}

export function getAdminSession(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("adminSession")
}

export function setAdminSession(token: string): void {
  if (typeof window === "undefined") return
  localStorage.setItem("adminSession", token)
}

export function clearAdminSession(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("adminSession")
}

export function isAdminAuthenticated(): boolean {
  const session = getAdminSession()
  return session === "authenticated"
}
