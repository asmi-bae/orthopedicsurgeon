export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED'
}

export enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  BKASH = 'BKASH',
  NAGAD = 'NAGAD'
}

export interface Invoice {
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  address: string;
  items: InvoiceItem[];
  subTotal: number;
  tax: number;
  discount: number;
  total: number;
  issuedAt: string;
}

export interface InvoiceItem {
  description: string;
  amount: number;
}

export interface Payment {
  id: string;
  invoiceNumber: string;
  appointmentId: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId?: string;
  paidAt?: string;
  createdAt: string;
}

export interface PaymentSummary {
  invoiceNumber: string;
  patientName: string;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
}

export interface FinancialReport {
  totalRevenue: number;
  pendingAmount: number;
  paidCount: number;
  refundedAmount: number;
}
