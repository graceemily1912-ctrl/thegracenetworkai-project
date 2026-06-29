# GoHighLevel Workflow Examples for KOLA AI

## 1. Workshop Payment Received (Trigger: Payment Received)

**Trigger**: Invoice / Payment Received for Workshop product

**Actions**:
1. Add Tag: `kola-workshop-attendee`
2. Add Tag: `kola-paid`
3. Send Email: "Welcome to the Workshop + Pre-work checklist"
4. Add to Calendar: Workshop event
5. Webhook (POST JSON):
   ```json
   {
     "type": "payment_received",
     "contactId": "{{contact.id}}",
     "email": "{{contact.email}}",
     "product": "workshop",
     "amount": "{{payment.amount}}"
   }
   ```
   URL: `https://<your-convex-site>.convex.cloud/webhooks/ghl`

## 2. Accelerator Application Approved → Invite

**Trigger**: Custom trigger or when tag `kola-accelerator-approved` added

Actions:
- Send Email with Accelerator details + payment link
- Add internal note "Ready for Accelerator"

## 3. Accelerator Payment Success

Actions:
1. Add tags: `kola-accelerator`, `kola-alumni`, `kola-paid`
2. Grant Membership: "KOLA AI Alumni"
3. Send Email: "Alumni Portal + Calendar booking instructions"
4. Webhook to Convex:
   ```json
   {
     "type": "accelerator_payment_received",
     "contactId": "{{contact.id}}",
     "email": "{{contact.email}}"
   }
   ```

## 4. Membership for Alumni Portal

Create a Membership product in GHL called "KOLA AI Alumni Portal".
Assign via workflow after Accelerator payment.

## Inbound Webhook Security

In GHL, set custom header `x-ghl-webhook-secret` = value from `GHL_WEBHOOK_SECRET`.

Convex http.ts verifies if the env var is set.

## Calendar Links

Use GHL Calendars. Pass `?contactId=...` or prefill using contact data.
