const serverRoute = import.meta.env.VITE_SERVER_URL
const apiRoute = `${serverRoute}/api`
const verifyUserRoute = `${apiRoute}/room/verify`
const createRoomRoute = `${apiRoute}/room/create`
const accessRoomRoute = `${apiRoute}/room/access`
const userGetRoute = `${apiRoute}/users`
const refreshRoute = `${apiRoute}/refresh`
const logoutRoute = `${apiRoute}/logout`
const registerUserRoute = `${apiRoute}/auth/register`
const loginUserRoute = `${apiRoute}/auth/login`
const addContactRoute = `${apiRoute}/users/addContact`

export {
  serverRoute,
  apiRoute,
  verifyUserRoute,
  createRoomRoute,
  accessRoomRoute,
  userGetRoute,
  refreshRoute,
  logoutRoute,
  registerUserRoute,
  loginUserRoute,
  addContactRoute
}