import { Endpoint } from "@/types/api";

export const endpoints: Endpoint[] = [
  {
    id: "create-payment",
    title: "Criar intenção de pagamento (PIX Dinâmico)",
    method: "POST",
    path: "/api/v2/movimentacao/{accountId}/pixCashIn",
    description: "Cria uma nova intenção de pagamento PIX dinâmico, retornando os dados do QR Code (imagem Base64 e código copia e cola).",
    category: "Pagamentos",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        description: "Bearer token obtido no portal LC PAY (token PDV)"
      },
      {
        name: "accountId",
        type: "string",
        required: true,
        description: "Identificador único da conta do cliente"
      }
    ],
    requestBody: {
      contentType: "application/json",
      fields: [
        {
          name: "valorTotal",
          type: "number",
          required: true,
          description: "Valor total da cobrança"
        },
        {
          name: "numeroPedido",
          type: "string",
          required: true,
          description: "Identificador do pedido definido pelo cliente"
        },
        {
          name: "conteudo",
          type: "string",
          required: true,
          description: "Campo para descrição ou controle interno do cliente"
        }
      ],
      example: JSON.stringify({
        valorTotal: 18.0,
        numeroPedido: "ID3455",
        conteudo: "ID123"
      }, null, 2)
    },
    responses: [
      {
        status: 201,
        description: "Intenção de pagamento criada com sucesso",
        example: JSON.stringify({
          data: {
            transactionId: "133BD098-F481-52D6-6F7F-A357E09DEB73",
            externalIdentifier: "b15e42bc-a792-4336-a0a1-0244c46f93f7",
            financialStatement: { status: "CREATED" },
            transactionDate: "2025-07-29T15:19:07.925-03:00",
            transactionType: "InstantPayment",
            totalAmount: 18,
            paidAmount: 0,
            instantPayment: {
              textContent: "00020101021226990014br.gov.bcb.pix2577...",
              imageContent: "iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAIAAAAP3aGbA...",
              mimeType: "image/png",
              actualImageWidth: 400
            }
          }
        }, null, 2)
      }
    ]
  },
  {
    id: "check-status",
    title: "Consultar status da transação",
    method: "GET",
    path: "/api/accounts/{accountId}/consultarTransactions/{transactionId}",
    description: "Consulta o status atual de uma transação PIX previamente criada.",
    category: "Pagamentos",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        description: "Bearer token (Access Token PDV)"
      },
      {
        name: "accountId",
        type: "string",
        required: true,
        description: "Identificador único da conta"
      },
      {
        name: "transactionId",
        type: "string",
        required: true,
        description: "ID da transação retornado na criação da cobrança"
      }
    ],
    responses: [
      {
        status: 200,
        description: "Consulta realizada com sucesso",
        example: JSON.stringify({
          data: {
            transactions: [
              {
                transactionId: "9D8DFD79-EE0B-A54A-0635-D59F5843A055",
                transactionType: "PaymentInstantPayment",
                transactionStatus: "APPROVED",
                totalAmount: 100,
                paidAmount: 100,
                transactionDate: "2025-07-18T08:56:05.866-03:00",
                instantPayment: {
                  sender: { name: "CONTA DE PAGAMENTO DE PIX" },
                  recipient: { name: "Leandro de Sousa Nascimento" }
                }
              }
            ]
          }
        }, null, 2)
      }
    ]
  },
  {
    id: "refund",
    title: "Devolução (Refund)",
    method: "POST",
    path: "/api/movimentacao/{accountId}/instant-payments/{transactionId}/returns",
    description: "Realiza a devolução de uma transação PIX aprovada, total ou parcial.",
    category: "Devoluções",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        description: "Bearer token (Access Token PDV)"
      },
      {
        name: "accountId",
        type: "string",
        required: true,
        description: "ID da conta vinculada à transação original"
      },
      {
        name: "transactionId",
        type: "string",
        required: true,
        description: "ID da transação que será devolvida"
      }
    ],
    requestBody: {
      contentType: "application/json",
      fields: [
        {
          name: "amount",
          type: "number",
          required: true,
          description: "Valor da devolução."
        },
        {
          name: "externalIdentifier",
          type: "string",
          required: true,
          description: "Identificador controlado pelo integrador."
        },
        {
          name: "returnReasonCode",
          type: "string",
          required: true,
          description: "Código de devolução controlado pelo Banco Central (Devolução de pagamento instantâneo solicitado pelo usuário recebedor)."
        }
      ],
      example: JSON.stringify({
        externalIdentifier: "d81540e9-e579-4352-9b98-00552cb39164",
        amount: 135.00,
        returnReasonCode: "MD06"
      }, null, 2)
    },
    responses: [
      {
        status: 200,
        description: "Devolução realizada com sucesso",
        example: JSON.stringify({
          data: {
            transactionId: "6FA62ACC-E448-D51D-C3AA-9D4EA2BDCEA0"
          }
        }, null, 2)
      }
    ]
  }
];
