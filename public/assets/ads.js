(() => {
  const scriptElement = document.currentScript;
  const configHref = new URL(scriptElement?.dataset.config || 'ads-config.json', document.baseURI).href;
  const fallbackOffers = [
    {
      id: 'coupang-macbook-pro',
      title: '맥북 프로',
      description: '무거운 파일도 조용히 밀어붙이는 업무용 노트북',
      url: 'https://link.coupang.com/a/eHA8TiM9fM',
      badge: '쿠팡',
    },
    {
      id: 'coupang-monami',
      title: '모나미 볼펜',
      description: '회의록, 결재선, 급한 메모까지 버티는 책상 기본템',
      url: 'https://link.coupang.com/a/eHA94Z4nDw',
      badge: '쿠팡',
    },
    {
      id: 'coupang-airpods-pro-3',
      title: '에어팟 프로 3',
      description: '말 걸기 애매한 집중 모드를 조용히 켜두는 이어폰',
      url: 'https://link.coupang.com/a/eHBbFKogzQ',
      badge: '쿠팡',
    },
  ];
  const fallbackDisclosure = '광고 · 쿠팡 파트너스 활동으로 수수료를 제공받을 수 있음';
  const clientPattern = /^ca-pub-\d+$/;
  const slotPattern = /^\d+$/;
  const runtime = {
    configPromise: null,
    adsenseScriptPromise: null,
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function injectStyles() {
    if (document.getElementById('yageum-ads-style')) return;
    const style = document.createElement('style');
    style.id = 'yageum-ads-style';
    style.textContent = `
      [data-ad-slot-name] {
        width: 100%;
        margin: 0 0 28px;
      }
      [data-ad-slot-name][hidden] {
        display: none !important;
      }
      .yageum-ad-label {
        display: inline-flex;
        align-items: center;
        min-height: 24px;
        margin-bottom: 8px;
        padding: 2px 8px;
        border: 2px solid #191f28;
        border-radius: 8px;
        background: #ffffff;
        color: #191f28;
        font-size: 11px;
        font-weight: 900;
        line-height: 1.2;
      }
      .yageum-ad-fallback {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 14px;
        align-items: center;
        width: 100%;
        min-height: 116px;
        padding: 18px 20px;
        border: 2.5px solid #191f28;
        border-radius: 16px;
        background: #ffd158;
        box-shadow: 4px 4px 0 #191f28;
        color: #191f28;
        text-decoration: none;
      }
      .yageum-ad-fallback strong {
        display: block;
        margin: 0 0 5px;
        font-size: 18px;
        font-weight: 900;
        line-height: 1.25;
        letter-spacing: 0;
        word-break: keep-all;
        overflow-wrap: break-word;
      }
      .yageum-ad-fallback p {
        margin: 0;
        color: #333d4b;
        font-size: 14px;
        font-weight: 800;
        line-height: 1.45;
        word-break: keep-all;
        overflow-wrap: break-word;
      }
      .yageum-ad-fallback small {
        display: block;
        margin-top: 10px;
        color: #4e5968;
        font-size: 11px;
        font-weight: 900;
        line-height: 1.4;
      }
      .yageum-ad-badge {
        display: inline-flex;
        align-items: center;
        min-height: 24px;
        margin-bottom: 8px;
        padding: 2px 8px;
        border: 2px solid #191f28;
        border-radius: 8px;
        background: #ffffff;
        color: #191f28;
        font-size: 11px;
        font-weight: 900;
        line-height: 1.2;
      }
      .yageum-ad-arrow {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        border: 2px solid #191f28;
        border-radius: 999px;
        background: #ffffff;
        font-size: 20px;
        font-weight: 900;
      }
      .yageum-ad-adsense {
        min-height: 100px;
        padding: 12px;
        border: 2px dashed #d1d6db;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.72);
      }
      .yageum-ad-adsense .adsbygoogle {
        min-height: 90px;
      }
      @media (max-width: 640px) {
        [data-ad-slot-name] {
          margin-bottom: 24px;
        }
        .yageum-ad-fallback {
          grid-template-columns: 1fr;
          min-height: 132px;
          padding: 16px;
        }
        .yageum-ad-arrow {
          justify-self: end;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function validClient(client) {
    return typeof client === 'string' && clientPattern.test(client.trim());
  }

  function validSlot(slot) {
    return typeof slot === 'string' && slotPattern.test(slot.trim());
  }

  function hasUsableAdsense(config, slotName) {
    return Boolean(
      config?.adsense?.enabled === true &&
      validClient(config.adsense.client) &&
      validSlot(config.adsense.slots?.[slotName])
    );
  }

  function loadConfig() {
    if (!runtime.configPromise) {
      runtime.configPromise = fetch(configHref, { cache: 'no-store' })
        .then((response) => {
          if (!response.ok) throw new Error(`ad config ${response.status}`);
          return response.json();
        })
        .catch(() => ({
          affiliateDisclosure: fallbackDisclosure,
          fallbackOffers,
          adsense: { enabled: false, client: '', slots: {} },
        }));
    }
    return runtime.configPromise;
  }

  function ensureAdsenseScript(client) {
    if (!runtime.adsenseScriptPromise) {
      runtime.adsenseScriptPromise = new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"][src*="${client}"]`);
        if (existing) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('adsense script failed'));
        document.head.appendChild(script);
      });
    }
    return runtime.adsenseScriptPromise;
  }

  function pickOffer(slot, offers) {
    const available = Array.isArray(offers) && offers.length > 0 ? offers : fallbackOffers;
    const seedText = `${location.pathname}:${slot.dataset.adSlotName || ''}`;
    let seed = 0;
    for (const char of seedText) seed = (seed + char.charCodeAt(0)) % available.length;
    return available[seed];
  }

  function renderFallback(slot, config) {
    if (slot.dataset.adFallback === 'none') {
      slot.hidden = true;
      slot.dataset.adRendered = 'none';
      return;
    }
    const offer = pickOffer(slot, config?.fallbackOffers);
    const disclosure = config?.affiliateDisclosure || fallbackDisclosure;
    slot.hidden = false;
    slot.dataset.adRendered = 'fallback';
    slot.innerHTML = `
      <a class="yageum-ad-fallback" href="${escapeHtml(offer.url)}" target="_blank" rel="sponsored noopener noreferrer">
        <span>
          <span class="yageum-ad-badge">광고 · ${escapeHtml(offer.badge || '제휴')}</span>
          <strong>${escapeHtml(offer.title)}</strong>
          <p>${escapeHtml(offer.description)}</p>
          <small>${escapeHtml(disclosure)}</small>
        </span>
        <span class="yageum-ad-arrow" aria-hidden="true">&nearr;</span>
      </a>
    `;
  }

  function renderAdsense(slot, config) {
    const slotName = slot.dataset.adSlotName;
    const client = config.adsense.client.trim();
    const adSlot = config.adsense.slots[slotName].trim();
    slot.hidden = false;
    slot.dataset.adRendered = 'adsense';
    slot.innerHTML = `
      <div class="yageum-ad-adsense">
        <span class="yageum-ad-label">광고</span>
        <ins class="adsbygoogle"
          style="display:block"
          data-ad-client="${escapeHtml(client)}"
          data-ad-slot="${escapeHtml(adSlot)}"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>
    `;
    ensureAdsenseScript(client)
      .then(() => {
        try {
          window.adsbygoogle = window.adsbygoogle || [];
          window.adsbygoogle.push({});
        } catch (error) {
          renderFallback(slot, config);
        }
      })
      .catch(() => renderFallback(slot, config));
  }

  async function render(root = document) {
    injectStyles();
    const config = await loadConfig();
    const slots = root.querySelectorAll?.('[data-ad-slot-name]:not([data-ad-rendered])') || [];
    slots.forEach((slot) => {
      const slotName = slot.dataset.adSlotName;
      if (hasUsableAdsense(config, slotName)) {
        renderAdsense(slot, config);
      } else {
        renderFallback(slot, config);
      }
    });
  }

  window.yageumAds = { render };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => render(document));
  } else {
    render(document);
  }
})();
