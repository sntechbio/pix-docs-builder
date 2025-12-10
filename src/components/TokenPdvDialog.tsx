import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import tokenScreenImage from "@/assets/token-pdv-screen.png";

interface TokenPdvDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TokenPdvDialog = ({ open, onOpenChange }: TokenPdvDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Como Gerar Token PDV</DialogTitle>
          <DialogDescription>
            Veja onde gerar o token para configuração no ERP Desktop
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg border border-border overflow-hidden">
            <img 
              src={tokenScreenImage} 
              alt="Tela de cadastro de Token PDV" 
              className="w-full"
            />
          </div>

          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <p className="text-sm font-semibold text-success mb-4">
              Dados copiados para configuração no ERP Desktop
            </p>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold">Conta:</Label>
                <code className="block rounded bg-code-background px-3 py-2 text-sm text-code-foreground font-mono">
                  5DAA4EDF-7B59-DC1A-909A-D0B301A2F8DC
                </code>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold">Nome PDV:</Label>
                <code className="block rounded bg-code-background px-3 py-2 text-sm text-code-foreground font-mono">
                  CAIXA 1
                </code>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold">Token PDV:</Label>
                <code className="block rounded bg-code-background px-3 py-2 text-sm text-code-foreground font-mono break-all">
                  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDQUlYQV8xXzVEQUE0RURGLTdCNTktREMxQS05MDlBLUQwQjMwMUEyRjhEQ18yVFF2RyIsIxODo4MDgyIiwiZXhwIjoxODk4MTg4MzgxLCJpYXQiOjE3NDA0MDAzODEsImF1dGhvcml0aWVzIjpbIlJPTEVfUERWIiwiVVNVQVJJT19OT1ZPIiwiVVNVQVJJT19MSVNUQVIiLCJVU1VBUklPX0VESViJdfQ.TkZSV_LoEuXtF77YdhsiqsWkolZpDE48zqS6sOYWa9w
                </code>
              </div>
            </div>
          </div>

          <Button onClick={() => onOpenChange(false)} className="w-full">
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
