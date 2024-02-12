export interface NotificationService<TIn = string> {
  sendWelcomeMessage(account: TIn): void;
}

export class NotificationServiceClass implements NotificationService {
  sendWelcomeMessage(account: string) {
    console.log(account);
    
  }
}
