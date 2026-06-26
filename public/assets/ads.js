(() => {
  const scriptElement = document.currentScript;
  const configHref = new URL(scriptElement?.dataset.config || 'ads-config.json', document.baseURI).href;
  const defaultPlaceholder = {
    label: '광고',
    title: 'Google AdSense 광고 영역',
    description: 'AdSense 승인 후 실제 광고가 표시됩니다.',
  };
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
      .yageum-ad-placeholder {
        display: grid;
        gap: 14px;
        align-content: center;
        width: 100%;
        min-height: 116px;
        padding: 18px 20px;
        border: 2.5px solid #191f28;
        border-radius: 16px;
        background: #ffffff;
        box-shadow: 4px 4px 0 #191f28;
        color: #191f28;
      }
      .yageum-ad-placeholder strong {
        display: block;
        margin: 0 0 5px;
        font-size: 18px;
        font-weight: 900;
        line-height: 1.25;
        letter-spacing: 0;
        word-break: keep-all;
        overflow-wrap: break-word;
      }
      .yageum-ad-placeholder p {
        margin: 0;
        color: #333d4b;
        font-size: 14px;
        font-weight: 800;
        line-height: 1.45;
        word-break: keep-all;
        overflow-wrap: break-word;
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
        .yageum-ad-placeholder {
          min-height: 132px;
          padding: 16px;
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
          placeholder: defaultPlaceholder,
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

  function renderPlaceholder(slot, config) {
    const placeholder = { ...defaultPlaceholder, ...config?.placeholder };
    slot.hidden = false;
    slot.dataset.adRendered = 'placeholder';
    slot.innerHTML = `
      <div class="yageum-ad-placeholder">
        <span>
          <span class="yageum-ad-badge">${escapeHtml(placeholder.label)}</span>
          <strong>${escapeHtml(placeholder.title)}</strong>
          <p>${escapeHtml(placeholder.description)}</p>
        </span>
      </div>
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
          renderPlaceholder(slot, config);
        }
      })
      .catch(() => renderPlaceholder(slot, config));
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
        renderPlaceholder(slot, config);
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
