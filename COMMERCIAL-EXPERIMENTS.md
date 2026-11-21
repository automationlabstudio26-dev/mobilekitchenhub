# Mobile Kitchen Hub commercial experiments

Use this log to connect website changes to qualified operator leads and builder revenue. Revenue is counted only after confirmed payment.

## Active: Planning-page to project-brief bridge

- **Launched:** 21 November 2026
- **Audience:** Visitors reading city hubs, technical guides, calculators, equipment pages, builder directories and planning resources
- **Observed baseline:** The quote-acquisition page was present in the sitemap and homepage, but most planning pages only returned visitors to the calculator
- **Problem:** High-intent readers could finish a guide without seeing a direct, explained path into the structured project-brief funnel
- **Change:** Add a responsive end-of-content bridge with a free-project-brief CTA, calculator alternative, source-page attribution and explicit availability disclaimer
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

## Measurement rules

1. Use GA4 for aggregate funnel events and campaign attribution; never send names, emails, phone numbers, menu text, or locations to analytics.
2. Use Make, Airtable, and the notification inbox as the authoritative evidence that a lead was delivered.
3. Mark controlled tests clearly and exclude them from commercial totals.
4. Track partner outreach, replies, trials, payment status, and won revenue in the commercial pipeline workbook.
5. Do not change the experiment before its review threshold unless there is a functional, accessibility, privacy, or legal problem.
