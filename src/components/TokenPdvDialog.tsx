import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TokenPdvDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TokenPdvDialog = ({ open, onOpenChange }: TokenPdvDialogProps) => {
  const [tokenName, setTokenName] = useState("");
  const [generatedData, setGeneratedData] = useState<{
    conta: string;
    nomePdv: string;
    tokenPdv: string;
  } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleGenerateToken = () => {
    if (!tokenName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, insira um nome para o token PDV.",
        variant: "destructive",
      });
      return;
    }

    // Simula geração de token
    setGeneratedData({
      conta: "5DAA4EDF-7B59-DC1A-909A-D0B301A2F8DC",
      nomePdv: tokenName,
      tokenPdv: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDQUlYQV8xXzVEQUE0RURGLTdCNTktREMxQS05MDlBLUQwQjMwMUEyRjhEQ18yVFF2RyIsIxODo4MDgyIiwiZXhwIjoxODk4MTg4MzgxLCJpYXQiOjE3NDA0MDAzODEsImF1dGhvcml0aWVzIjpbIlJPTEVfUERWIiwiVVNVQVJJT19OT1ZPIiwiVVNVQVJJT19MSVNUQVIiLCJVU1VBUklPX0VESVRBUiIsIlVTVUFSSU9fREVMRVRBUiJdfQ.TkZSV_LoEuXtF77YdhsiqsWkolZpDE48zqS6sOYWa9w"
    });

    toast({
      title: "Token gerado com sucesso",
      description: "Os dados estão prontos para configuração no ERP Desktop.",
    });
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    
    toast({
      title: "Copiado!",
      description: `${fieldName} copiado para a área de transferência.`,
    });

    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleClose = () => {
    setTokenName("");
    setGeneratedData(null);
    setCopiedField(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Gerar Token PDV</DialogTitle>
          <DialogDescription>
            Cadastre um novo token para PDV (Ponto de Venda)
          </DialogDescription>
        </DialogHeader>

        {!generatedData ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="token-name">Nome do Token PDV</Label>
              <Input
                id="token-name"
                placeholder="Ex: CAIXA 1"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerateToken()}
              />
            </div>
            <Button onClick={handleGenerateToken} className="w-full">
              Gerar Token
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <p className="text-sm font-semibold text-success mb-4">
                Dados copiados para configuração no ERP Desktop
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold">Conta:</Label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 rounded bg-code-background px-3 py-2 text-sm text-code-foreground font-mono">
                      {generatedData.conta}
                    </code>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleCopy(generatedData.conta, "Conta")}
                    >
                      {copiedField === "Conta" ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold">Nome PDV:</Label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 rounded bg-code-background px-3 py-2 text-sm text-code-foreground font-mono">
                      {generatedData.nomePdv}
                    </code>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleCopy(generatedData.nomePdv, "Nome PDV")}
                    >
                      {copiedField === "Nome PDV" ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold">Token PDV:</Label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 rounded bg-code-background px-3 py-2 text-sm text-code-foreground font-mono break-all">
                      {generatedData.tokenPdv}
                    </code>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleCopy(generatedData.tokenPdv, "Token PDV")}
                    >
                      {copiedField === "Token PDV" ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Fechar
              </Button>
              <Button
                onClick={() => {
                  setTokenName("");
                  setGeneratedData(null);
                }}
                className="flex-1"
              >
                Gerar Novo Token
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
