import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-billing',
  imports: [FormsModule, CommonModule, DialogModule, InputNumberModule, ButtonModule, InputTextModule],
  templateUrl: './billing.html',
  styleUrl: './billing.css',
})


export class Billing implements OnInit {
  billinginfo: any = {};

  constructor() {
    //this.billinginfo.invoiceNo = 1;
  }

  ngOnInit() {
    this.billinginfo.invoiceNo = 'INV001';
    this.billinginfo.invoiceDate = new Date().toLocaleDateString();
    this.billinginfo.customerName = '';
    this.billinginfo.deliveryNote = '';
    this.billinginfo.termsOfPayment = '';
    this.billinginfo.referenceNoDate = '';
    this.billinginfo.otherReferences = '';
    this.billinginfo.buyerOrderNo = '';
    this.billinginfo.buyerDated = '';
    this.billinginfo.dispatchDocNo = '';
    this.billinginfo.deliveryNoteDate = '';
    this.billinginfo.dispatchedThrough = '';
    this.billinginfo.destination = '';
    this.billinginfo.termsOfDelivery = '';
    this.billinginfo.buyerName = '';
    this.billinginfo.buyerAddress = '';
    this.billinginfo.buyerPhone = '';
    this.billinginfo.buyerState = 'Chhattisgarh, Code : 22';
    this.billinginfo.consigneeName = '';
    this.billinginfo.consigneeAddress = '';
    this.billinginfo.consigneePhone = '';
    this.billinginfo.consigneeState = '';
    this.addItem();
  }

  // Add these to your class variables
  displayItemModal: boolean = false;
  invoiceItems: any[] = []; // Array to store the items added via modal
totalINWords:any;
  // Temporary object for the modal form
  newItem = {
    description: '',
    hsn: '',
    quantity: 1,
    unit: 'Box.',
    rate: 0,
    per:'BOX',
    discount: 0,
    total: 0
  };

  // Open the modal
  showPrintModal() {
    this.displayItemModal = true;
  }

  // Logic to calculate total inside the modal
  calculateItemTotal() {
    const baseAmount = this.newItem.quantity * this.newItem.rate;
    const discountAmount = (baseAmount * this.newItem.discount) / 100;
    this.newItem.total = baseAmount - discountAmount;
  }


  invoiceDate = new Date();

  customer: any = {
    name: '',
    mobile: '',
    address: ''
  };

  items: any[] = [];

  subtotal = 0;
  cgst = 0;
  sgst = 0;
  grandTotal = 0;

  addItem() {
    this.items.push({
      description: '',
      hsn: '',
      qty: 1,
      rate: null,
         per:'BOX',
      discount: null,
      total: 0
    });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.calculateTotals();
  }

  calculateItem(i: number) {

    let item = this.items[i];

    let amount = item.qty * item.rate;

    let discount = amount * (item.discount / 100);

    item.total = amount - discount;

    this.calculateTotals();
  }

  calculateTotals() {

    this.subtotal = this.items.reduce((sum, item) => sum + item.total, 0);

    this.cgst = this.subtotal * 0.09;

    this.sgst = this.subtotal * 0.09;

    this.grandTotal = this.subtotal + this.cgst + this.sgst;
    this.totalINWords = this.convertToWords(this.grandTotal);
  }

  convertToWords(num: number): string {
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const format = (n: number) => {
    if (n < 20) return a[n];
    let digit = n % 10;
    return b[Math.floor(n / 10)] + (digit ? '-' + a[digit] : '');
  };

  const convert = (n: number): string => {
    if (n === 0) return '';
    if (n < 100) return format(n);
    if (n < 1000) return a[Math.floor(n / 100)] + 'Hundred ' + convert(n % 100);
    if (n < 100000) return convert(Math.floor(n / 1000)) + 'Thousand ' + convert(n % 1000);
    if (n < 10000000) return convert(Math.floor(n / 100000)) + 'Lakh ' + convert(n % 100000);
    return convert(Math.floor(n / 10000000)) + 'Crore ' + convert(n % 10000000);
  };

  const wholePart = Math.floor(num);
  const decimalPart = Math.round((num - wholePart) * 100);

  let result = convert(wholePart) || 'Zero';
  if (decimalPart > 0) {
    result += 'and ' + convert(decimalPart) + 'Paise ';
  }
  return result.trim() + ' Only';
}

  printInvoice() {
    window.print();
  }

}
