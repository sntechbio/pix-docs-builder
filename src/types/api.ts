export interface Endpoint {
  id: string;
  title: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  category: string;
  parameters?: Parameter[];
  requestBody?: RequestBodyExample;
  responses: Response[];
}

export interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface RequestBodyExample {
  contentType: string;
  example: string;
  fields: Field[];
}

export interface Field {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface Response {
  status: number;
  description: string;
  example: string;
}
