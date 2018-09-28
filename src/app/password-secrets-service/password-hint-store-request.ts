export class PasswordHintStoreRequest {
    constructor(
        public application: string,
        public hint: string,
        public phone: string,
        public confirmationCode: string,
      ) {  }
}
