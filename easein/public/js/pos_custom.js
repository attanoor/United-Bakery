// frappe.provide("erpnext.PointOfSale");

// frappe.pages["point-of-sale"].on_page_load = function (wrapper) {
// 	frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: __("Point of Sale"),
// 		single_column: true,
// 	});

// 	frappe.require("point-of-sale.bundle.js", function () {
// 		wrapper.pos = new erpnext.PointOfSale.Controller(wrapper);
// 		window.cur_pos = wrapper.pos;
// 	});
//     page.add_menu_item(__('Return'), function() {
//         frappe.msgprint(__('Return button clicked!'));
//     });
// };

// frappe.pages["point-of-sale"].refresh = function (wrapper) {
// 	if (document.scannerDetectionData) {
// 		onScan.detachFrom(document);
// 		wrapper.pos.wrapper.html("");
// 		wrapper.pos.check_opening_entry();
// 	}
// };

frappe.provide("erpnext.PointOfSale");

frappe.pages["point-of-sale"].on_page_load = function (wrapper) {
    // Initialize the page with a title
    const page = frappe.ui.make_app_page({
        parent: wrapper,
        title: __("Point of Sale"),
        single_column: true,
    });

    // Load the Point of Sale Controller
    frappe.require("point-of-sale.bundle.js", function () {
        wrapper.pos = new erpnext.PointOfSale.Controller(wrapper);
        window.cur_pos = wrapper.pos;

        // Add the custom "Create Return" button to the toolbar
        wrapper.page.set_primary_action(__('Create Return'), function () {
            // Show the custom form when the button is clicked
            frappe.prompt(
                [
                    {
                        fieldname: "customer",
                        label: "Customer",
                        fieldtype: "Link",
                        options: "Customer",
                        reqd: 1,
                    },
                    {
                        fieldname: "date",
                        label: "Date",
                        fieldtype: "Date",
                        reqd: 1,
                        default: frappe.datetime.now_date(),
                    },
                    {
                        fieldname: "items",
                        label: "Items",
                        fieldtype: "Table",
                        options: "Return Items",
                        fields: [
                            {
                                fieldname: "item_code",
                                label: "Item",
                                fieldtype: "Link",
                                options: "Item",
                                in_list_view: 1,
                                reqd: 1,
                            },
                            {
                                fieldname: "qty",
                                label: "Qty",
                                fieldtype: "Float",
                                in_list_view: 1,
                                reqd: 1,
                            },
                        ],
                    },
                    // {
                    //     fieldname: "inspection_result",
                    //     label: "Inspection Result",
                    //     fieldtype: "Select",
                    //     options: ["Damaged", "Returned"].join("\n"),
                    //     reqd: 1,
                    // },
                    // {
                    //     fieldname: "inspection_description",
                    //     label: "Inspection Description",
                    //     fieldtype: "Small Text",
                    // },
                ],
                function (values) {
                    // Handle form submission
                    frappe.msgprint({
                        title: __("Form Submitted"),
                        indicator: "green",
                        message: __(
                            `Customer: ${values.customer}<br>
                             Date: ${values.date}<br>
                             Items: ${JSON.stringify(values.items)}<br>
                             Inspection Result: ${values.inspection_result}<br>
                             Description: ${values.inspection_description}`
                        ),
                    });

                    // Add your server-side logic here (e.g., create a return entry)
                },
                __("Return Details"),
                __("Submit")
            );
        });
    });
};

frappe.pages["point-of-sale"].refresh = function (wrapper) {
    // Refresh logic for Point of Sale
    if (document.scannerDetectionData) {
        onScan.detachFrom(document); // Detach scanner event handlers
        wrapper.pos.wrapper.html(""); // Clear existing POS content
        wrapper.pos.check_opening_entry(); // Check opening entry
    }
};


// frappe.provide("erpnext.PointOfSale");

// frappe.pages["point-of-sale"].on_page_load = function (wrapper) {
//     // Initialize the page with a title
//     const page = frappe.ui.make_app_page({
//         parent: wrapper,
//         title: __("Point of Sale"),
//         single_column: true,
//     });

//     // Load the Point of Sale Controller
//     frappe.require("point-of-sale.bundle.js", function () {
//         wrapper.pos = new erpnext.PointOfSale.Controller(wrapper);
//         window.cur_pos = wrapper.pos;

//         // Add the custom "Create Return" button to the toolbar
//         wrapper.page.set_primary_action(__('Create Return'), function () {
//             // Show the custom form when the button is clicked
//             frappe.prompt(
//                 [
//                     {
//                         fieldname: "customer",
//                         label: "Customer",
//                         fieldtype: "Link",
//                         options: "Customer",
//                         reqd: 1,
//                     },
//                     {
//                         fieldname: "date",
//                         label: "Date",
//                         fieldtype: "Date",
//                         reqd: 1,
//                         default: frappe.datetime.now_date(),
//                     },
//                     {
//                         fieldname: "items",
//                         label: "Items",
//                         fieldtype: "Table",
//                         options: "Return Items",
//                         fields: [
//                             {
//                                 fieldname: "item_code",
//                                 label: "Item",
//                                 fieldtype: "Link",
//                                 options: "Item",
//                                 in_list_view: 1,
//                                 reqd: 1,
//                             },
//                             {
//                                 fieldname: "qty",
//                                 label: "Qty",
//                                 fieldtype: "Float",
//                                 in_list_view: 1,
//                                 reqd: 1,
//                             },
//                         ],
//                     },
//                     {
//                         fieldname: "inspection_result",
//                         label: "Inspection Result",
//                         fieldtype: "Select",
//                         options: ["Damaged", "Returned"].join("\n"),
//                         reqd: 1,
//                     },
//                     {
//                         fieldname: "inspection_description",
//                         label: "Inspection Description",
//                         fieldtype: "Small Text",
//                     },
//                 ],
//                 function (values) {
//                     // Call server-side API to create a Return Delivery Note
//                     frappe.call({
//                         method: "nimramadni.dn_edit.create_return_delivery_note",
//                         args: {
//                             customer: values.customer,
//                             date: values.date,
//                             items: values.items,
//                             inspection_result: values.inspection_result,
//                             inspection_description: values.inspection_description,
//                         },
//                         callback: function (r) {
//                             if (!r.exc) {
//                                 frappe.msgprint({
//                                     title: __("Success"),
//                                     indicator: "green",
//                                     message: __("Return Delivery Note created successfully."),
//                                 });
//                             }
//                         },
//                     });
//                 },
//                 __("Return Details"),
//                 __("Submit")
//             );
//         });
//     });
// };

// frappe.pages["point-of-sale"].refresh = function (wrapper) {
//     // Refresh logic for Point of Sale
//     if (document.scannerDetectionData) {
//         onScan.detachFrom(document); // Detach scanner event handlers
//         wrapper.pos.wrapper.html(""); // Clear existing POS content
//         wrapper.pos.check_opening_entry(); // Check opening entry
//     }
// };



// frappe.pages['point-of-sale'].on_page_load = function(wrapper) {
//     const page = frappe.ui.make_app_page({
//         parent: wrapper,
//         title: 'Point of Sale',
//         single_column: true,
//     });

//     // Add a "Return" button
//     page.add_menu_item(__('Return'), function() {
//         frappe.msgprint(__('Return button clicked!'));
//     });
// };
