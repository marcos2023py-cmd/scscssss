import Cart from '../Cart';

const mockItems = [
  {
    id: '1',
    name: 'Pantalla completa (LCD/OLED + táctil)',
    price: 89.99,
    quantity: 2,
    brand: 'Samsung',
    model: 'Galaxy S24'
  },
  {
    id: '2',
    name: 'Batería',
    price: 29.99,
    quantity: 1,
    brand: 'iPhone',
    model: '15 Pro'
  }
];

export default function CartExample() {
  return (
    <Cart 
      items={mockItems}
      onClose={() => console.log('Close cart')}
      onUpdateQuantity={(id, qty) => console.log('Update quantity:', id, qty)}
      onRemoveItem={(id) => console.log('Remove item:', id)}
      onCheckout={() => console.log('Checkout')}
    />
  );
}
