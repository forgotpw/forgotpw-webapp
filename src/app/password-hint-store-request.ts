export class PasswordHintStoreRequest {
    constructor(
        public application: string,
        public phoneNumber: string,
        public hint: string
      ) {  }
}
