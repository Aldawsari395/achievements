from __future__ import unicode_literals
import frappe
import json
from datetime import datetime


def get_context(context):
    context.projects = frappe.db.get_list("Achievement Project")

    doc_id = frappe.request.args.get("name")

    if doc_id:
        context.ach = frappe.get_doc("Achievements", doc_id)

    return context


@frappe.whitelist(allow_guest=True)
def get_project_list():
    return frappe.db.get_list("Achievement Project")


@frappe.whitelist(allow_guest=True)
def save_ach(data):
    data = json.loads(data)
    project = None

    # Get linked project or create new one if not exists.
    if frappe.db.exists("Achievement Project", data['project']):
        project = frappe.get_doc("Achievement Project", data["project"])
    else:
        project = frappe.get_doc({
            'doctype': 'Achievement Project',
            'title': data["project"]
        })
        project.insert()

    # format date
    formated_date = data["year"] + "-" + data["month"] + "-" + data["day"]

    # Insert new achievement
    ach_doc = frappe.get_doc({
        "doctype": "Achievements",
        "title": data["ach-name"],
        "ach_type": data["ach-type"],
        "date": formated_date,
        "goal": data["goal"],
        "initiative": data["initiative"],
        "project": data['project'],
        "method": data["method"],
        "targets": data["targets"],
        "results": data["results"]
    })

    ach_doc.insert()


@frappe.whitelist(allow_guest=True)
def delete_ach(ach_id):
    return frappe.delete_doc('Achievements', ach_id)


@frappe.whitelist(allow_guest=True)
def update_ach(data):
    data = json.loads(data)
    project = None

    if frappe.db.exists("Achievements", data['ach_id']):
        ach_doc = frappe.get_doc("Achievements", data['ach_id'])

        # Get linked project or create new one if not exists.
        if frappe.db.exists("Achievement Project", data['project']):
            project = frappe.get_doc("Achievement Project", data["project"])
        else:
            project = frappe.get_doc({
                'doctype': 'Achievement Project',
                'title': data["project"]
            })
            project.insert()

        # format date
        formated_date = data["year"] + "-" + data["month"] + "-" + data["day"]

        ach_doc.title = data["ach-name"]
        ach_doc.ach_type = data["ach-type"]
        ach_doc.date = formated_date
        ach_doc.goal = data["goal"]
        ach_doc.initiative = data["initiative"]
        ach_doc.project = data['project']
        ach_doc.method = data["method"]
        ach_doc.targets = data["targets"]
        ach_doc.results = data["results"]

        ach_doc.save()
