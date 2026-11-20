# Mobile Kitchen Hub commercial experiments

Use this log to connect website changes to qualified operator leads and builder revenue. Revenue is counted only after confirmed payment.

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
