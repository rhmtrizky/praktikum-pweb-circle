import * as amqp from "amqplib"

async function sendMessageToQueue(queueName: string, payload: any): Promise<boolean> {
    try {
        const connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel()

        await channel.assertQueue(queueName)

        channel.sendToQueue("threads-queue", Buffer.from(JSON.stringify(payload)))

        await channel.close()
        await connection.close()

        return null

    } catch (error) {
        console.log('error enqueuing message', error)
    }
}

export default sendMessageToQueue