export class SecretStoreRequest {
    constructor(
        public application: string,
        public secret: string,
        public phone: string
      ) {  }
}

export class SecretStoreAridRequest {
  constructor(
      public secret: string
    ) {  }
}
