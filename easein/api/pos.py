import frappe
from erpnext.selling.page.point_of_sale.point_of_sale import get_items as erpnext_get_items


@frappe.whitelist()
def get_items(start=0, page_length=40, price_list=None, item_group=None, pos_profile=None, search_term=""):
    # Fallback root item group if frontend does not send one
    if not item_group:
        item_group = (
            frappe.db.get_value(
                "Item Group",
                {"is_group": 1, "parent_item_group": ["in", ("", None)]},
                "name",
            )
            or "All Item Groups"
        )

    return erpnext_get_items(
        start=start,
        page_length=page_length,
        price_list=price_list,
        item_group=item_group,
        pos_profile=pos_profile,
        search_term=search_term,
    )
