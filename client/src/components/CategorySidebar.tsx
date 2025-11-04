import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight } from "lucide-react";

interface Model {
  id: string;
  name: string;
}

interface Brand {
  id: string;
  name: string;
  models: Model[];
}

interface CategorySidebarProps {
  brands: Brand[];
  onSelectModel: (brandId: string, modelId: string) => void;
  selectedBrand?: string;
  selectedModel?: string;
}

export default function CategorySidebar({ brands, onSelectModel, selectedBrand, selectedModel }: CategorySidebarProps) {
  const [expandedBrands, setExpandedBrands] = useState<Set<string>>(new Set([brands[0]?.id]));

  const toggleBrand = (brandId: string) => {
    const newExpanded = new Set(expandedBrands);
    if (newExpanded.has(brandId)) {
      newExpanded.delete(brandId);
    } else {
      newExpanded.add(brandId);
    }
    setExpandedBrands(newExpanded);
  };

  return (
    <aside className="w-64 border-r bg-card h-full" data-testid="sidebar-categories">
      <div className="p-4 border-b">
        <h2 className="font-display font-semibold text-lg" data-testid="text-sidebar-title">Categorías</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="p-2 space-y-1">
          {brands.map((brand) => (
            <div key={brand.id} data-testid={`category-${brand.id}`}>
              <Button
                variant="ghost"
                className="w-full justify-between"
                onClick={() => toggleBrand(brand.id)}
                data-testid={`button-brand-${brand.id}`}
              >
                <span className="font-medium">{brand.name}</span>
                {expandedBrands.has(brand.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              {expandedBrands.has(brand.id) && (
                <div className="ml-4 mt-1 space-y-1">
                  {brand.models.map((model) => (
                    <Button
                      key={model.id}
                      variant={selectedBrand === brand.id && selectedModel === model.id ? "secondary" : "ghost"}
                      className="w-full justify-start text-sm"
                      onClick={() => onSelectModel(brand.id, model.id)}
                      data-testid={`button-model-${model.id}`}
                    >
                      {model.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
