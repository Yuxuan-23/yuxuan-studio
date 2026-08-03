# Design QA — Hero and Selected Work

final result: passed

## Evidence

- Archive visual reference: `/Users/yuxuan/Documents/个人网站/yuxuan-studio/audit-output/05-archive-work.png` (1265 × 712 px).
- Current Selected Work capture: `/Users/yuxuan/Documents/个人网站/yuxuan-studio/audit-output/15-archive-restored-work.png` (1265 × 708 px).
- Current LightTrace detail: `/Users/yuxuan/Documents/个人网站/yuxuan-studio/audit-output/16-lighttrace-restored-detail.png`.
- Hero boxed-facts baseline: `/Users/yuxuan/Documents/个人网站/yuxuan-studio/audit-output/19-hero-inline-proof.png` (1265 × 708 px).
- Hero editorial-facts implementation: `/Users/yuxuan/Documents/个人网站/yuxuan-studio/audit-output/22-hero-editorial-proof.png` (1265 × 708 px).
- Combined comparison: `/Users/yuxuan/Documents/个人网站/yuxuan-studio/audit-output/23-final-comparison.png`.
- Responsive capture: `/Users/yuxuan/Documents/个人网站/yuxuan-studio/audit-output/24-mobile-final.png`; the page is rendered inside a 390 × 844 CSS-pixel QA frame so its mobile media queries are active.
- State: homepage default hero and `#lighttrace`; default theme; 1× browser density.

## Comparison history

### Pass 1 — failed

- [P1] LightTrace architecture introduced a blue component that did not belong to the archive's warm paper and deep-green visual language.
- [P1] The four-page case list created an empty, unbalanced left column and looked like raw supporting copy.
- [P2] The `FLAGSHIP` badge and direct “one flagship, two wings” subtitle over-explained the intended hierarchy.
- [P2] The separate At a Glance row interrupted the transition from hero to Selected Work.

### Pass 2 — failed

- LightTrace was restored to the archive composition and the standalone At a Glance band moved into the hero.
- [P2] The four career facts still read as a third set of buttons because each had a bordered card surface.
- [P2] “AI Product Manager” and “5 years of enterprise systems and AI product practice” were each repeated between hero copy and evidence labels.

### Pass 3 — passed

- Restored the archive LightTrace palette, typography, structure, spacing, and natural-height architecture card.
- Removed the four-page list and flagship badge; retained emphasis through default position, primary CTA, and the persistent LightTrace header entry.
- Moved four career facts below the Product Notes link and changed them to an unboxed, two-column editorial index with hairline separators.
- Reduced duplicate copy: the English name line now contains only the name; the value statement no longer repeats the five-year fact.

## Fidelity and content checks

- Hero hierarchy reads as identity → role → value statement → primary actions → evidence.
- The four facts remain available without competing with the buttons or floating project cards.
- Selected Work again matches the archive's warm paper, serif-led titles, green evidence surface, restrained shadows, and three-project deck.
- LightTrace remains unmistakably first without making the other two projects disappear.
- No cropped hero text, horizontal overflow, empty architecture column, or unintended truncation was observed at desktop or 390 px responsive width.
- Header and primary LightTrace links point to `https://litrace.site/` and open in a new tab.
- The LightTrace CTA arrow has a short two-cycle entrance nudge and respects reduced-motion preferences.

## Interactions tested

- Project deck: LightTrace → Complex Systems → Xixi & Little Light → LightTrace.
- Active panel, `aria-current`, `aria-hidden`, and `inert` states update correctly.
- Header LightTrace entry and case CTA URLs/targets were verified.
- Browser console warnings/errors: none.
- Production build: passed.

## Findings

- No actionable P0, P1, or P2 findings remain.
