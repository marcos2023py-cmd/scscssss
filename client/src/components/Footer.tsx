import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display font-semibold text-lg mb-4" data-testid="text-footer-about-title">
              Repuestos D Y M
            </h3>
            <p className="text-sm text-muted-foreground" data-testid="text-footer-about">
              Especialistas en repuestos originales para dispositivos móviles. Calidad garantizada y envío rápido a toda España.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4" data-testid="text-footer-categories-title">Categorías</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-samsung">Samsung</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-apple">Apple</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-xiaomi">Xiaomi</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-motorola">Motorola</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4" data-testid="text-footer-contact-title">Contacto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span data-testid="text-footer-phone">+34 123 456 789</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span data-testid="text-footer-email">info@repuestosdym.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span data-testid="text-footer-location">Madrid, España</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground" data-testid="text-footer-copyright">
          <p>© 2024 Repuestos Informáticos D Y M. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
