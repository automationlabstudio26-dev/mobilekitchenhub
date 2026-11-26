# Mobile Kitchen Hub commercial experiments

Use this log to connect website changes to qualified operator leads and builder revenue. Revenue is counted only after confirmed payment.

## Active: Food truck business-plan acquisition tool

- **Launched:** 21 November 2026
- **Audience:** Early-stage operators searching for a food truck business plan template before requesting build quotations
- **Observed baseline:** The site had build-cost and break-even calculators but no dedicated business-plan template or generator
- **Change:** Add a free, browser-local plan generator covering concept, customers, menu, operations, permits, staffing, marketing, finance assumptions, risks and milestones, with copy/print controls and an attributed bridge into the project-brief funnel
- **Conversion update (26 November):** Carry the visitor's operating region, menu/concept, planned unit and currency-derived market into the calculator and project brief for one hour in same-tab session storage; consume and remove the handoff on arrival
- **Draft recovery update (26 November):** Preserve non-contact calculator and project details for up to 24 hours on the same device, restore them after an accidental refresh or return visit, and delete the draft after a successful submission; never store name, email, phone or consent in the draft
- **Primary event:** `business_plan_generated`
- **Downstream events:** `business_plan_copied`, `business_plan_handoff_loaded`, `project_brief_draft_restored`, `calculator_started`, `quote_form_started`, `lead_submitted`
- **Attribution:** `utm_source=business_plan_tool`, `utm_medium=tool_cta`, `utm_campaign=operator_quote_bridge`
- **Primary success metric:** Verified operator leads whose first- or last-touch path includes the business-plan tool
- **Guardrail:** Do not invent market prices, forecasts, lender approval or regulatory requirements; all figures are user-entered planning assumptions
- **Review window:** First review after 100 tool visits or 28 days, whichever occurs later

## Active: Builder approval-to-subscription funnel

- **Launched:** 21 November 2026
- **Commit:** `53a92b0`
- **Audience:** Food-truck builders, fabricators and conversion specialists interested in receiving structured buyer briefs
- **Observed baseline:** No confirmed paying builder partner; the public pricing page allowed visitors to enter checkout before coverage and lead criteria were reviewed
- **Problem:** A builder could pay before Mobile Kitchen Hub confirmed service-area fit or current enquiry availability, creating avoidable refund and trust risk
- **Change:** Make the no-charge application the required first step, label both Stripe links for approved builders, retain checkout access after approval, and change the post-checkout page so it does not claim activation before service-area verification
- **Application event:** `generate_lead` with a `partner_*` lead type
- **Checkout event:** `begin_checkout` with the selected partner package and GBP value
- **Primary success metric:** Confirmed paid builder subscriptions following an approved application
- **Supporting metrics:** Partner applications, approved applicants, suitable samples reviewed, checkout starts and confirmed payments
- **Guardrail:** Do not count a checkout visit, application, test, pending payment or unverified Stripe event as revenue; do not invite payment until coverage and current enquiry availability have been reviewed
- **Review window:** Review after the first 10 complete partner applications or 28 days, whichever occurs later

## Active: Planning-page to project-brief bridge

- **Launched:** 21 November 2026
- **Audience:** Visitors reading city hubs, technical guides, calculators, equipment pages, builder directories and planning resources
- **Observed baseline:** The quote-acquisition page was present in the sitemap and homepage, but most planning pages only returned visitors to the calculator
- **Problem:** High-intent readers could finish a guide without seeing a direct, explained path into the structured project-brief funnel
- **Change:** Add a responsive end-of-content bridge with a free-project-brief CTA, calculator alternative, source-page attribution and explicit availability disclaimer. Load the shared attribution script on the quote landing page so campaign parameters persist when the visitor continues to the calculator and lead form.
- **Primary event:** `operator_quote_bridge_clicked`
- **Attribution:** `utm_source=internal_site`, `utm_medium=cta`, `utm_campaign=operator_quote_bridge`, with the source page in `utm_content`
- **Downstream events:** `operator_quote_landing_cta`, `calculator_started`, `quote_form_started`, `lead_submitted`
- **Primary success metric:** Verified operator leads attributed to `operator_quote_bridge`
- **Guardrail:** Do not imply guaranteed builder availability, responses, quotations, certification or approval
- **Review window:** First review after 100 bridge impressions or 28 days, whichever occurs later

## Not launched: LinkedIn operator-acquisition post

- **Prepared:** 21 November 2026
- **Audience:** People planning a food truck or trailer, plus community members who may refer an operator
- **Asset:** `social/mobile-kitchen-hub-linkedin-operator-campaign.png`
- **Destination:** `https://mobilekitchenhub.com/get-food-truck-build-quotes/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=operator_acquisition_nov2026`
- **Primary goal:** Drive qualified operators into the calculator-to-project-brief funnel
- **Primary success metric:** Verified operator leads attributed to `operator_acquisition_nov2026`
- **Supporting metrics:** Landing-page visits, calculator starts, quote-form starts and completed lead submissions
- **Guardrail:** Free organic post only; do not imply certification, guaranteed quotations, guaranteed builder availability or paid endorsement
- **Status:** Cancelled on 21 November 2026 at the founder's request because the available LinkedIn profile is personal and professional; do not publish from that account
- **Alternative:** Retain the asset for possible use only if a dedicated Mobile Kitchen Hub business profile is created and separately approved

**Approved-copy candidate:**

> Planning a food truck or trailer?
>
> Before requesting build quotes, organize your menu, appliances, preliminary power requirement, budget and target date in one place.
>
> Mobile Kitchen Hub's free calculator and structured project-brief tool can help you prepare clearer information for regional fabricators.
>
> Free for operators. No subscription or obligation to buy. The calculator is an early planning estimate, not a final electrical design.
>
> https://mobilekitchenhub.com/get-food-truck-build-quotes/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=operator_acquisition_nov2026
>
> #FoodTruck #MobileKitchen #FoodTrailer #StreetFood #SmallBusiness

## Active: Operator referral sharing loop

- **Launched:** 20 November 2026
- **Commit:** `376007b`
- **Audience:** Operators, associations and community members who know someone planning a food truck or trailer
- **Observed baseline:** Six referral organizations were contacted on 20 November 2026; the quote-acquisition page had no native sharing controls
- **Problem:** A recipient who wants to pass the free tool to an operator must manually copy and explain the link, losing attribution and creating avoidable friction
- **Change:** Add WhatsApp, LinkedIn, Facebook and email sharing controls to `/get-food-truck-build-quotes/`, with campaign attribution and a tracked share event
- **Primary event:** `operator_tool_shared`
- **Attribution:** `utm_source=operator_share`, `utm_medium=referral`, `utm_campaign=operator_referrals`

### Referral-source preservation update — 21 November 2026

- **Problem found:** The quote page's sharing controls replaced an incoming partner's `utm_source` with the generic `operator_share` value, so second-generation referrals could not be credited to the originating organization.
- **Change:** Preserve the incoming source, medium and campaign in WhatsApp, email, Facebook, LinkedIn and copied share links; mark the new hop with `utm_content=shared_from_quote_page`.
- **Usability:** Added a `Copy share link` control that copies the referral text and attributed URL without requiring a social account.
- **Success measure:** Attributed visits and verified leads by referral organization in the commercial pipeline workbook.
- **Downstream events:** `operator_quote_landing_cta`, `calculator_started`, `quote_form_started`, `lead_submitted`
- **Primary success metric:** Verified operator leads attributed to the share campaign
- **Guardrail:** Sharing is optional; do not imply endorsement, guaranteed quotations, or guaranteed builder availability
- **Review window:** First review after 50 share events or 28 days, whichever occurs later

## Active: Bottom-of-funnel build-quote landing page

- **Launched:** 20 November 2026
- **Audience:** Organic and referral visitors searching for food-truck or food-trailer build quotes
- **Observed baseline:** No verified real operator lead notifications from 1–20 November 2026
- **Problem:** The homepage leads with generator sizing, while quotation-intent visitors need a page that explains the complete structured brief, matching process, consent boundary and no-obligation next step
- **Change:** Publish `/get-food-truck-build-quotes/` with a focused value proposition, intake-field preview, four-step matching explanation, FAQ schema and three tracked calculator CTAs
- **Primary event:** `operator_quote_landing_cta`
- **Downstream events:** `calculator_started`, `quote_form_started`, `lead_submitted`
- **Primary success metric:** Verified real leads whose landing page or first-touch landing page is the build-quote page
- **Guardrail:** Do not imply guaranteed builder availability, responses, quotations or approvals
- **Review window:** First review after 100 page views or 28 days, whichever occurs later

## Active: Mobile calculator-to-brief bar

- **Launched:** 20 November 2026
- **Commit:** `fa3db1e`
- **Audience:** Visitors on screens up to 720 px wide who select at least one calculator appliance
- **Observed baseline:** Gmail contained no verified real operator lead notifications from 1–20 November 2026; the only matching notification was the controlled pipeline test
- **Problem:** On mobile, the calculator result and its project-brief CTA can sit below a long equipment list, allowing a user to calculate and leave without entering the lead funnel
- **Change:** Show a fixed result bar after a non-zero calculation, display the recommended generator size, state that the brief is free and carries no obligation, and link directly to the project-brief form. Hide the bar while the form is visible.
- **Primary event:** `mobile_quote_bar_clicked`
- **Downstream events:** `quote_form_started`, `quote_form_step_completed`, `lead_submitted`
- **Primary success metric:** Verified real `lead_submitted` events from mobile visitors
- **Guardrail:** Do not count test submissions, spam, incomplete briefs, or opaque browser responses as leads. Confirm each lead in Make, Airtable, and the notification inbox.
- **Review window:** First review after 100 mobile calculator starts or 14 days, whichever occurs later

### Review fields

| Metric | Baseline | Review result |
| --- | ---: | ---: |
| Mobile calculator starts | Not yet established | — |
| Mobile brief-bar clicks | 0 | — |
| Mobile quote-form starts | Not yet established | — |
| Verified real mobile leads | 0 | — |
| High-intent mobile leads | 0 | — |
| Confirmed revenue | £0 | — |

## Active: Lead traceability and duplicate protection

- **Launched:** 21 November 2026
- **Audience:** Operators completing the structured project-brief form
- **Observed baseline:** Successful browser submissions had no operator-visible reference, and an identical brief could be submitted repeatedly after the first request completed
- **Problem:** Duplicate webhook runs create avoidable Make, Airtable and email noise, while a missing reference makes it harder to reconcile a user question with the originating submission
- **Change:** Generate a non-personal `MKH-…` lead reference, send it with the webhook payload, display it after submission, include it in the `lead_submitted` event and prevent an exact duplicate for five minutes unless the project details change
- **Primary events:** `lead_submitted`, `lead_duplicate_prevented`
- **Primary success metric:** Verified leads can be reconciled by reference without duplicate Airtable records or duplicate dispatch emails
- **Guardrail:** The duplicate window applies only to an exact client-side fingerprint and expires after five minutes; altered briefs remain submittable
- **Review window:** Review after the next 10 real submissions or 28 days, whichever occurs later

## Measurement rules

1. Use GA4 for aggregate funnel events and campaign attribution; never send names, emails, phone numbers, menu text, or locations to analytics.
2. Use Make, Airtable, and the notification inbox as the authoritative evidence that a lead was delivered.
3. Mark controlled tests clearly and exclude them from commercial totals.
4. Track partner outreach, replies, trials, payment status, and won revenue in the commercial pipeline workbook.
5. Do not change the experiment before its review threshold unless there is a functional, accessibility, privacy, or legal problem.
