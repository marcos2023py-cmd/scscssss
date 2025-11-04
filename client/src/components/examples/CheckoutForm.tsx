import CheckoutForm from '../CheckoutForm';

const mockItems = [
  {
    id: '1',
    name: 'Pantalla completa (LCD/OLED + táctil)',
    price: 89.99,
    quantity: 2,
    brand: 'Samsung',
    model: 'Galaxy S24'
  }
];

export default function CheckoutFormExample() {
  return (
    <CheckoutForm 
      items={mockItems}
      onSubmit={(data) => console.log('Checkout data:', data)}
    />
  );
}
