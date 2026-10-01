import frappe
from frappe import _
from datetime import timedelta
import calendar

@frappe.whitelist()
def create_return_delivery_note(customer, date, items, inspection_result, inspection_description):
    # Parse items
    items = frappe.parse_json(items)

    # Create a new Delivery Note (Return)
    dn = frappe.new_doc("Delivery Note")
    dn.customer = customer
    dn.posting_date = date
    dn.is_return = 1
    dn.remarks = f"Inspection Result: {inspection_result}\nDescription: {inspection_description}"

    # Add items to the child table
    for item in items:
        dn.append("items", {
            "item_code": item.get("item_code"),
            "qty": item.get("qty"),
        })

    # Save and submit the Delivery Note
    dn.insert()
    dn.submit()

    return dn.name
