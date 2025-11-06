import { endpoints } from "@/data/endpoints";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ApiSidebarProps {
  activeEndpoint: string;
  onEndpointSelect: (id: string) => void;
}

const methodColors = {
  GET: "bg-accent/20 text-accent border-accent/30",
  POST: "bg-primary/20 text-primary border-primary/30",
  PUT: "bg-warning/20 text-warning border-warning/30",
  DELETE: "bg-destructive/20 text-destructive border-destructive/30",
};

export const ApiSidebar = ({ activeEndpoint, onEndpointSelect }: ApiSidebarProps) => {
  const categories = Array.from(new Set(endpoints.map(e => e.category)));

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 border-r border-border bg-sidebar overflow-y-auto">
      <div className="p-6">
        <h2 className="mb-4 text-sm font-semibold text-sidebar-foreground">Endpoints</h2>
        <nav className="space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="mb-2 text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-1">
                {endpoints
                  .filter((endpoint) => endpoint.category === category)
                  .map((endpoint) => (
                    <li key={endpoint.id}>
                      <button
                        onClick={() => onEndpointSelect(endpoint.id)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                          "hover:bg-sidebar-accent",
                          activeEndpoint === endpoint.id
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="outline"
                            className={cn("text-xs font-mono px-1.5 py-0", methodColors[endpoint.method])}
                          >
                            {endpoint.method}
                          </Badge>
                          <span className="font-medium truncate">{endpoint.title}</span>
                        </div>
                        <div className="text-xs text-sidebar-foreground/60 font-mono truncate">
                          {endpoint.path}
                        </div>
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};
