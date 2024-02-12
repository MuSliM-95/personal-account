import { OpenAccountCommand } from "./open-account.command";
import { CloseAccountCommand } from "./close-account.command";
import { GetAccountsQuery } from "./get-accounts.query";
import { Account } from "./account";
import { AccountError } from "./account.error";
import { NotificationService, NotificationServiceClass } from "./notification.service";

export interface AccountManager {
  openAccount(command: OpenAccountCommand): Promise<Account>;
  closeAccount(command: CloseAccountCommand): Promise<Account>;
  getAccounts(query: GetAccountsQuery): Promise<Account[]>;
}

export class AccountManagerTest {
  private accounts: Account[] = [];
  private notificationService: NotificationService = new NotificationServiceClass();

  async openAccount(command: OpenAccountCommand): Promise<Account> {
    const account = new Account({
      id: `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 9)}`,
      email: command.email,
      name: command.name,
      number: Math.random().toString(36).substr(2, 9),
      status: "Open",
    });
    this.accounts.push(account);
  
    this.notificationService.sendWelcomeMessage('Ваш аккаунт создан')
    return account;
  }

  async closeAccount(command: CloseAccountCommand): Promise<Account> {
    const acc = new Account( {
      id: "123-456-789",
      email: "customer0919@domain.ru",
      name: "Пугачева Ольга Сергеевна",
      number: "1",
      status: "Open"
    })
    
    this.accounts.push(acc)
    const account = this.accounts.find((acc) => acc.id === command.id);

    if (!account || account.status === "Close") {
      throw new AccountError();
    }

    account.status = "Close";
    return account;
  }

  async getAccounts(query: GetAccountsQuery): Promise<Account[]> {
    return this.accounts;
  }
}
