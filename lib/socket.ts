import { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";

export type SocketServer = SocketIOServer;

let io: SocketIOServer | undefined;

export const initSocket = (server: NetServer): SocketIOServer => {
  if (!io) {
    io = new SocketIOServer(server, {
      path: "/api/socket",
      addTrailingSlash: false,
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);

      // Join room based on patient clerkId
      socket.on("join-patient-room", (clerkId: string) => {
        socket.join(`patient-${clerkId}`);
        console.log(`Patient ${clerkId} joined room`);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });
  }

  return io;
};

export const getSocket = (): SocketIOServer | undefined => {
  return io;
};

export const emitGDAAcceptance = (patientClerkId: string, gdaData: any) => {
  if (io) {
    io.to(`patient-${patientClerkId}`).emit("gda-accepted", gdaData);
    console.log(`Emitted GDA acceptance to patient ${patientClerkId}`);
  }
};
