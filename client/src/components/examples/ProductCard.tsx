import ProductCard from '../ProductCard';

export default function ProductCardExample() {
  return (
    <div className="w-72">
      <ProductCard 
        id="1"
        name="Pantalla completa (LCD/OLED + táctil)"
        price={89.99}
        brand="Samsung"
        model="Galaxy S24"
        onAddToCart={(id) => console.log('Add to cart:', id)}
      />
    </div>
  );
}
