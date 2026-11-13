# Purple Earth

Ritual wear from Adelaide. This is the v1 website: a Next.js app on Vercel, preview only until Caleb says merge.

The visual system is the Luminous Globe. Midnight Aubergine `#2B1830`, Mineral Purple `#38213E`, Aged Aubergine `#341A3A`, Bone `#F2EDE4`, Espresso `#544028` once per page as the action. Type is Playfair Display, Cormorant Garamond, and DM Sans. Logos in `public/brand/logo` are the supplied files. The aurora file is not used.

Drop 01 prices and the words on the site are drafts. The draft line hides when `NEXT_PUBLIC_CONTENT_STATUS=final`.

## Commands

```
npm install
npm run dev
npm run build
npm run check:copy
```

## What Caleb connects

Copy `.env.example` to `.env.local`. Leave a key blank and that connection stays off. Do not commit keys.

1. Shopify store, on the Basic plan, with the Headless channel. Products use these handles: `ground-hoodie`, `dusk-mock-neck-crew`, `ground-jogger`, `mineral-barrel-pant`, `dusk-boxy-tee`, `earth-biker-short`, `ritual-crop-tank`. Size option name: Size. Currency: AUD. Set `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` to the `myshopify.com` domain and `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` to the public Storefront token. Checkout reads `checkoutUrl` and leaves this site.
2. A Shopify Flow (or equivalent): when an order is created and the cart attribute `drop` is `01`, add the tag `drop-01-preorder`. The pre-order summary route reads that tag. It drafts a count with a 10 percent buffer. It does not buy anything.
3. `SHOPIFY_ADMIN_TOKEN` with read access to orders and products, server only, for `/api/automation/preorder-summary`.
4. Klaviyo. `KLAVIYO_API_KEY` and `KLAVIYO_LIST_ID`. The founding list subscribes server side. Build these flows in Klaviyo, they are not created from the site: welcome (three emails: the story, the club, the drop), browse abandon, cart abandon, post purchase, win back at day 90, Volts expiry reminder, tier upgrade. Also a shipping note, a care card, and a review request on day 14, triggered when an order is fulfilled.
5. Supabase, for the list, Walk Club RSVPs, QR check-ins, and barefoot minutes. `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`, server only. Tables: `waitlist` (email, name, source, created_at), `walk_club_rsvps` (name, email, walk_id, created_at), `walk_club_checkins` (email, walk_id, created_at, unique on email plus walk_id), `barefoot_logs` (email, minutes, month, created_at, unique on email plus month).
6. Rivo (or swap the base URL if you choose Smile and adapt `lib/integrations.ts`). `RIVO_API_KEY`. Awards stay off until `LOYALTY_AWARDS_ENABLED=true`, so adding the key does not mint points.
7. Judge.me. `NEXT_PUBLIC_JUDGEME_SHOP_DOMAIN` and `NEXT_PUBLIC_JUDGEME_PUBLIC_TOKEN`. Map a published review with a photograph to `POST /api/webhooks/review` with header `Authorization: Bearer AUTOMATION_SECRET` and body `{ "event": "review_published", "hasPhoto": true, "email": "..." }`.
8. Walk Club QR. Set `WALK_CLUB_CHECKIN_TOKEN` and point the code at `/club/check-in?t=TOKEN&walk=WALK_ID`.
9. Low stock. `POST /api/automation/low-stock` with the same bearer secret. Optional `SLACK_WEBHOOK_URL`. It reports variants under 5. It does not reorder.
10. Domain email for privacy and club contact. The site does not invent an address. Publish it when the mailbox exists.
11. Company registration and ABN. The footer says registration is pending and leaves the ABN blank on purpose.
12. Tapstitch, or the maker you choose, for fulfilment. The site does not call Tapstitch, so it cannot place a bulk order by itself.
13. Xero, as its own Purple Earth organisation, connected to Shopify. Not connected from this repo.

`AUTOMATION_SECRET` guards the summary, the low stock route, and the review webhook.

## Claims

Clothes are clothes. The site does not make a therapeutic claim, and it does not describe a garment as a way to earth a person. The guide at `/earthed-safely` is electrical safety, signed as Caleb, licensed electrician, Adelaide. A future mat is described only as an object with a lead to the earth pin, and it is not for sale.
