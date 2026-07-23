# Integration Configuration Guide

This guide explains how to update the website forms and calendar booking links to point to your **Formspree** account and **Google Calendar appointment schedule**.

---

## 1. Formspree Integration (Forms & Newsletter)

Formspree handles all form submissions (the main consultation form, the lead magnet checklist download, and the newsletter signup) and sends them to your email.

### Step 1: Create Forms in Formspree
1. Log into your new [Formspree](https://formspree.io) account.
2. Create **two separate forms**:
   * **Form 1: Contact/Checklist submissions** (e.g. named "Meridian Contact"). Copy the generated **Form ID** (an 8-character code, e.g. `xaqklvdz`).
   * **Form 2: Newsletter signups** (e.g. named "Meridian Newsletter"). Copy the generated **Form ID** (e.g. `xjgzlrbw`).

### Step 2: Update the Code
Open the files inside the `v11-anti` folder and update the action URLs:

#### 1. Main Consultation Form (`contact.html`)
* **Location:** Around line 1662
* **Action:** Replace `xaqklvdz` with your new **Contact Form ID**:
  ```html
  <form id="contactForm" class="space-y-5" action="https://formspree.io/f/YOUR_NEW_CONTACT_ID" method="POST">
  ```

#### 2. Lead Magnet Form (`readiness-checklist.html`)
* **Location:** Around line 412
* **Action:** Replace `xaqklvdz` with your new **Contact Form ID**:
  ```html
  <form action="https://formspree.io/f/YOUR_NEW_CONTACT_ID" method="POST" id="checklistForm">
  ```

#### 3. Newsletter Form (`index.html`)
* **Location:** Around line 2349
* **Action:** Replace `xjgzlrbw` with your new **Newsletter Form ID**:
  ```html
  <form id="newsletterForm" class="flex flex-col sm:flex-row gap-3" action="https://formspree.io/f/YOUR_NEW_NEWSLETTER_ID" method="POST">
  ```

---

## 2. Google Calendar Integration (Direct Booking Calendar)

Google Calendar hosts the company-controlled appointment schedule used by the "Schedule a Call" and "Book a call directly" buttons.

### Step 1: Obtain your Google appointment schedule link
1. Log into Google Calendar with the company account that owns the schedule.
2. Open the appointment schedule (for example, "30 min with Meridian").
3. Copy the public booking page URL. The current production URL is:
   `https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2UnZ-AFabl3uIgiWsBQoE3ViM74LLD3bgUUxU5BQlkk770g8BQ3nlFLMHqPOnsCr6ZPi-yH1Rr`

### Step 2: Update the Code
Update the booking links in the following files:

#### 1. Contact Page (`contact.html`)
* **HTML booking link:** Around line 1827. Replace the `href` path:
  ```html
  <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/YOUR_SCHEDULE_ID" class="btn-primary ..." target="_blank" rel="noopener">
  ```

#### 2. Thank You Page (`thank-you.html`)
* **HTML booking link 1 (Consultation Flow):** Around line 558. Replace the `href` path:
  ```html
  <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/YOUR_SCHEDULE_ID" class="btn btn-primary" target="_blank" rel="noopener">
  ```
* **HTML booking link 2 (Checklist Flow):** Around line 604. Replace the `href` path:
  ```html
  <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/YOUR_SCHEDULE_ID" class="btn btn-primary" target="_blank" rel="noopener">
  ```

---

## 3. Apply and Build
Once you have modified the files above, run the build compiler to compile the changes:
```bash
python3 build.py
```
This updates the navigation and script blocks across all output pages.
