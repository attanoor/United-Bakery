import random
import frappe

@frappe.whitelist()
def generate_barcode():
    # Fetch all existing barcodes
    existing_barcodes = frappe.db.sql_list("SELECT barcode_field FROM tabItem WHERE barcode_field IS NOT NULL")
    
    # Generate a unique 4-digit barcode
    while True:
        barcode = str(random.randint(1000, 9999))
        if barcode not in existing_barcodes:
            return barcode
