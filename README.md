## Achievements Management System

Achievements Management System for Frappe framework & ERPNext.

### Features

- Add & Manage Achievements.
- Two Roles for permissions management. (Achievements User & Achievements Manager)
- Users can read and manage their own achievements only.
- Managers can read and manage everyone's achievements.
- System closes on Thursdays and reopens on Sundays (can be changed).
- Email notifications to remind employees before the system closes.

### Installation
  1- You need to install <a href="https://github.com/frappe/erpnext">Frappe & ERPNext</a> first.<br>
  2- Enter the frappe-bench directory `cd frappe-bench`<br>
  3- Fetch the app's git repo and install it:<br>
    `bench get-app achievements https://github.com/Abdullah395/achievements`<br>
  4- Now install the app to your site:<br>
    `bench --site site1.local install-app achievements`<br>
    (you have to specify your site name by default "site1.local")<br>
  5- Give `Achievements User` for normal employees and `Achievements Manager` for managers.
  
#### Customization
  To change the closing & openning time:<br>
  1- Edit this file `achievements/hooks.py`<br>
  2- Scroll down to `scheduler_events` array.<br>
  3- Under `cron` object change the array keys string to your preference
    (Use <a href="https://crontab.guru/">crontab.guru</a> for reference)
  
#### License

MIT
