// import * as amqp from "amqplib"
// import { Request, Response } from "express"

// class QueueController {
//     async enqueue(req: Request, res: Response) {
//         try {
//             const data = req.body;
//             const filename = res.locals.filename
//             const loginSession = res.locals.loginSession;
//             console.log(loginSession)
    
//             const user = loginSession.user
//                 const threadCreate = {
//                     content: data.content,
//                     image: filename,
//                     user: user,
//                 }

//             const payload = {
//                 content: threadCreate.content,
//                 image: threadCreate.image,
//                 user: threadCreate.user,
//             }   

//             const connection = await amqp.connect("amqp://localhost")
//             const channel = await connection.createChannel()

//             await channel.assertQueue("thread-queue")

//             channel.sendToQueue("thread-queue", Buffer.from(JSON.stringify(payload)))
//             await channel.close()
//             await connection.close()

//             res.status(200).json({
//                 message: "thread is queue"
//             })
//         } catch (err) {
//             console.log('error enqueuing message', err)
//             res.status(500).json({
//                 message: "something wrong in server"
//             })
//         }
//     }
// }

// export default new QueueController