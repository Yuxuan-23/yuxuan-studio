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

---

# Design QA — Data & Decisions Case Study

final result: passed

## Evidence

- Source visual truth: `/Users/yuxuan/Documents/个人网站/yuxuan-studio/audit-output/2026-08-25-data-case/source-enterprise-case-1280.png` (1265 × 712 px), the current Enterprise Systems case page used as the page-language baseline.
- Desktop implementation: `/Users/yuxuan/Documents/个人网站/yuxuan-studio/audit-output/2026-08-25-data-case/implementation-data-case-1280-v4.png` (1265 × 712 px).
- Same-input comparison: `/Users/yuxuan/Documents/个人网站/yuxuan-studio/audit-output/2026-08-25-data-case/comparison-source-vs-data-1280-final.png` (1280 × 720 px).
- Homepage focused region: `/Users/yuxuan/Documents/个人网站/yuxuan-studio/audit-output/2026-08-25-data-case/implementation-home-data-entry-1280-v3.png` (1265 × 712 px).
- Mobile top and bottom: `/Users/yuxuan/Documents/个人网站/yuxuan-studio/audit-output/2026-08-25-data-case/implementation-data-case-390-top-final.png` and `implementation-data-case-390-bottom-final.png` (375 × 812 px captures inside a 390 × 844 CSS-pixel browser viewport).
- Density normalization: source and desktop implementation are both 1× captures at the same browser state and viewport; no scaling normalization was required.
- State: default light theme; Data & Decisions page at top; homepage at `#data-modeling`; mobile project menu closed for screenshots and opened once for interaction verification.

## Full-view comparison

- The implementation keeps the source case page's 1080 px reading width, two-column hero, compact result card, serif-led Chinese hierarchy, warm paper background, restrained shadow, and low-contrast section separators.
- The blue-grey data palette is an intentional domain accent; it stays inside the existing warm-white editorial system instead of introducing a dashboard or cyber visual language.
- The new page is denser than a marketing landing page but remains scannable through short sections, semantic lists, result cards, and progressive disclosure.

## Focused-region comparison

- Homepage card: changed the incorrect three-class output into a single continuous `P（提级）0—1` output. The card now reads `五类特征 → XGBoost → 资产提级概率` and links to the case page from the visual, title, and CTA.
- Desktop hero: result card explains that AUC uses continuous probability scores against true 0/1 labels and is not calculated from thresholded predicted classes.
- Mobile hero: headline, summary, result card, and project scope stack without clipping or horizontal overflow.
- Mobile closing flow: probability output → experiment → feedback remains legible, with the sticky header and footer links intact.

## Comparison history

### Pass 1 — blocked

- [P1] The homepage visual incorrectly showed three output classes (`高潜 / 关注 / 待观察`) even though the modeling target was binary.
- [P1] The first case-page copy blurred model output and downstream product use by describing an `运营优先级` as the direct output.

### Pass 2 — blocked

- Replaced the three classes with `提级 / 未提级`, but this still over-thresholded the actual model output.
- [P1] The model produces a continuous asset-upgrade probability; categorical predictions were still misleading.

### Pass 3 — passed

- The training truth is now stated as 0/1, while the model output is consistently stated as a continuous asset-upgrade probability.
- The homepage visual uses one probability output, not two or three categories.
- AUC is explained as operating on continuous probability scores paired with true 0/1 labels, before any threshold conversion.
- Downstream thresholding, outreach, experiments, and feedback are explicitly presented as future productization steps rather than achieved model results.

## Required fidelity surfaces

- Fonts and typography: reuses the site's existing CJK display and sans stacks, title scale, weights, line heights, and compact eyebrow labels; desktop and mobile wrapping were visually checked.
- Spacing and layout rhythm: matches the source hero grid and section cadence; cards maintain consistent 14–16 px radii and compact internal spacing; no horizontal overflow at desktop or mobile.
- Colors and visual tokens: preserves the warm paper base and existing header; mist blue replaces the source case's grass green only as a data-domain accent, with equivalent contrast and elevation.
- Image quality and asset fidelity: the existing brand mark is reused directly. The case contains semantic data structures rather than decorative image assets; no missing images, placeholders, or approximate third-party artwork were introduced.
- Copy and content: `6340 万` is labeled as training records, `0.9339` as B-list AUC, and `第 5 名` as model-effect ranking. No production conversion lift, cost saving, causal uplift, or three-class output is claimed.

## Interactions and technical checks

- Homepage title, visual, and CTA navigate to `data-decisions.html`.
- Case-page back link returns to `index.html#data-modeling`.
- Mobile project menu opens, exposes the active Data & Decisions entry, and closes correctly.
- Skip link, landmark structure, heading order, visible focus treatment, and `aria-current` were retained.
- Browser console warnings/errors: none.
- Desktop document width: `clientWidth = scrollWidth = 1265`.
- Mobile document width: `clientWidth = scrollWidth = 375` inside the 390 px viewport.
- Production build: passed.
- `git diff --check`: passed.

## Findings

- No actionable P0, P1, or P2 findings remain.
- P3 follow-up: after personal contribution evidence is confirmed, the neutral team-work wording can be replaced with a more specific responsibility statement without changing the page structure.
