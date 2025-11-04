import { Loader2 } from "lucide-react";

export default function LoadingModal() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center" data-testid="modal-loading">
      <div className="bg-card p-8 rounded-lg shadow-xl flex flex-col items-center gap-4 border">
        <Loader2 className="h-16 w-16 text-primary animate-spin" />
        <p className="text-lg font-medium" data-testid="text-loading">Procesando pago...</p>
      </div>
    </div>
  );
}
