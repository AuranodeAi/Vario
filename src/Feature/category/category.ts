import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, ButtonModule,
    InputTextModule, FloatLabelModule, TableModule,
    DialogModule, InputNumberModule, CardModule
  ],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit {
  billingForm: FormGroup;
  billingData: any[] = [];
  successMessage: string = '';
  nextInvoiceNo: string = 'INV001';
  
  // Storage Key
  private readonly STORAGE_KEY = 'local_invoices';

  constructor(private fb: FormBuilder) {
    this.billingForm = this.fb.group({
      invoiceNo: ['INV001', [Validators.required, Validators.pattern(/^[A-Z0-9]*$/)]],
      invoiceDate: ['', Validators.required],
      customerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-.,:]*$/)]],
      deliveryNote: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-.,:]*$/)]],
      termsOfPayment: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-.,:]*$/)]],
      referenceNo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-.,:]*$/)]],
      otherReferences: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-.,:]*$/)]],
      buyerOrderNo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-.,:]*$/)]],
      buyerDated: ['', Validators.required],
      dispatchDocNo: ['', Validators.required],
      deliveryNoteDate: ['', Validators.required],
      dispatchedThrough: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-.,:]*$/)]],
      destination: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-.,:]*$/)]],
      termsOfDelivery: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-.,:]*$/)]],
      buyerName: ['PAL AGENCY', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-.,:]*$/)]],
      buyerAddress: ['NH-6 ZORA', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-.,:]*$/)]],
      buyerPhone: ['9406200455', [Validators.required, Validators.pattern(/^[0-9\s\-\+]*$/)]],
      buyerState: ['Chhattisgarh, Code : 22', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-.,:]*$/)]],
      consigneeName: ['PAL AGENCY', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-.,:]*$/)]],
      consigneeAddress: ['NH-6 ZORA', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-.,:]*$/)]],
      consigneePhone: ['9406200455', [Validators.required, Validators.pattern(/^[0-9\s\-\+]*$/)]],
      consigneeState: ['Chhattisgarh, Code : 22', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s\-.,:]*$/)]]
    });

    this.setDefaultDates();
  }

  ngOnInit(): void {
    this.loadBillingData();
  }

  private setDefaultDates() {
    const today = new Date().toISOString().split('T')[0];
    this.billingForm.patchValue({
      invoiceDate: today,
      buyerDated: today,
      dispatchDocNo: today,
      deliveryNoteDate: today
    });
  }

  // REPLACED SUPABASE SELECT
  loadBillingData() {
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    if (savedData) {
      this.billingData = JSON.parse(savedData);
    } else {
      this.billingData = [];
    }
    this.generateNextInvoiceNo();
  }

  generateNextInvoiceNo() {
    if (this.billingData.length > 0) {
      // Get the last item in the array
      const lastInvoice = this.billingData[this.billingData.length - 1].invoiceNo;
      const num = parseInt(lastInvoice.replace('INV', '')) + 1;
      this.nextInvoiceNo = 'INV' + num.toString().padStart(3, '0');
    } else {
      this.nextInvoiceNo = 'INV001';
    }
    this.billingForm.patchValue({ invoiceNo: this.nextInvoiceNo });
  }

  // REPLACED SUPABASE INSERT
  saveBilling() {
    if (this.billingForm.valid) {
      const formValue = this.billingForm.value;

      try {
        // 1. Add new record to local array
        this.billingData.push(formValue);

        // 2. Save entire array to LocalStorage
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.billingData));

        // 3. UI Updates
        this.successMessage = 'Billing information saved to local storage!';
        this.billingForm.reset();
        this.setDefaultDates(); // Reset dates back to today
        this.generateNextInvoiceNo();
        
        setTimeout(() => this.successMessage = '', 3000);
      } catch (e) {
        console.error('LocalStorage Error:', e);
        this.successMessage = 'Error: Local storage is full or disabled.';
      }
    } else {
      this.successMessage = 'Please fill all fields correctly.';
    }
  }
}