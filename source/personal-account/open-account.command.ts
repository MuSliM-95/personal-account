
export class OpenAccountCommand {
  public email: string;
  public name: string;

  constructor() {
    (this.email = ""), (this.name = "");
  }
}
