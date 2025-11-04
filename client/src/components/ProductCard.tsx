import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import placeholderImage from "@assets/generated_images/Product_placeholder_no_image_available_413e0563.png";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  brand: string;
  model: string;
  onAddToCart: (id: string) => void;
}

export default function ProductCard({ id, name, price, brand, model, onAddToCart }: ProductCardProps) {
  return (
    <Card className="hover-elevate overflow-visible" data-testid={`card-product-${id}`}>
      <CardContent className="p-4 space-y-4">
        <div className="aspect-square bg-muted rounded-md overflow-hidden">
          <img 
            src={placeholderImage} 
            alt={name}
            className="w-full h-full object-cover"
            data-testid={`img-product-${id}`}
          />
        </div>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground" data-testid={`text-brand-${id}`}>
            {brand} {model}
          </p>
          <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem]" data-testid={`text-name-${id}`}>
            {name}
          </h3>
          <p className="text-lg font-bold text-primary" data-testid={`text-price-${id}`}>
            €{price.toFixed(2)}
          </p>
        </div>
        <Button 
          className="w-full" 
          size="sm"
          onClick={() => onAddToCart(id)}
          data-testid={`button-add-cart-${id}`}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Agregar al Carrito
        </Button>
      </CardContent>
    </Card>
  );
}
