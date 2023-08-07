
const momentModule = await import('moment')
const moment = momentModule.default || momentModule

const ioModule = await import('socket.io-client')
const io = ioModule.default || ioModule

const axiosModule = await import('axios')
const axios = axiosModule.default || axiosModule

const relamModule = await import('realm-web')
const Relam = relamModule.default || relamModule


export {
  moment, io, axios , Relam
}