import Header from '../Header';

export default function HeaderExample() {
  return (
    <Header 
      cartCount={3}
      onCartClick={() => console.log('Cart clicked')}
      onMenuClick={() => console.log('Menu clicked')}
      onSearch={(query) => console.log('Search:', query)}
    />
  );
}
