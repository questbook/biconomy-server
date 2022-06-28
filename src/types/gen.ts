/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/check": {
    post: operations["check"];
  };
  "/get_nonce": {
    get: operations["get_nonce"];
  };
  "/add_user": {
    post: operations["add_user"];
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
    Transaction: {
      v: number;
      r: string;
      s: string;
      transactionHash: string;
    };
    TransactionRequest: {
      data: {
        signedNonce: components["schemas"]["Transaction"];
        nonce: string;
      };
      webwallet_address: string;
    };
    AddUserRequest: {
      code: string;
      webwallet_address: string;
    };
    GetNonceRequest: {
      webwallet_address: string;
    };
  };
  responses: {
    /** Add user to database */
    AddUserResponse: {
      content: {
        "application/json": {
          authorize: string;
        };
      };
    };
    /** Get nonce for the user to sign */
    GetNonceRequest: {
      content: {
        "application/json": {
          authorize?: string;
        } & {
          nonce: unknown;
        };
      };
    };
    /** Subsidize gas for user */
    TransactionResponse: {
      content: {
        "application/json": {
          /**
           * @description Whether to subsidize the gas for the user or not ("SUBSIDIZE", "DONT SUBSIDIZE")
           * @example SUBSIDIZE
           */
          success: "SUBSIDIZE" | "DONT SUBSIDIZE";
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
  get_nonce: {
    responses: {
      200: components["responses"]["GetNonceResponse"];
      400: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["GetNonceRequest"];
      };
    };
  };
  add_user: {
    responses: {
      200: components["responses"]["AddUserResponse"];
      400: components["responses"]["ErrorResponse"];
      500: components["responses"]["ErrorResponse"];
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AddUserRequest"];
      };
    };
  };
}

export interface external {}
