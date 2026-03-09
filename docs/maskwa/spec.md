# Maskwatech — Indigenous Consultation Platform

## Priorities

1. Create First Nation (FN) accounts
2. Define default FN and/or import TLU Boundary for FN
3. Start collecting TLUs and importing them (mobile and desktop)
4. Accept Projects that trigger consultation
5. Enable consultation

---

## 1. Core Functionality: Project Processing via Shapefiles

The system automates indigenous consultation by analyzing geographic shapefiles submitted by project proponents (e.g., construction companies, forestry, mining, etc.).

- **Input:** A proponent uploads a project, which must include a shapefile defining the project's geographic area.
- **Processing:** The system analyzes the shapefile to determine:
  - Which First Nations' territories (consultation boundaries) the project overlaps with.
  - For each affected First Nation:
    - Whether they have an active account on the platform.
    - Whether they manage their own consultations or are represented by a consulting firm.
    - Their consultation boundary (a default 200 km radius around their reserve, or a custom government-recognized Traditional Land Use (TLU) boundary file).
- **Output:** The project is automatically routed to the appropriate accounts (First Nation admin or their consulting firm) for review.
- **Future Feature — Employability DB:** The system will suggest local First Nation businesses within 50 km of the project for hiring. This feature is created by First Nations or users free of charge. The determination will be made by office address instead of shapefile. Basic field info to be provided at a later point.

---

## 2. User Account & Permission Model

The system uses a hierarchical account structure.

### Account Types

#### 1. Maskwatech (Super Admin)
The platform owner. Has ultimate override capabilities.

**Key responsibilities:**
- Assign First Nations to consultants
- Import/master TLU boundaries
- Suspend accounts
- Manage system-wide settings (e.g., increasing default user limits)
- Verify payments and mark invoices as paid
- Billing managed via WaveApps API

#### 2. Master Account
Represents a single entity (e.g., *Frog Lake First Nation*, *ABC Consulting Firm*, *Petro Canada*). This is the top-level account for a client. All other users are created beneath it.

**Sub-user roles within a Master Account:**

| Role | Permissions |
|---|---|
| **Admin** | Full permissions. Can create sub-users, approve projects, manage budgets, correspond with proponents. |
| **Editor** | Can review projects, upload documents, prepare budgets. Cannot give final approval. |
| **TLU Collector** | Limited account for collecting/uploading Traditional Land Use data points in the field. Data requires verification by an Admin or Editor. |

#### 3. Consultant Account *(Specialized Master Account)*
A consulting firm managing multiple First Nations. Functions as a Super User for all First Nations assigned to them by Maskwatech.

- Can log in once and switch between client First Nations to manage projects and budgets on each one's behalf.
- **Project view:** A project is presented to a Consultant with all managed First Nations listed in order. Each FN view mirrors a standard FN account workflow.
- **Consultant inbox** is categorized by project. The project is visualized as a composite view of all involved FNs.
- The consultant reviews the project and prepares a budget for each FN; a **grand total** is generated at the end of the review process.
  - The grand total is **only visible to the Consultant** for tracking purposes.
  - The Proponent and each First Nation only see the budget for their portion of the project.

  > **Example:**  
  > High Speed Train Project — Total: $1,000  
  > - Frog Lake FN: $200  
  > - Onion Lake FN: $300  
  > - Kehewin FN: $500

- Can configure a default fee (percentage or flat rate) added to every budget they create for a First Nation client. This is only accessible by the Admin or Maskwatech Super Admin. The fee is applied by default once entered but can be overwritten by an admin when the invoice is made (either % or $ amount).

#### 4. Proponent Account *(e.g., Epcor)*
For companies submitting projects for consultation.

- The account creator is an Admin. They can create additional users to submit projects, agree to budgets, and provide PO numbers.
- **Duplicate prevention:** When a user creates a proponent account, the system performs a real-time lookup of existing proponent accounts as they type. If an account with the same name and address already exists, the new user is filed under that company. (Prevents duplicate accounts like 50 Epcor entries at the same address.)

---

### Default Limits

| Account Type | Sub-users (Admin/Editor) | TLU Collector accounts |
|---|---|---|
| FN Master Account | 10 | 10 |
| Consultant Master Account | 10 | 10 |
| Proponent | Unlimited | — |
| Maskwatech | Unlimited | — |

- These limits are configurable by Maskwatech Super Admins under **Account Limits**.

### Authentication

- All user accounts are verified by **cell phone number via SMS** to prevent duplicate accounts.
- An **email address** is collected as a backup.
- A Master First Nation account can only be created by a Maskwatech Super User or a Consultant account.
- Sub-users under a Master Account can be created by that account's Admin.
- Only a Maskwatech Super User can add a FN account to a Consultant account.

---

## 3. Project Workflow Logic

### Sequence of Events

1. **Project Submission** — A proponent submits a project including a shapefile. *(The "drop a pin on a map" feature is removed from the proponent view.)*
2. **Notification & Assignment** — Affected First Nations/Consultants are notified. An Admin can assign the project to an Editor or review it themselves.
3. **Review & Budgeting** — The assigned user reviews the project shapefile and any relevant TLU data within a 3 km radius of the shapefile.
   - Sensitivity zones: 300 m → 800 m → 3 km (project boundary)
   - A budget for consultation work (fieldwork, elder meetings, etc.) is prepared and sent to the proponent.
   - All budgets include the platform fee; budgets created by a consultant also include a consultation fee.
4. **Proponent Agreement** — The proponent must:
   - Agree to the budget
   - Provide a PO number
   - Sign off electronically (options: DocuSign-style, typed full name, or SMS 2FA confirmation)
5. **Work Execution (WIP — Work in Progress)** — Upon agreement, the First Nation/Consultant:
   - Collects TLU data (via mobile or PC)
   - Uploads reports as needed
   - When complete, proponent is notified that documents or TLUs were added. Proponents cannot view TLU details — they are only informed that *X* TLUs were collected in the designated 3 km area and added to the existing DB.
6. **Project Resolution** — The First Nation/Consultant submits a final response:
   - **Yes** — Project approved. Documents released after invoice payment.
   - **No** — Project rejected. Final invoice is generated for work done; project is archived after payment is confirmed by Maskwatech.
   - **Maybe (Revisions)** — Proponent is asked to submit revised plans. Proponents can also choose to **freeze** or **cancel** the project, triggering a final invoice. If extra work is required, the FN/Consultant may produce an additional budget revision appended to the existing budget.

---

## 4. Data Management: TLU & Boundaries

### TLU (Traditional Land Use) Data
Geospatial points (e.g., berry bushes, sacred sites, animal trails) collected by First Nations.

- **Pre-population:** Use the current DB as a starting point so entries auto-fill as users type, preventing mistakes.
- **Shared DB:** If Frog Lake FN adds "Wild Horses," that TLU entry becomes available as a search option for all FNs and Consultants. Super Admins can also add entries system-wide to the plant/animal DB.
- **Privacy:** TLU data is highly sensitive. It is only visible to:
  - The owning First Nation
  - Their designated Consultant
  - Maskwatech Super Admins
  - *Proponents and their hired contractors cannot see TLU data.*
- **Upload methods:**
  - Bulk import via CSV/Excel
  - Field collection via mobile by TLU Collectors (requires Admin/Editor verification)
  - Drop a pin on the map (PC — no verification required)
- **Image size:** Images attached to TLU entries should be size-limited, or the system should propose reusing an existing image of the same plant/animal to avoid storing thousands of duplicate images.

### TLU Boundary Files
Government-recognized polygons defining a First Nation's or Métis consultation area.

- Can only be imported by Maskwatech Super Admins.

### Additional Layers
First Nation Admins or their consultants can upload other shapefiles (e.g., fish habitat, past logging sites) for reference.

- **Performance:** The map viewer should limit visible layers to 3–5 at a time.
- **Layer management:** Option labeled *"Create a New Layer"* — give it a name and import a shapefile. The layer will be listed under **Layers** as one of the view options.
- **Layer refresh:** Users can upload a new shapefile for a given layer as new data becomes available. The old shapefile is archived (useful for reports, e.g., animal migration before/after a project).
- **Layer deletion:** If a FN deletes a layer, it is archived by Maskwatech and removed from their view.
- **RAAD (Proponent Consultant Layer):**
  - A proponent consultant may upload a layer for archaeological purposes. This does **not** trigger a consultation; it is treated as TLU points.
  - Can be submitted via a Proponent account as either a **New Project** or a **New RAAD** (RAAD can only be added to an existing project), or by requesting Maskwatech Admin to add it to the DB.
  - Status of RAAD visibility to be confirmed.

---

## 5. Billing & Payments

### Invoice Structure
Invoices are issued by Maskwatech acting as an agent.

```
Total Invoice = (First Nation's Consultation Fee + Consultant's Fee) + Platform Fee (20%)
```

*(Invoice file/template to be provided as an example.)*

### Payment Flow

1. The proponent pays the full or partial invoice to Maskwatech.
2. Maskwatech Super Admin verifies payment receipt in the bank.
3. Super Admin marks the invoice as **paid** in the system.
4. Payment breakdown is calculated so all totals are clearly visible.
5. Maskwatech transfers the applicable amount to the FN directly or to the Consultant (the Consultant then manages their own payment split and can mark items as paid on their side).
6. Documents are released to the proponent stating the decision status and reason (form letter template to be provided).

### Recurring Billing
Some FN/Consultants may utilize the invoicing module to set up recurring billing to the proponent as part of the consultation process.

- Set up as a separate **Recurring Billing** entry: define the invoice, time, frequency, total amount, and end point.
- **Recurring invoices do not include a platform fee.**

---

## 6. Maskwatech Management Console Requirements

Full CRUD operations on all system entities.

The admin console must allow Super Admins to:

- **Account management:** Create, suspend, and assign First Nations to Consultants.
- **User limits:** Override default user account limits for any Master Account.
- **TLU Boundaries:** Import and manage TLU Boundary files.
- **Invoicing:** Create, mark as paid/partially paid, and close out invoices.
- **Project reassignment:** Reassign projects from deleted users to active users within the same Master Account. *(This can also be done by the Admin of each FN or Consultant account.)*
