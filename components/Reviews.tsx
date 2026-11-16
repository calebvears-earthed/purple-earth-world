import { judgeMeConfigured } from "@/lib/integrations";

export function Reviews({ handle }: { handle: string }) {
  if (!judgeMeConfigured()) {
    return (
      <div>
        <h2>Reviews</h2>
        <p>No reviews yet. They will appear here when Judge.me is connected. We do not publish invented quotes.</p>
      </div>
    );
  }
  const domain = process.env.NEXT_PUBLIC_JUDGEME_SHOP_DOMAIN;
  const token = process.env.NEXT_PUBLIC_JUDGEME_PUBLIC_TOKEN;
  return (
    <div>
      <h2>Reviews</h2>
      <p>Photographs from people who bought the piece. The widget needs the Shopify product id to match this handle, {handle}.</p>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.jdgm=window.jdgm||{};jdgm.SHOP_DOMAIN=${JSON.stringify(domain)};jdgm.PLATFORM='shopify';jdgm.PUBLIC_TOKEN=${JSON.stringify(token)};`,
        }}
      />
      <script data-cfasync="false" src="https://cdn.judge.me/widget_preloader.js" async />
      <div className="jdgm-widget jdgm-review-widget" data-id={handle} />
    </div>
  );
}
