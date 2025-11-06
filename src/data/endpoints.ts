import { Endpoint } from "@/types/api";

export const endpoints: Endpoint[] = [
  {
    id: "create-token",
    title: "Criar Token",
    method: "POST",
    path: "/api/v1/auth/token",
    description: "Gera um token de autenticação para acesso aos demais endpoints da API. O token é necessário para todas as requisições subsequentes.",
    category: "Autenticação",
    requestBody: {
      contentType: "application/json",
      fields: [
        {
          name: "client_id",
          type: "string",
          required: true,
          description: "Identificador único do cliente fornecido pela LC PAY"
        },
        {
          name: "client_secret",
          type: "string",
          required: true,
          description: "Chave secreta do cliente para autenticação"
        }
      ],
      example: JSON.stringify({
        client_id: "seu_client_id",
        client_secret: "seu_client_secret"
      }, null, 2)
    },
    responses: [
      {
        status: 200,
        description: "Token gerado com sucesso",
        example: JSON.stringify({
          access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          token_type: "Bearer",
          expires_in: 3600
        }, null, 2)
      },
      {
        status: 401,
        description: "Credenciais inválidas",
        example: JSON.stringify({
          error: "invalid_credentials",
          message: "Client ID ou Secret inválidos"
        }, null, 2)
      }
    ]
  },
  {
    id: "create-payment",
    title: "Criar Intenção de Pagamento",
    method: "POST",
    path: "/api/v1/pix/payment",
    description: "Cria uma nova intenção de pagamento PIX dinâmico. Retorna um QR Code e o código copia e cola para o pagamento.",
    category: "Pagamentos",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        description: "Bearer token obtido no endpoint de autenticação"
      }
    ],
    requestBody: {
      contentType: "application/json",
      fields: [
        {
          name: "amount",
          type: "number",
          required: true,
          description: "Valor do pagamento em centavos (ex: 1000 = R$ 10,00)"
        },
        {
          name: "description",
          type: "string",
          required: true,
          description: "Descrição do pagamento"
        },
        {
          name: "customer",
          type: "object",
          required: true,
          description: "Dados do cliente"
        },
        {
          name: "customer.name",
          type: "string",
          required: true,
          description: "Nome completo do cliente"
        },
        {
          name: "customer.document",
          type: "string",
          required: true,
          description: "CPF ou CNPJ do cliente"
        },
        {
          name: "external_id",
          type: "string",
          required: false,
          description: "Identificador externo para controle do merchant"
        }
      ],
      example: JSON.stringify({
        amount: 10000,
        description: "Pagamento de produto XYZ",
        customer: {
          name: "João Silva",
          document: "12345678900"
        },
        external_id: "ORDER-123456"
      }, null, 2)
    },
    responses: [
      {
        status: 201,
        description: "Intenção de pagamento criada com sucesso",
        example: JSON.stringify({
          transaction_id: "txn_abc123def456",
          status: "pending",
          amount: 10000,
          qr_code: "00020126580014br.gov.bcb.pix...",
          qr_code_image: "data:image/png;base64,iVBORw0KGgo...",
          expires_at: "2024-01-20T15:30:00Z"
        }, null, 2)
      },
      {
        status: 400,
        description: "Dados inválidos na requisição",
        example: JSON.stringify({
          error: "validation_error",
          message: "Campo amount é obrigatório"
        }, null, 2)
      }
    ]
  },
  {
    id: "check-status",
    title: "Consultar Status da Transação",
    method: "GET",
    path: "/api/v1/pix/payment/{transaction_id}",
    description: "Consulta o status atual de uma transação PIX pelo ID da transação.",
    category: "Pagamentos",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        description: "Bearer token obtido no endpoint de autenticação"
      },
      {
        name: "transaction_id",
        type: "string",
        required: true,
        description: "ID da transação retornado na criação do pagamento"
      }
    ],
    responses: [
      {
        status: 200,
        description: "Status da transação consultado com sucesso",
        example: JSON.stringify({
          transaction_id: "txn_abc123def456",
          status: "paid",
          amount: 10000,
          paid_at: "2024-01-20T15:25:30Z",
          customer: {
            name: "João Silva",
            document: "12345678900"
          }
        }, null, 2)
      },
      {
        status: 404,
        description: "Transação não encontrada",
        example: JSON.stringify({
          error: "not_found",
          message: "Transação não encontrada"
        }, null, 2)
      }
    ]
  },
  {
    id: "refund",
    title: "Devolução",
    method: "POST",
    path: "/api/v1/pix/refund",
    description: "Realiza a devolução total ou parcial de uma transação PIX já paga.",
    category: "Devoluções",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        description: "Bearer token obtido no endpoint de autenticação"
      }
    ],
    requestBody: {
      contentType: "application/json",
      fields: [
        {
          name: "transaction_id",
          type: "string",
          required: true,
          description: "ID da transação original a ser devolvida"
        },
        {
          name: "amount",
          type: "number",
          required: false,
          description: "Valor da devolução em centavos. Se omitido, devolve o valor total"
        },
        {
          name: "reason",
          type: "string",
          required: true,
          description: "Motivo da devolução"
        }
      ],
      example: JSON.stringify({
        transaction_id: "txn_abc123def456",
        amount: 5000,
        reason: "Devolução parcial solicitada pelo cliente"
      }, null, 2)
    },
    responses: [
      {
        status: 200,
        description: "Devolução processada com sucesso",
        example: JSON.stringify({
          refund_id: "ref_xyz789abc012",
          transaction_id: "txn_abc123def456",
          status: "completed",
          amount: 5000,
          processed_at: "2024-01-20T16:00:00Z"
        }, null, 2)
      },
      {
        status: 400,
        description: "Erro ao processar devolução",
        example: JSON.stringify({
          error: "refund_error",
          message: "Valor da devolução excede o valor da transação"
        }, null, 2)
      }
    ]
  },
  {
    id: "create-payment-due-date",
    title: "Criar Intenção de Pagamento com Data de Vencimento",
    method: "POST",
    path: "/api/v1/pix/payment/scheduled",
    description: "Cria uma intenção de pagamento PIX com data de vencimento específica. Ideal para cobranças com prazo definido.",
    category: "Pagamentos",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        description: "Bearer token obtido no endpoint de autenticação"
      }
    ],
    requestBody: {
      contentType: "application/json",
      fields: [
        {
          name: "amount",
          type: "number",
          required: true,
          description: "Valor do pagamento em centavos"
        },
        {
          name: "description",
          type: "string",
          required: true,
          description: "Descrição do pagamento"
        },
        {
          name: "customer",
          type: "object",
          required: true,
          description: "Dados do cliente"
        },
        {
          name: "due_date",
          type: "string",
          required: true,
          description: "Data de vencimento no formato ISO 8601 (YYYY-MM-DD)"
        },
        {
          name: "fine",
          type: "object",
          required: false,
          description: "Configuração de multa após vencimento"
        },
        {
          name: "interest",
          type: "object",
          required: false,
          description: "Configuração de juros após vencimento"
        }
      ],
      example: JSON.stringify({
        amount: 15000,
        description: "Mensalidade Janeiro/2024",
        customer: {
          name: "Maria Santos",
          document: "98765432100"
        },
        due_date: "2024-01-31",
        fine: {
          percentage: 2
        },
        interest: {
          percentage: 1,
          type: "monthly"
        }
      }, null, 2)
    },
    responses: [
      {
        status: 201,
        description: "Pagamento agendado criado com sucesso",
        example: JSON.stringify({
          transaction_id: "txn_scheduled_789xyz",
          status: "pending",
          amount: 15000,
          due_date: "2024-01-31",
          qr_code: "00020126580014br.gov.bcb.pix...",
          qr_code_image: "data:image/png;base64,iVBORw0KGgo..."
        }, null, 2)
      }
    ]
  }
];
