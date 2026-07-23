# Integration Configuration Guide

This guide explains how to update the website forms and calendar booking links to point to your new **Formspree** and **Cal.com** accounts.

---

## 1. Formspree Integration (Forms & Newsletter)

Formspree handles all form submissions (the main consultation form, the lead magnet checklist download, and the newsletter signup) and sends them to your email.

### Step 1: Create Forms in Formspree
1. Log into your new [Formspree](https://formspree.io) account.
2. Create **two separate forms**:
   * **Form 1: Contact/Checklist submissions** (e.g. named "Meridian Contact"). Copy the generated **Form ID** (an 8-character code, e.g. `xaqklvdz`).
   * **Form 2: Newsletter signups** (e.g. named "Meridian Newsletter"). Copy the generated **Form ID** (e.g. `xjgzlrbw`).

### Step 2: Update the Code
Open the files inside the `antigravityv2` folder and update the action URLs:

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

## 2. Cal.com Integration (Direct Booking Calendar)

Cal.com hosts your calendar booking pages and opens them as a modern dark-themed modal popup when users click "Schedule a Call" or "Book a call directly".

### Step 1: Obtain your new Cal.com link
1. Log into your new [Cal.com](https://cal.com) account.
2. Under **Event Types**, create or find your booking event (e.g., a "30-minute consultation" event named `discovery`).
3. Note your booking path: `https://cal.com/YOUR_USERNAME/YOUR_EVENT_SLUG` (for example: `https://cal.com/meridianpartners/discovery`).

### Step 2: Update the Code
Update the booking triggers and script loaders in the following files:

#### 1. Contact Page (`contact.html`)
* **HTML Trigger Link (Option B):** Around line 1827. Replace the `href` path:
  ```html
  <a href="https://cal.com/YOUR_USERNAME/YOUR_EVENT_SLUG" data-cal-trigger class="btn-primary ...">
  ```
* **JavaScript Loader (Bottom of file):** Around line 2337. Update the event target namespace initialization if you changed the event slug (keep as `"discovery"` if your event slug is still `discovery`):
  ```javascript
  Cal("init", "YOUR_EVENT_SLUG", {origin:"https://app.cal.com"});
  Cal.ns.YOUR_EVENT_SLUG("ui", { ... });
  ```

#### 2. Thank You Page (`thank-you.html`)
* **HTML Trigger Link 1 (Consultation Flow):** Around line 558. Replace the `href` path:
  ```html
  <a href="https://cal.com/YOUR_USERNAME/YOUR_EVENT_SLUG" data-cal-trigger class="btn btn-primary" target="_blank" rel="noopener">
  ```
* **HTML Trigger Link 2 (Checklist Flow):** Around line 604. Replace the `href` path:
  ```html
  <a href="https://cal.com/YOUR_USERNAME/YOUR_EVENT_SLUG" data-cal-trigger class="btn btn-primary" target="_blank" rel="noopener">
  ```
* **JavaScript Loader (Bottom of file):** Around line 757. Update the event target namespace initialization:
  ```javascript
  Cal("init", "YOUR_EVENT_SLUG", {origin:"https://app.cal.com"});
  Cal.ns.YOUR_EVENT_SLUG("ui", { ... });
  ```

---

## 3. Apply and Build
Once you have modified the files above, run the build compiler to compile the changes:
```bash
python3 build.py
```
This updates the navigation and script blocks across all output pages.
