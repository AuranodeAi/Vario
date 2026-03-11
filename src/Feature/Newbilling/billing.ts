import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-billing',
  imports: [FormsModule, CommonModule, DialogModule,InputNumberModule,ButtonModule,InputTextModule],
  templateUrl: './billing.html',
  styleUrl: './billing.css',
})


export class Billing implements OnInit {
billinginfo : any  = {};

constructor(){
   //this.billinginfo.invoiceNo = 1;
}

  ngOnInit(){
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
    this.billinginfo.buyerName = 'PAL AGENCY';
    this.billinginfo.buyerAddress = 'NH-6 ZORA';
    this.billinginfo.buyerPhone = '9406200455';
    this.billinginfo.buyerState = 'Chhattisgarh, Code : 22';
    this.billinginfo.consigneeName = 'PAL AGENCY';
    this.billinginfo.consigneeAddress = 'NH-6 ZORA';
    this.billinginfo.consigneePhone = '9406200455';
    this.billinginfo.consigneeState = 'Chhattisgarh, Code : 22';
  }

  // Add these to your class variables
displayItemModal: boolean = false;
invoiceItems: any[] = []; // Array to store the items added via modal

// Temporary object for the modal form
newItem = {
  description: '',
  hsn: '',
  quantity: 1,
  unit: 'Box.',
  rate: 0,
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

// // Add item to the list
// addItem() {
//   if (this.newItem.description) {
//     this.invoiceItems.push({ ...this.newItem });
//     // Reset for next entry
//     this.newItem = { description: '', hsn: '', quantity: 1, unit: 'Box.', rate: 0, discount: 0, total: 0 };
//     this.displayItemModal = false;
//   }
// }


  invoiceDate = new Date();

  customer:any = {
    name:'',
    mobile:'',
    address:''
  };

  items:any[] = [];

  subtotal = 0;
  cgst = 0;
  sgst = 0;
  grandTotal = 0;

  addItem(){
    this.items.push({
      description:'',
      hsn:'',
      qty:1,
      rate:0,
      discount:0,
      total:0
    });
  }

  removeItem(index:number){
    this.items.splice(index,1);
    this.calculateTotals();
  }

  calculateItem(i:number){

    let item = this.items[i];

    let amount = item.qty * item.rate;

    let discount = amount * (item.discount/100);

    item.total = amount - discount;

    this.calculateTotals();
  }

  calculateTotals(){

    this.subtotal = this.items.reduce((sum,item)=> sum + item.total,0);

    this.cgst = this.subtotal * 0.09;

    this.sgst = this.subtotal * 0.09;

    this.grandTotal = this.subtotal + this.cgst + this.sgst;

  }

  printInvoice(){
    window.print();
  }

}
