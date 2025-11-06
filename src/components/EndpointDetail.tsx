import { Endpoint } from "@/types/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface EndpointDetailProps {
  endpoint: Endpoint;
}

const methodColors = {
  GET: "bg-accent/20 text-accent border-accent/30",
  POST: "bg-primary/20 text-primary border-primary/30",
  PUT: "bg-warning/20 text-warning border-warning/30",
  DELETE: "bg-destructive/20 text-destructive border-destructive/30",
};

const CodeBlock = ({ code, language = "json" }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
      >
        {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
      </button>
      <pre className="bg-[hsl(var(--code-background))] text-[hsl(var(--code-foreground))] p-4 rounded-lg overflow-x-auto text-sm">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
};

export const EndpointDetail = ({ endpoint }: EndpointDetailProps) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="outline" className={cn("text-sm font-mono px-3 py-1", methodColors[endpoint.method])}>
            {endpoint.method}
          </Badge>
          <code className="text-lg font-mono text-foreground">{endpoint.path}</code>
        </div>
        <h2 className="text-3xl font-bold mb-3">{endpoint.title}</h2>
        <p className="text-muted-foreground text-lg">{endpoint.description}</p>
      </div>

      {/* Parameters */}
      {endpoint.parameters && endpoint.parameters.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Parâmetros</h3>
          <div className="space-y-4">
            {endpoint.parameters.map((param) => (
              <div key={param.name} className="border-l-2 border-primary pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <code className="font-mono text-sm font-medium">{param.name}</code>
                  <Badge variant="secondary" className="text-xs">
                    {param.type}
                  </Badge>
                  {param.required && (
                    <Badge variant="destructive" className="text-xs">
                      obrigatório
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{param.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Request Body */}
      {endpoint.requestBody && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Corpo da Requisição</h3>
          
          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3">Campos</h4>
            <div className="space-y-3">
              {endpoint.requestBody.fields.map((field) => (
                <div key={field.name} className="border-l-2 border-primary pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="font-mono text-sm font-medium">{field.name}</code>
                    <Badge variant="secondary" className="text-xs">
                      {field.type}
                    </Badge>
                    {field.required && (
                      <Badge variant="destructive" className="text-xs">
                        obrigatório
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{field.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Exemplo</h4>
            <CodeBlock code={endpoint.requestBody.example} />
          </div>
        </Card>
      )}

      {/* Responses */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Respostas</h3>
        <div className="space-y-6">
          {endpoint.responses.map((response) => (
            <div key={response.status}>
              <div className="flex items-center gap-2 mb-3">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-sm font-mono px-3 py-1",
                    response.status >= 200 && response.status < 300
                      ? "bg-accent/20 text-accent border-accent/30"
                      : "bg-destructive/20 text-destructive border-destructive/30"
                  )}
                >
                  {response.status}
                </Badge>
                <span className="text-sm font-medium">{response.description}</span>
              </div>
              <CodeBlock code={response.example} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
