import { Endpoint } from "@/types/api";

export const endpoints: Endpoint[] = [
  {
    id: "create-payment",
    title: "Criar intenção de pagamento (PIX Dinâmico)",
    method: "POST",
    path: "/api/v2/movimentacao/{accountId}/pixCashIn",
    description:
      "Cria uma nova intenção de pagamento PIX dinâmico, retornando os dados do QR Code (imagem Base64 e código copia e cola).",
    category: "Pagamentos",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        description: "Bearer token obtido no portal LC PAY (token PDV)",
      },
      {
        name: "accountId",
        type: "string",
        required: true,
        description: "Identificador único da conta do cliente",
      },
    ],
    requestBody: {
      contentType: "application/json",
      fields: [
        {
          name: "valorTotal",
          type: "number",
          required: true,
          description: "Valor total da cobrança",
        },
        {
          name: "numeroPedido",
          type: "string",
          required: true,
          description: "Identificador do pedido definido pelo cliente",
        },
        {
          name: "conteudo",
          type: "string",
          required: true,
          description: "Campo para descrição ou controle interno do cliente",
        },
      ],
      example: JSON.stringify(
        {
          valorTotal: 18.0,
          numeroPedido: "ID3455",
          conteudo: "ID123",
        },
        null,
        2
      ),
    },
    responses: [
      {
        status: 201,
        description: "Intenção de pagamento criada com sucesso",
        example: JSON.stringify(
          {
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
                imageContent:
                  "iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAIAAAAP3aGbA...",
                mimeType: "image/png",
                actualImageWidth: 400,
              },
            },
          },
          null,
          2
        ),
      },
    ],
  },
  {
    id: "create-pix-charge",
    title: "Criar Cobrança PIX (Pix Cobrança)",
    method: "POST",
    path: "/api/v2/movimentacao/{accountId}/pixCobranca",
    description:
      "Cria uma cobrança PIX com data de vencimento, regras de juros/multa e dados detalhados do pagador, gerando o QR Code para pagamento.",
    category: "Pagamentos",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        description: "Bearer token (Access Token PDV).",
      },
      {
        name: "accountId",
        type: "string",
        required: true,
        description: "Identificador único da conta do beneficiário.",
      },
    ],
    requestBody: {
      contentType: "application/json",
      fields: [
        {
          name: "dadosCobranca",
          type: "object",
          required: true,
          description: "Dados principais da cobrança (valor, vencimento, etc).",
        },
        {
          name: "pagador",
          type: "object",
          required: true,
          description:
            "Informações do pagador (nome, CPF/CNPJ, endereço, cidade, UF, CEP).",
        },
        {
          name: "regrasCobranca",
          type: "object",
          required: true,
          description:
            "Regras de cobrança, como juros, multa e quantidade de parcelas.",
        },
      ],
      example: JSON.stringify(
        {
          dadosCobranca: {
            valorTotal: 500.9,
            dataVencimento: "2026-02-20",
            codigoExterno: "FAT20260220",
            conteudo: "Cobrança referente à atualização e suporte premium.",
          },
          pagador: {
            cpfCnpj: "40.185.574/0001-04",
            razaoSocial: "DataLink Consultoria em Tecnologia LTDA",
            nomeFantasia: "DataLink Tech",
            segmento: "Consultoria em TI",
            email: "financeiro@datalinktech.com.br",
            telefoneCelular: "+55 11 99125-8843",
            nomePagador: "DataLink Consultoria em Tecnologia LTDA",
            logradouro: "Rua Funchal, 241",
            cidade: "São Paulo",
            bairro: "Vila Olímpia",
            uf: "SP",
            cep: "04551060",
          },
          regrasCobranca: {
            juros: 0.9,
            multa: 1.8,
            frequenciaCobranca: "MENSAL",
            tipoMulta: "PERCENTUAL",
            quantidadeParcelas: 3,
          },
          urlCallBack: "https://meusite.com/api/pix/callback",
        },
        null,
        2
      ),
    },
    responses: [
      {
        status: 200,
        description: "Cobrança PIX criada com sucesso.",
        example: JSON.stringify(
          [
            {
              reciboPagador: {
                numeroDocumento: 1834,
                vencimento: "2026-02-20",
                valor: 500.9,
                pagador: "Softmax Soluções Digitais LTDA",
                numeroParcela: 1,
                totalParcelas: 3,
                juros: 1.0,
                multa: 2.0,
                cpfCnpj: "40.185.524/0001-04",
                tipoMulta: "PERCENTUAL",
                frequenciaCobranca: "MENSAL",
              },
              pagamentoPix: {
                transacaoId: "C6AAE15F-1617-28BA-BE82-84C95C2470C7",
                codigoExternoIntegrador: "FAT20260220",
                beneficiario: "Leandro de Sousa Nascimento",
                emissao: "2025-11-06",
                cnpjBeneficiario: "32647326000100",
                vencimento: "2026-02-20",
                numeroDocumento: 1834,
                valor: 500.9,
                instrucoesAdicionais:
                  "Cobrança referente à atualização e suporte premium do sistema LC Pay.",
                pagador: {
                  nome: "Softmax Soluções Digitais LTDA",
                  endereco: "Avenida Brasil, 455",
                  cep: "80030010",
                  uf: "PR",
                  cpfCnpj: "55738203000171",
                },
                outrasInformacoes:
                  "Cobrança referente à atualização e suporte premium do sistema LC Pay.",
                email: "financeiro@datalinktech.com.br",
                documento: {
                  link: "http://api-hml/api/v2/movimentacao/download/inv_7ecbf13b-0efe-4d8e-ae8f-f7f352de32539.pdf"
                },
              },
            },
          ],
          null,
          2
        ),
      },
    ],
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
        description: "Bearer token (Access Token PDV)",
      },
      {
        name: "accountId",
        type: "string",
        required: true,
        description: "Identificador único da conta",
      },
      {
        name: "transactionId",
        type: "string",
        required: true,
        description: "ID da transação retornado na criação da cobrança",
      },
    ],
    responses: [
      {
        status: 200,
        description: "Consulta realizada com sucesso",
        example: JSON.stringify(
          {
            data: {
              transactions: [
                {
                  transactionId: "9D8DFD79-EE0B-A54A-0635-D59F5843A055",
                  transactionType: "PaymentInstantPayment",
                  transactionStatus: ["APPROVED", "CREATED"],
                  totalAmount: 100,
                  paidAmount: 100,
                  transactionDate: "2025-07-18T08:56:05.866-03:00",
                  instantPayment: {
                    sender: { name: "CONTA DE PAGAMENTO DE PIX" },
                    recipient: { name: "Leandro de Sousa Nascimento" },
                  },
                },
              ],
            },
          },
          null,
          2
        ),
      },
    ],
  },
  {
    id: "refund",
    title: "Devolução (Refund)",
    method: "POST",
    path: "/api/movimentacao/{accountId}/instant-payments/{transactionId}/returns",
    description:
      "Realiza a devolução de uma transação PIX aprovada, total ou parcial.",
    category: "Devoluções",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        description: "Bearer token (Access Token PDV)",
      },
      {
        name: "accountId",
        type: "string",
        required: true,
        description: "ID da conta vinculada à transação original",
      },
      {
        name: "transactionId",
        type: "string",
        required: true,
        description: "ID da transação que será devolvida",
      },
    ],
    requestBody: {
      contentType: "application/json",
      fields: [
        {
          name: "amount",
          type: "number",
          required: false,
          description:
            "Valor da devolução. Se omitido, devolve o valor total da transação.",
        },
        {
          name: "externalIdentifier",
          type: "string",
          required: false,
          description: "Identificador externo controlado pelo cliente.",
        },
        {
          name: "returnReasonCode",
          type: "string",
          required: false,
          description:
            "Código razão controlado pelo Banco Central (Ex: MD06).",
        },
      ],
      example: JSON.stringify(
        {
          externalIdentifier: "d81540e9-e579-4352-9b98-00552cb39164",
          amount: 50.0,
          returnReasonCode: "MD06",
        },
        null,
        2
      ),
    },
    responses: [
      {
        status: 200,
        description: "Devolução realizada com sucesso",
        example: JSON.stringify(
          {
            data: {
              transactionId: "6FA62ACC-E448-D51D-C3AA-9D4EA2BDCEA0",
            },
          },
          null,
          2
        ),
      },
    ],
  },
  {
    id: "webhook-dispatch",
    title: "Acionar Webhook (Somente Headers)",
    method: "POST",
    path: "https://api.exemplo.com/webhook",
    description:
      "Exemplo de notificação de pagamento PIX enviada para o endpoint de webhook configurado.",
    category: "Webhooks",
    parameters: [
      {
        name: "webhook-transaction-id",
        type: "string",
        required: true,
        description: "Identificador da transação enviada na notificação.",
      },
      {
        name: "webhook-external-code",
        type: "string",
        required: true,
        description: "Código externo que referencia a operação do cliente.",
      },
      {
        name: "webhook-event-type",
        type: "string",
        required: true,
        description: "Tipo do evento enviado (ex.: pix.payment).",
      },
    ],
    requestBody: {
      contentType: "application/json",
      fields: [],
      example: JSON.stringify({}, null, 2),
    },
    responses: [
      {
        status: 200,
        description: "Webhook recebeu os dados com sucesso.",
        example: JSON.stringify({}, null, 2),
      },
    ],
  },
  {
    id: "reemissao-cobrancas-pdf",
    title: "Reemissão de Cobranças PDF",
    method: "POST",
    path: "/api/v2/cobranca-cliente-final/{accountId}/reemissao-pix-cobranca",
    description:
      "Reemite o PDF de cobranças PIX existentes, gerando novos documentos para download.",
    category: "Pagamentos",
    parameters: [
      {
        name: "Authorization",
        type: "string",
        required: true,
        description: "Bearer token (Access Token PDV)",
      },
      {
        name: "accountId",
        type: "string",
        required: true,
        description: "Identificador único da conta do beneficiário.",
      },
    ],
    requestBody: {
      contentType: "application/json",
      fields: [
        {
          name: "movimentacaoIds",
          type: "array",
          required: true,
          description: "Lista de IDs das movimentações para reemissão do PDF.",
        },
      ],
      example: JSON.stringify(
        {
          movimentacaoIds: [1949],
        },
        null,
        2
      ),
    },
    responses: [
      {
        status: 200,
        description: "PDFs reemitidos com sucesso",
        example: JSON.stringify(
          {
            data: {
              documentos: [
                {
                  movimentacaoId: 1949,
                  link: "http://api/api/v2/movimentacao/download/inv_example.pdf",
                },
              ],
            },
          },
          null,
          2
        ),
      },
    ],
  },
];
