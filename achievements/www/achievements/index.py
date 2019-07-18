from __future__ import unicode_literals
import frappe
import json


def get_context(context):
    context.achs = frappe.db.get_list("Achievements",
                                      fields=["name", "title", "ach_type", "date", "goal",
                                              "initiative", "project", "method", "targets", "results"]
                                      )
    return context


@frappe.whitelist(allow_guest=True)
def delete_achs(data):
    data = json.loads(data)
    for ach in data:
        frappe.delete_doc("Achievements", ach)


@frappe.whitelist(allow_guest=True)
def delete_ach(ach_id):
    return frappe.delete_doc('Achievements', ach_id)


@frappe.whitelist(allow_guest=True)
def get_achs():
    return frappe.db.get_list("Achievements",
                              fields=["name", "title", "ach_type", "date", "goal",
                                              "initiative", "project", "method", "targets", "results"]
                              )
