export interface Transaction {
  id: number;
  amount: number,
  description: string;
  transactionType: string;
  dateCreated: Date;
}
