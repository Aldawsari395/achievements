from __future__ import unicode_literals
import frappe


def add_role():
    print("adding role")
    
    users = frappe.db.get_list('User')

    for user in users:
        user_doc = frappe.get_doc('User', user.get("name"))
        for user_role in user_doc.roles:
            if user_role.role == "Employee":
                user_doc.append('roles',{
                    "doctype": "Has Role",
                    "role":"Achievements User"
                })
                user_doc.save()

    
def remove_role():
    print("removing role")
    
    users = frappe.db.get_list('User')

    for user in users:
        user_doc = frappe.get_doc('User', user.get("name"))
        for user_role in user_doc.roles:
            if user_role.role == "Achievements User":
                user_doc.roles.remove(user_role)
                user_doc.save()
                 