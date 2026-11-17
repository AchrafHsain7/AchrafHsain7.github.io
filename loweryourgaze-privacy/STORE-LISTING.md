# LowerYourGaze 1.0.2 — Chrome Web Store submission

Everything to paste into the developer dashboard, in dashboard order.

## Before you start (account)

- **2-Step Verification** must be on for the Google account; publishing is blocked without it.
- **Account → Trader status.** For a free personal project you are most likely a **non-trader**; the choice is yours to make.
- **Account → Contact email.** Verify it. It is shown on the listing and is the contact the privacy policy points to.

## 1. Upload

**New item** → upload `LowerYourGaze-1.0.2-store.zip`.

- `manifest.json` sits at the zip root, there is no `key`, and only runtime files are included.
- The store gives the extension a new ID. Your current unpacked copy stays separate, with its own settings and learning memory.

## 2. Store listing tab

**Description**

```
﴿قُل لِّلْمُؤْمِنِينَ يَغُضُّوا مِنْ أَبْصَارِهِمْ وَيَحْفَظُوا فُرُوجَهُمْ ۚ ذَٰلِكَ أَزْكَىٰ لَهُمْ ۗ إِنَّ اللَّهَ خَبِيرٌ بِمَا يَصْنَعُونَ﴾
"Tell the believing men to lower their gaze and guard their chastity. That is purer for them. Allah is fully aware of what they do." — Surat An-Nur, 24:30

LowerYourGaze blurs pictures and videos of women before you see them, on every site you visit. It works on its own from the moment it is installed, learns from your choices, and runs entirely on your device.

WHAT IT DOES
• Blurs photos, drawings and other pictures of women on any website.
• Checks videos too, YouTube included. Choose Before (frames are checked before you see them) or After (the video plays at once and blurs as soon as something is found).
• Covers lingerie and immodest clothing straight away, with or without a person.

YOUR PANEL
Click the green eye in the toolbar:
• On or off for this site
• Strictness: Balanced for everyday browsing, Strict to cover more when the check is unsure
• Video check: Before or After
• Blur amount and grayscale
Advanced holds everything else (what gets checked, video tuning, speed), with a one-line explanation for each option, plus buttons to reset options or delete what it learned.

RIGHT-CLICK ANY PICTURE OR VIDEO
• Show: reveals a picture that was covered by mistake
• Cover: hides a picture that slipped through
• Check it again: forgets your choice and lets the extension decide
Shortcuts: Alt+Shift+V shows the main video, Alt+Shift+K covers it, Alt+Shift+L turns the site off or on.

IT LEARNS FROM YOUR CHOICES
Every Show and Cover teaches it, on every open tab, straight away. It compares what pictures show rather than their pixels, so a lesson from one picture carries over to others like it. Cover teaches strongly. Show teaches gently, and pictures that clearly show a woman stay covered.

PRIVATE BY DESIGN
• The models that look at pictures ship inside the extension and run in your browser.
• No accounts, analytics, tracking or reports. Nothing is sent to anyone, its makers included.
• It keeps only your options, what it learned from your choices and saved check results, as hashes and short numeric signatures, never as images or web addresses.
• Erase what it learned at any time: Panel → Advanced → Delete learning memory.

After installing, reload the tabs that were already open.
```

**Listing details**

- **Category:** Lifestyle → Well-being.
- **Language:** English.

**Graphic assets** (all files are in `listing/`)

| Field | File |
|---|---|
| Store icon (128×128) | comes from the package |
| Screenshots, 1280×800, in this order | `1-panel.png`, `2-learns.png`, `3-right-click.png`, `4-private.png`, `5-advanced.png` |
| Small promo tile (440×280) | `promo-small-440x280.png` |
| Marquee promo tile (1400×560, optional) | `promo-marquee-1400x560.png` |

**Additional fields**

- **Official URL:** leave empty.
- **Homepage URL:** the privacy-policy page, or leave empty.
- **Support URL:** leave empty; the contact email is shown instead.

## 3. Privacy practices tab

**Single purpose**

```
Blur pictures and videos of women on the web pages the user visits, using image models that run on the user's device.
```

**Permission justifications**

storage:
```
Saves the user's options (strictness, blur amount, video check and the Advanced settings), the sites where the user turned the extension off, and hashes of pictures the user chose to cover. Kept with chrome.storage.local on the device only.
```

unlimitedStorage:
```
The learning memory (up to 100,000 short numeric signatures of pictures the user chose to show or cover) and the cache of check results are kept in IndexedDB on the device and can exceed the default quota. Nothing is transmitted.
```

offscreen:
```
The image models (an object detector, a face model and CLIP, run with the bundled ONNX Runtime WebAssembly build) need a document with WebAssembly threads, which a service worker cannot provide. The offscreen document runs these models on the device and has no user interface.
```

contextMenus:
```
Adds the right-click items "Show this image/video", "Cover this image/video", "Check it again" and "Turn off / on for this site".
```

Host permissions (http://*/*, https://*/*):
```
The single purpose is to blur pictures of women on whatever site the user visits, so the content script must run on every page to find pictures and videos and cover them before they are seen. Host access also lets the extension read the pixels of pictures and video frames served from other domains, so the on-device models can check them. No page data is sent anywhere.
```

**Remote code:** No, I am not using remote code. The ONNX Runtime and all models ship inside the package.

**Data usage.** Tick these data types:
- **Website content.** Pictures, video frames and nearby text are analysed on the device.
- **User activity.** The extension stores the user's Show and Cover choices for pictures. The Chrome Web Store asks for disclosure even when data stays on the device.

Tick all three certifications:
- data is not sold or transferred to third parties outside the approved use cases;
- data is not used or transferred for purposes unrelated to the single purpose;
- data is not used to determine creditworthiness or for lending.

**Privacy policy URL:** the GitHub Pages address of `privacy-policy/`. See the next section.

## 4. Hosting the privacy policy (GitHub Pages, about 3 minutes)

1. Create a **public** repository, for example `loweryourgaze-privacy`.
2. Upload the contents of `privacy-policy/` (`index.html`, `logo.svg`, `fonts/`) to the repository root.
3. Go to **Settings → Pages → Deploy from a branch → main / (root) → Save**.
4. After a minute the page is live at `https://<your-github-username>.github.io/loweryourgaze-privacy/`. Paste that address into the Privacy tab.

## 5. Test instructions tab (for the reviewer)

```
No account or setup is needed. Install the extension and open any page with photos of people (an image search, a news site or YouTube): pictures of women are blurred. Click the toolbar eye for the panel. Right-click a picture for Show, Cover or Check it again. All processing happens on the device; the extension makes no network requests of its own beyond reading the pictures the page already shows.
```

## 6. Distribution tab

- **Visibility:** Public. Alternatively choose Unlisted first, test the store build, then switch to Public.
- **Regions:** all.

Then **Submit for review**. Because the extension has access to all sites, expect a fuller review than for small extensions.
