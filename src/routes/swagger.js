import swaggerUi from "swagger-ui-express";
import { Router } from "express";

const router = Router()

const swaggerDocument = {
  swagger: "2.0",
  info: {
    title: "Authentication API",
    description: "",
    version: "1.0"
  },
  produces: ["application/json"],
  paths: {
    "/signup": {
      post: {
        "x-swagger-router-controller": "home",
        operationId: "signup",
        tags: ["Auth"],
        description: "Sign Up",
        parameters: [
          {
            name: "body",
            in: "body",
            description: "Create a new account",
            required: true,
            schema: {
              $ref: "#/definitions/Credential"
            }
          }
        ],
        responses: {
          200: {
            description: "OK",
            schema: {
              $ref: "#/definitions/User"
            }
          }
        }
      }
    },
    "/signin": {
      post: {
        "x-swagger-router-controller": "home",
        operationId: "signin",
        tags: ["Auth"],
        description: "",
        parameters: [
          {
            name: "body",
            in: "body",
            description: "Login to your account",
            required: true,
            schema: {
              $ref: "#/definitions/Credential"
            }
          }
        ],
        responses: {
          200: {
            description: "OK",
            schema: {
              $ref: "#/definitions/User"
            }
          }
        }
      }
    },
    "/verify": {
      post: {
        security: [{ BearerAuth: [] }],
        "x-swagger-router-controller": "home",
        operationId: "verify",
        tags: ["Auth"],
        description: "",
        parameters: [
          {
            name: "redirect",
            in: "query",
            description: "Redirect after verification",
            required: false,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          200: {
            description: "OK",
            schema: {
              $ref: "#/definitions/User"
            }
          }
        }
      },
      // get: {
      //   "x-swagger-router-controller": "home",
      //   operationId: "verification-status",
      //   tags: ["Auth"],
      //   description: "Verify your account by visiting the link in the email sent to you",
      //   parameters: [
      //     {
      //       name: "token",
      //       in: "query",
      //       description: "",
      //       required: true,
      //       schema: {
      //         type: "string",
      //       }
      //     },
      //     {
      //       name: "redirect",
      //       in: "query",
      //       description: "Redirect after verification",
      //       required: false,
      //       schema: {
      //         type: "string",
      //       }
      //     }
      //   ],
      //   responses: {
      //     200: {
      //       description: "OK",
      //     }
      //   }
      // }
    },
    "/token": {
      post: {
        "x-swagger-router-controller": "home",
        operationId: "token",
        tags: ["Auth"],
        description: "Generate new access token by refresh token",
        parameters: [
          {
            name: "body",
            in: "body",
            description: "",
            required: true,
            schema: {
              $ref: "#/definitions/refreshToken"
            }
          }
        ],
        responses: {
          200: {
            description: "OK",
            schema: {
              $ref: "#/definitions/accessToken"
            }
          }
        }
      }
    },
    "/signout": {
      get: {
        security: [{ BearerAuth: [] }],
        "x-swagger-router-controller": "home",
        operationId: "signout",
        tags: ["Auth"],
        description: "Sign Out",
        responses: {
          200: {
            description: "OK",
          }
        }
      }
    },
    "/forgot": {
      post: {
        "x-swagger-router-controller": "home",
        operationId: "forgot",
        tags: ["Auth"],
        description: "Get password reset link by email",
        parameters: [
          {
            name: "redirect",
            in: "query",
            description: "",
            required: false
          },
          {
            name: "body",
            in: "body",
            description: "Get",
            required: true,
            schema: {
              $ref: "#/definitions/Email"
            }
          },
        ],
        responses: {
          200: {
            description: "OK",
          }
        }
      }
    },
    "/reset": {
      // get: {
      //   "x-swagger-router-controller": "visit-reset-link",
      //   operationId: "reset",
      //   tags: ["Auth"],
      //   description: "Set new password by visiting the link in the email sent to you",
      //   parameters: [
      //     {
      //       name: "token",
      //       in: "query",
      //       description: "Reset token for 15 minutes",
      //       required: true,
      //     },
      //   ],
      //   responses: {
      //     200: {
      //       description: "OK",
      //     }
      //   }
      // },
      post: {
        security: [{ BearerAuth: [] }],
        "x-swagger-router-controller": "get-reset-link",
        operationId: "get-reset-link",
        tags: ["Auth"],
        description: "Set new password by visiting the link in the email sent to you",
        parameters: [
          {
            name: "body",
            in: "body",
            description: "Sent mew password in request body",
            required: true,
            schema: {
              $ref: "#/definitions/Password"
            }
          },
          {
            name: "token",
            in: "body",
            description: "Sent reset token in query parameter. The /forgot will generate the link include reset token.",
            required: true
          }
        ],
        responses: {
          200: {
            description: "OK",
          }
        }
      }
    },
    "/validate-token": {
      get: {
        security: [{ BearerAuth: [] }],
        "x-swagger-router-controller": "home",
        operationId: "validate-token",
        tags: ["Auth"],
        description: "Validate access token",
        responses: {
          200: {
            description: "OK",
          }
        }
      }
    }
  },
  definitions: {
    Credential: {
      type: "object",
      properties: {
        email: {
          type: "string",
          example: ""
        },
        password: {
          type: "string",
          example: "santo@1234"
        }
      },
      required: ["email", "password"]
    },
    User: {
      type: "object",
      properties: {
        email: {
          type: "string",
          example: ""
        },
        verified: {
          type: "boolean",
          example: false
        },
        accessToken: {
          type: "string",
        },
        refreshToken: {
          type: "string",
        },
        id: {
          type: "string",
        },
        createdAt: {
          type: "string",
        },
        updatedAt: {
          type: "string",
        },
        v: {
          type: "number",
          example: 0
        }
      },
    },
    accessToken: {
      type: 'object',
      properties: {
        accessToken: {
          type: "string",
        }
      },
      required: ["accessToken"]
    },
    refreshToken: {
      type: 'object',
      properties: {
        refreshToken: {
          type: "string",
        }
      },
      required: ["refreshToken"]
    },
    Email: {
      type: "object",
      properties: {
        email: {
          type: "string",
          example: ""
        }
      },
      required: ["email"]
    },
    Password: {
      type: "object",
      properties: {
        password: {
          type: "string",
          example: "santo@1234"
        }
      },
      required: ["email"]
    },
  },
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
      scheme: "Bearer",
      bearerFormat: "JWT"
    }
  }
};

router.use('/docs', swaggerUi.serve)
router.get('/docs', swaggerUi.setup(swaggerDocument));

export { router };