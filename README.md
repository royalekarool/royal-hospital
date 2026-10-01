# Royal Hospital: website + admin panel

```
royal-hospital/
  admin/     the admin panel (Sanity Studio). Staff add doctors and timings here.
  website/   the public website (Next.js). Reads everything from the admin panel.
```

The logo is already inside both folders:
- `website/public/logo.png` (header, footer) and `website/app/icon.png` (browser tab icon)
- `website/public/logo-full-white.png` (full logo with white lettering, for dark backgrounds)
- `admin/static/logo.png` (shown in the admin panel)

## What staff can edit in the admin panel

| Menu | What it controls |
|---|---|
| Doctors | name, role, department, photo, order |
| Departments and timings | days and time slots. This is the "Department consultation timings" box on the home page, and the timings on the Doctors page |
| Site settings | home page heading and text, departments and services, phone numbers, WhatsApp, address, map link, live Google Map, about text and photo, entrance photo, footer |

Changes show on the website in about 30 seconds after you press **Publish**.

---

## Run on localhost first

You need Node.js 20 or newer.

### Step 1. Make a free Sanity project (one time)
1. Go to https://www.sanity.io/manage and sign in.
2. Click **Create new project**, name it "Royal Hospital", dataset name `production`.
3. Copy the **Project ID**.

### Step 2. Start the admin panel
```
cd admin
copy .env.example .env        (Mac/Linux: cp .env.example .env)
```
Open `.env` and paste your Project ID. Then:
```
npm install
npm run dev
```
Open http://localhost:3333 and log in.

Optional, to fill in sample data (one doctor, Orthopaedics timings):
```
npx sanity login
npm run import-sample
```

### Step 3. Start the website
Open a second terminal:
```
cd website
copy .env.example .env.local   (Mac/Linux: cp .env.example .env.local)
```
Open `.env.local` and paste the same Project ID. Then:
```
npm install
npm run dev
```
Open http://localhost:3000.

Test it: in the admin panel add a doctor or change a timing, press **Publish**, wait about 30 seconds, then refresh the website.

(If you skip the Project ID in `website/.env.local`, the website shows sample content. This is only for checking the design.)

---

## Push live (after localhost works)

1. Put the whole `royal-hospital` folder on GitHub (one repository).
2. **Website on Vercel:** New Project, pick the repository, set **Root Directory** to `website`, and add these two environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = your Project ID
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
3. **Admin panel online:** inside the `admin` folder run `npm run deploy`. Choose a name, and you get a link like `royalhospital.sanity.studio`. Staff open that link to edit.
4. Invite staff: in https://www.sanity.io/manage open the project, then **Members**, then invite by email.

## Terms & Conditions and Privacy Policy

- Pages: `/terms-and-conditions` and `/privacy-policy`. They are linked only in the website footer.
- The text lives in two simple files: `website/content/terms-and-conditions.md` and `website/content/privacy-policy.md`.
- To change the text, edit those files, then push to GitHub. Vercel updates the site. (These two pages are not in the admin panel.)
- Format inside the files: `## ` for a heading, `- ` for a bullet, `*word*` for italic, two spaces at the end of a line for a line break.

## Good to know
- Doctors use the timings of their department. To change a doctor's timings, edit the department.
- A department with no timings shows "Timings on request. Call to confirm."
- Booking sends a WhatsApp message to the number in Site settings (digits only, with country code, example `919526646501`).


- Live map: in Site settings, Contact tab, paste the Google Maps embed code (Share, Embed a map, Copy HTML) into **Google Map**. It replaces the entrance photo on the website. After changing the admin panel files, run `npm run deploy` inside `admin` again.
