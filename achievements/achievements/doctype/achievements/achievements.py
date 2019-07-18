# -*- coding: utf-8 -*-
# Copyright (c) 2019, Masdar and contributors
# For license information, please see license.txt
from __future__ import unicode_literals

from frappe.website.website_generator import WebsiteGenerator
import frappe
from frappe.model.document import Document
from frappe import _


class Achievements(WebsiteGenerator):
    def validate(self):
        if not self.route:
            self.route = "achievement/" + self.title

    def get_context(self, context):
        context.no_cache = 1
        context.title = self.title

        context.ach = self

    website = frappe._dict(
        template="templates/generators/achievement.html",
        page_title_field="title",
    )
