#!/usr/bin/env python3
"""
Meridian Partners — site builder (single source of truth for shared markup).

The 13 main pages contain marked regions like:

    <!-- build:nav -->
    ...generated, do not edit here...
    <!-- /build:nav -->

Run  `python3 build.py`  after editing anything in partials/ — it re-stamps
every marked region in every page from the partial files. Editing inside a
marked region in a page is futile: the next build overwrites it.

Regions: nav, footer, style-main, style-cards, style-transitions,
style-cookiebar, script-nav-restore, script-cookie-consent, script-menu,
script-motion, script-pointer, script-motion-fine.

index.html keeps two page-specific scripts inline (availability-bar config +
extended motion/compass script) and gets its own footer variant.
thank-you.html and readiness-checklist.html are standalone (not built).

No dependencies — Python 3 stdlib only.
"""
import re
import sys
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
P = os.path.join(ROOT, 'partials')

# ---------------------------------------------------------------------------
# Per-page configuration
#   active:        which desktop-nav item is highlighted gold
#   active_mobile: which mobile-menu item is highlighted gold
#   footer:        which footer partial to use (default 'footer')
#
# 2026-07-08: legal-page About quirk removed, active mobile links text-base,
# Services link added to all mobile menus (per Ajay's approval).
# ---------------------------------------------------------------------------
PAGES = {
    'index.html':             dict(active=None, active_mobile=None, footer='footer-index'),
    'about.html':             dict(active='about', active_mobile='about'),
    'industries.html':        dict(active='industries', active_mobile='industries'),
    'services.html':          dict(active='services', active_mobile='services'),
    'contact.html':           dict(active=None, active_mobile=None),
    'fractional-ciso.html':   dict(active='fractional-ciso', active_mobile='fractional-ciso'),
    'gap-analysis.html':      dict(active='gap-analysis', active_mobile='gap-analysis'),
    'vendor-evaluation.html': dict(active='vendor-evaluation', active_mobile='vendor-evaluation'),
    'dfsa-fsra-practice.html':dict(active='dfsa-fsra-practice', active_mobile='dfsa-fsra-practice'),
    'privacy.html':           dict(active=None, active_mobile=None),
    'terms.html':             dict(active=None, active_mobile=None),
    'cookies.html':           dict(active=None, active_mobile=None),
    'modern-slavery.html':    dict(active=None, active_mobile=None),
}

STONE_D = 'text-stone-100/90'
GOLD = 'text-gold'


def rd(path):
    with open(path, encoding='utf-8') as fh:
        return fh.read()


def render_nav(cfg):
    nav = rd(os.path.join(P, 'nav.html'))
    a = cfg.get('active')
    m = cfg.get('active_mobile')
    tok = {
        'SVC':   GOLD if a == 'services' else STONE_D,
        'IND':   GOLD if a == 'industries' else STONE_D,
        'ABT':   GOLD if a == 'about' else STONE_D,
        'DD_FC': GOLD if a == 'fractional-ciso' else STONE_D,
        'DD_GA': GOLD if a == 'gap-analysis' else STONE_D,
        'DD_VE': GOLD if a == 'vendor-evaluation' else STONE_D,
        'DD_DF': GOLD if a == 'dfsa-fsra-practice' else STONE_D,
        'M_FC':  'text-gold text-base' if m == 'fractional-ciso' else 'text-stone-100/80 text-base',
        'M_GA':  'text-gold text-base' if m == 'gap-analysis' else 'text-stone-100/80 text-base',
        'M_VE':  'text-gold text-base' if m == 'vendor-evaluation' else 'text-stone-100/80 text-base',
        'M_DF':  'text-gold text-base' if m == 'dfsa-fsra-practice' else 'text-stone-100/80 text-base',
        'M_IND': GOLD if m == 'industries' else STONE_D,
        'M_SVC': GOLD if m == 'services' else STONE_D,
        'M_ABT': GOLD if m == 'about' else STONE_D,
    }
    for k, v in tok.items():
        nav = nav.replace('{{%s}}' % k, v)
    return nav


def render(name, page, cfg):
    if name == 'nav':
        return render_nav(cfg)
    if name == 'footer':
        return rd(os.path.join(P, cfg.get('footer', 'footer') + '.html'))
    return rd(os.path.join(P, name + '.html'))


REGION = re.compile(r'(<!-- build:([a-z-]+) -->\n)(.*?)(<!-- /build:\2 -->)', re.S)


def build_page(page, cfg):
    t = rd(os.path.join(ROOT, page))
    n = 0

    def stamp(m):
        nonlocal n
        head, name, inner, tail = m.group(1), m.group(2), m.group(3), m.group(4)
        ws = inner[:len(inner) - len(inner.lstrip(' \t'))]
        ws = ws.splitlines()[0] if '\n' in ws else ws
        body = render(name, page, cfg)
        n += 1
        return head + ws + body + '\n' + tail

    out = REGION.sub(stamp, t)
    leftover = re.findall(r'\{\{[A-Z_]+\}\}', out)
    assert not leftover, f'{page}: unsubstituted tokens {leftover}'
    with open(os.path.join(ROOT, page), 'w', encoding='utf-8') as fh:
        fh.write(out)
    return n


def main():
    total = 0
    for page, cfg in PAGES.items():
        n = build_page(page, cfg)
        total += n
        print(f'  {page:<26} {n} regions')
    print(f'Stamped {total} regions across {len(PAGES)} pages.')


if __name__ == '__main__':
    main()
