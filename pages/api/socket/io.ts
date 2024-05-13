import {Server as NetServer} from "http";
import { NextApiRequest } from "next";
import {Server as ServerIo} from "socket.io"
import { NextApiResponseServerIo } from "@/types";

// This configuration object specifies that the API route (ioHandler) should 
// not use the built-in body parser provided by Next.js (bodyParser:false). 
// This is because the route is intended for handling WebSocket connections, which do not have a typical HTTP request body.
export const config = {
    api:{
        bodyParser:false,
    }
}

// This code sets up a WebSocket API route (/api/socket/io) and attaches a Socket.IO server to it, 
// enabling WebSocket communication in the Next.js application.

const ioHandler = (req:NextApiRequest,res:NextApiResponseServerIo)=>{
    // It first checks if the Socket.IO server instance is already attached to the HTTP server instance. 
    // If not (!res.socket.server.io), it proceeds to create a new instance.
   
    if(!res.socket.server.io){
        const path = "/api/socket/io"
        const httpServer:NetServer = res.socket.server as any;
        const io = new ServerIo(httpServer,{
            path:path,
            // @ts-ignore
            addTrailingSlash:false,
        })
        res.socket.server.io = io;
    }
    res.end();
}
export default ioHandler;