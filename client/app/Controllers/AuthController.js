import { ProxyState } from '../AppState.js'
import { audience, clientId, domain } from '../env.js'
import { AuthService } from '../Services/AuthService.js'
import { logger } from '../Utils/Logger.js'

function drawUser() {
  const user = ProxyState.user
  const userAvatar = avatarTemplate(user)
  const button = authButton(user)

  const template = /* html */ `
    ${userAvatar}
    ${button}
  `
  document.getElementById('authstate').innerHTML = template
}

function _drawAuthSettings() {
  const elem = document.getElementById('auth-settings')
  if (!elem) { return }
  elem.innerHTML = /* html */`
  
`
}

export class AuthController {
  constructor() {
    ProxyState.on('user', drawUser)
    AuthService.on(AuthService.AUTH_EVENTS.LOADED, drawUser)
    AuthService.on(AuthService.AUTH_EVENTS.LOADED, _drawAuthSettings)
    drawUser()
  }

  async login() {
    try {
      await AuthService.loginWithPopup()
    } catch (e) {
      logger.error(e)
    }
  }

  logout() {
    try {
      AuthService.logout()
    } catch (e) {
      logger.error(e)
    }
  }
}

function authButton(user) {
  if (AuthService.loading) { return '' }
  return user.isAuthenticated
    ? /* html */ `
    <button class="btn btn-small btn-secondary text-dark h-50 w-25 mt-2 ms-3 f-10 p-0" onclick="app.authController.logout()">Log Out</button>
  `
    : /* html */ `
    <button class="btn btn-dark" onclick="app.authController.login()">login</button>
  `
}

function avatarTemplate(user) {
  return user.isAuthenticated
    ? /* html */ `
    <div class="mr-2">
      <img class="rounded-circle" src="${user.picture}" alt="${user.name}" height="45"/>
      <span class="mx-1">${user.name}</span>
      </div>`
    : AuthService.loading
      ? /* html */ `
      <div class="skeleton-loader dark avatar"></div>
      <div class="skeleton-loader dark text sm mx-2"></div>`
      : /* html */`
      <div></div>
      `
}
