# Maskwatech — Account & User Field Specifications

---

## A. Main Account — Indigenous Community
*(First Nations, Métis, Inuit)*

### Community Type
- [ ] First Nations
- [ ] Métis
- [ ] Inuit

### Community Details

| Field | Notes |
|---|---|
| **Official Name** | e.g., *Frog Lake* |
| **Suggested Username** | Auto-generated from name + number — e.g., `Froglake465` |
| **Community Number** | e.g., *465* |
| **If Métis — Region** | Text field |

### Main Contact

| Field | Notes |
|---|---|
| **Suffix** | Mr. / Ms. / Mrs. |
| **First Name** | |
| **Last Name** | |
| **Position / Title** | Dropdown with typeahead (Chief, Elder, Council Member, CEO, Manager, Legal, Advisor, Other). Suggest existing options with correct spelling — e.g., *Director of Lands and Natural Resources* |
| **Mobile Number** | Used as login credential for users; community login based on email or community name |
| **Email** | Backup for password reset |

### Profile *(required on first login)*

| Field | Notes |
|---|---|
| **Mailing Address — Name** | |
| **Street** | |
| **Province** | |
| **Postal Code** | |
| **Treaty** | Filtered by province — see treaty reference table below |
| **Avatar** | Upload |

#### Treaty Reference by Province

> Filter treaty options based on the province selected in the mailing address.

| Province / Territory | Applicable Treaties |
|---|---|
| Alberta | 4, 6, 7, 8, 10 |
| Saskatchewan | 2, 4, 5, 6, 8, 10 |
| Manitoba | 1, 2, 4, 5 |
| Ontario | 3, 4, 9 |
| British Columbia | 8 (northeastern portion) |
| Northwest Territories | 8, 11 |
| Yukon | 11 |

### Banking Information (EFT)

| Field | Notes |
|---|---|
| **Branch Number** | |
| **Bank Number** | |
| **Account Number** | |
| **Void Cheque** | Upload for verification |

> Shapefile is uploaded by Super Admin after the profile is created and activated.

---

### Invoice Setup — Indigenous Community

**Q: Do you collect Sales Taxes?**

- **No** → Account setup is complete.
- **Yes** → Complete the fields below:

| Field | Notes |
|---|---|
| **Business Name** | |
| **Business License / Registration** | Upload for verification |
| **Mailing Address** | |
| **GST #** | Show only if applicable to province |
| **PST #** | Show only if applicable to province |
| **HST #** | Show only if applicable to province |

> **Tax logic:** Check the account's province/territory and display only the relevant tax fields. See the [Canadian Sales Tax Rates reference](#canadian-sales-tax-rates-by-province).

---

## B. User Account — Indigenous Community (Admin / Editor)

Simple onboarding: enter mobile number → verify via SMS → complete the rest of the profile.

| Field | Notes |
|---|---|
| **Suffix** | Mr. / Ms. / Mrs. |
| **First Name** | |
| **Last Name** | |
| **Mobile Number** | Used as login credential |
| **Email** | |
| **Position / Title** | |
| **Avatar** | Optional; can be added after account verification |

---

## C. User Account — Indigenous Community (TLU Collector)

Same onboarding procedure as Admin/Editor. Access is limited to the mobile app or online map for creating and uploading TLUs only (drop a pin, identify the TLU type).

| Field | Notes |
|---|---|
| **Suffix** | Mr. / Ms. / Mrs. |
| **First Name** | |
| **Last Name** | |
| **Mobile Number** | Used as login credential |
| **Email** | |
| **Position / Title** | |
| **Avatar** | Optional; can be added after account verification |

---

## D. Proponent Account

| Field | Notes |
|---|---|
| **Industry Type** | Dropdown or checkbox: Industry / Federal / Provincial / Territorial / Municipal |
| **Company Name** | Real-time lookup against existing accounts — if same name + address exists, file user under that company |
| **Suffix** | Mr. / Ms. / Mrs. |
| **First Name** | |
| **Last Name** | |
| **Mobile Number** | |
| **Email** | |
| **Position / Title** | |
| **Department** | |
| **Avatar** | Optional; can be added after account verification |

### Mailing Address

| Field |
|---|
| Name |
| Street Address |
| Province |
| Postal Code |

---

## E. Consultant Account

| Field | Notes |
|---|---|
| **Company Name** | |
| **Suffix** | Mr. / Ms. / Mrs. |
| **First Name** | |
| **Last Name** | |
| **Mobile Number** | |
| **Email** | |
| **Position / Title** | |
| **Avatar** | Optional; can be added after account verification |

### Mailing Address

| Field |
|---|
| Name |
| Street Address |
| Province |
| Postal Code |

### Banking Information (EFT)

| Field | Notes |
|---|---|
| **Branch Number** | |
| **Bank Number** | |
| **Account Number** | |
| **Void Cheque** | Upload for verification |

> Super Admin assigns First Nations to a Consultant account after setup.

### Invoice Setup — Consultant

| Field | Notes |
|---|---|
| **Business License / Registration** | Upload |
| **Mailing Address** | Checkbox: *Same as above* |
| **GST #** | Show only if applicable to province |
| **PST #** | Show only if applicable to province |
| **HST #** | Show only if applicable to province |

**Q: Do you collect GST / PST / HST?**
- **No** → Account setup is complete.
- **Yes** → Enter applicable tax registration numbers.

> **Tax logic:** Check the account's province/territory and display only the relevant tax fields. See the [Canadian Sales Tax Rates reference](#canadian-sales-tax-rates-by-province).

---

## F. Consultant Sub-Account

| Field | Notes |
|---|---|
| **Suffix** | Mr. / Ms. / Mrs. |
| **First Name** | |
| **Last Name** | |
| **Mobile Number** | |
| **Email** | |
| **Position / Title** | |
| **Avatar** | Optional; can be added after account verification |

---

## Canadian Sales Tax Rates by Province

*Source: [Retail Council of Canada](https://www.retailcouncil.org/resources/quick-facts/sales-tax-rates-by-province/)*

| Province / Territory | Tax Type | PST | GST | HST | Total Rate | Notes |
|---|---|---|---|---|---|---|
| Alberta | GST | — | 5% | — | **5%** | |
| British Columbia | GST + PST | 7% | 5% | — | **12%** | |
| Manitoba | GST + PST | 7% | 5% | — | **12%** | PST reduced from 8% to 7% as of July 1, 2019 |
| New Brunswick | HST | — | — | 15% | **15%** | HST increased from 13% to 15% as of July 1, 2016 |
| Newfoundland & Labrador | HST | — | — | 15% | **15%** | HST increased from 13% to 15% as of July 1, 2016 |
| Northwest Territories | GST | — | 5% | — | **5%** | |
| Nova Scotia | HST | — | — | 14% | **14%** | HST reduced from 15% to 14% as of April 1, 2025 |
| Nunavut | GST | — | 5% | — | **5%** | |
| Ontario | HST | — | — | 13% | **13%** | |
| Prince Edward Island | HST | — | — | 15% | **15%** | |
| Quebec | GST + QST | 9.975% | 5% | — | **14.975%** | |
| Saskatchewan | GST + PST | 6% | 5% | — | **11%** | |
| Yukon | GST | — | 5% | — | **5%** | |

---

## Required Documents & Agreements

| Account Type | Required |
|---|---|
| All accounts | Terms of Service (TOS) + End User License Agreement (EULA) |
| Indigenous Community | TOS + EULA + Statement of Work (SOW) + System Services Agreement (SSA) |

---

## General Notes on Authentication

- All user accounts are identified by **mobile number**, confirmed via SMS verification.
- **Email** is collected as a backup for password resets.
- Authentication flow: enter mobile number → SMS verification → complete profile.
- **Future:** 2FA with push notification for registered devices.
