export class SecretStoreRequest {
    constructor(
        public application: string,
        public secret: string,
        public phone: string
      ) {  }
}
