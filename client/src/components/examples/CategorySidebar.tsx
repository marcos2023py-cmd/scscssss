import CategorySidebar from '../CategorySidebar';

const mockBrands = [
  {
    id: 'samsung',
    name: 'Samsung',
    models: [
      { id: 'fold6', name: 'Galaxy Z Fold6' },
      { id: 'flip6', name: 'Galaxy Z Flip6' },
      { id: 's24', name: 'Galaxy S24' },
    ]
  },
  {
    id: 'apple',
    name: 'Apple',
    models: [
      { id: 'iphone15', name: 'iPhone 15' },
      { id: 'iphone14', name: 'iPhone 14' },
    ]
  }
];

export default function CategorySidebarExample() {
  return (
    <div className="h-96">
      <CategorySidebar 
        brands={mockBrands}
        onSelectModel={(brandId, modelId) => console.log('Selected:', brandId, modelId)}
      />
    </div>
  );
}
