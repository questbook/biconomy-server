/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/check": {
    post: operations["check"];
  };
}

export interface components {
  schemas: {
    Error: {
      statusCode: number;
      /** @description Specific description of the error */
      error: string;
      /** @description What the error was */
      message: string;
      /** @description Some extra information about the error */
      data?: { [key: string]: unknown };
    };
    transaction: {
      v: string;
      r: string;
      s: string;
      transactionHash: string;
    };
    data: {
      oauthToken: string;
      provider: string;
    };
    TransactionRequest: {
      transaction: components["schemas"]["transaction"];
      data: components["schemas"]["data"];
    };
  };
  responses: {
    /** Subsidize gas for user */
    TransactionResponse: {
      content: {
        "application/json": {
          /**
           * @description Whether to subsidize the gas for the user or not ("OK", "NO")
           * @example OK
           */
          answer: string;
        };
      };
    };
    /** Generic error response */
    ErrorResponse: {
      content: {
        "application/json": components["schemas"]["Error"];
      };
    };
  };
}

export interface operations {
  check: {
    responses: {
      200: components["responses"]["TransactionResponse"];
      400: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["TransactionRequest"];
      };
    };
  };
}

export interface external {}
