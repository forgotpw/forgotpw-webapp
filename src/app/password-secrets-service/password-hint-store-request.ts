export class PasswordHintStoreRequest {
    constructor(
        public application: string,
        public phone: string,
        public hint: string
      ) {  }
}
