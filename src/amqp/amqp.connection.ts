import {connect, Channel, Connection} from 'amqplib'

export function makeConnection() {
    let connection: Connection

    return async function createConnection() {
        if (connection) return connection
        connection = await connect({
            hostname: 'localhost',
            port: 5672,
            username: 'myuser',
            password: 'mypassword'
        })
        return connection
    }
}

export function makeChannel(connection: Connection) {
    let channel: Channel

    return async function createChannel() {
        if (channel) return channel
        channel = await connection.createChannel()
        return channel
    }
}

export async function initRabbitMq() {
    const connect = makeConnection()
    const connection = await connect()
    const createChannel = makeChannel(connection!!)
    return createChannel()
}
