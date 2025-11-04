import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorModalProps {
  onClose: () => void;
}

export default function ErrorModal({ onClose }: ErrorModalProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" data-testid="modal-error">
      <div className="bg-card p-6 rounded-lg shadow-xl max-w-md w-full border animate-in fade-in-0 zoom-in-95">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg" data-testid="text-error-title">Pago Rechazado</h3>
            <p className="text-muted-foreground" data-testid="text-error-message">
              Los datos de la tarjeta no son aceptados en el comercio. Intente con otra.
            </p>
          </div>
          <Button onClick={onClose} className="w-full" data-testid="button-error-close">
            Entendido
          </Button>
        </div>
      </div>
    </div>
  );
}
