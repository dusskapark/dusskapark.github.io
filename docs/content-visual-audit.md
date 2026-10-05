# Mobile content visual audit

Reviewed on 2026-09-28 in Chrome through the browser automation interface, using a **390 × 844 CSS-pixel viewport**, device scale factor 1, and reduced motion. Initial inspection used the production build on port 3001; the complete sweep and repair checks used the current development build on port 3000 while the final production build was being prepared.

## Coverage and evidence

All **20 detail pages** were opened. For each page, a screenshot of the title/metadata region and at least one scrolled article region was captured and visually inspected in the tool session. Additional screenshots covered timeline labels and quote cards, technical code blocks, the static tweet fallback, and Korean/English infographic figures. Screenshot evidence is in the browser tool transcript; this document does not claim a full-page, pixel-by-pixel comparison or cross-browser validation.

Every page measured `document.documentElement.scrollWidth === 390`. Long titles, Korean paragraphs, team metadata, and the inspected media fit the viewport. Long code lines scroll inside their code block instead of widening the page. Mobile galleries inspected in NAVER NOW stacked images in reading order; expansion controls remained visible.

| Route                                                      | Inspected mobile content                                         |
| ---------------------------------------------------------- | ---------------------------------------------------------------- |
| `/project/tstore`                                          | Korean title/body, diagrams, subsection headings                 |
| `/project/onestore`                                        | Title/metadata, SlideShare fallback/link, body/image             |
| `/project/bobplanet`                                       | Title/metadata, SlideShare fallback/link, Korean lists           |
| `/project/chatbot`                                         | Title/metadata, body and screenshot                              |
| `/project/gdc`                                             | Title/metadata, process graphic, section headings                |
| `/project/orderbook`                                       | Title/metadata, image, process graphic, body                     |
| `/project/lookbook`                                        | Title/metadata, illustration, lists and body                     |
| `/project/lgd-project`                                     | Title/metadata, image, quotation and body                        |
| `/project/liff-project`                                    | Long title, screenshots, headings and quotation                  |
| `/project/ldsg`                                            | Title/metadata, design samples, body and quotation               |
| `/project/tensorflow-js`                                   | Title, animated media, body, static tweets after repair          |
| `/project/naver-now`                                       | Direct hidden-page access, long title, stacked gallery           |
| `/project/figma-autoname`                                  | Multiline title, Figma link card, body                           |
| `/project/klever`                                          | Long title, gallery/caption, timeline, quote card, label repair  |
| `/project/form-helper-chrome`                              | Multiline title, screenshot, styled quote card                   |
| `/project/talk-to-figma-mcp`                               | Long title, GitHub link, lists and inline code                   |
| `/project/how-far-can-a-product-designer-build-with-codex` | Title, role/team, body and inline code                           |
| `/blog/machine-learning-for-design-systems`                | Title, graphics, code highlighting and horizontal code scrolling |
| `/blog/mcp-magic-retrospective`                            | Korean title, translation link, figure, detailed caption         |
| `/blog/mcp-magic-retrospective-en`                         | English title, translation link, figure and caption              |

## Defects found and repaired

- **Nested tweet links caused a hydration mismatch.** The GFM pass was autolinking URL text inside an existing original HTML link. The rich-text migration now preserves text as literal JSX expressions, avoiding a second autolink pass. A fresh TFJS page showed the complete static quote, zero nested anchors, and no new hydration error/issue badge. The validator now rejects nested rendered anchors.
- **Timeline labels briefly displayed serialized JSX syntax.** Moving rich inline text into the date string produced labels such as `{"Jan 2024: The Question"}`. Timeline dates now come from the original plain label. A full reload visually confirmed `Jan 2024: The Question` and `Feb 2024: The Discovery`; a serializer regression guard was added.
- Separate source/render checks found Korean bold delimiters interpreted differently by CommonMark. Original non-code `**…**` spans now become explicit strong elements. The inspected Korean article displays emphasis correctly. Original code blocks remain byte-for-byte unchanged.

## Limits and handoff

SlideShare frames were still loading in the sampled screenshots; their original links and fallback status remained visible. This audit does **not** assert that every historical third-party presentation or video is still playable. It also does not claim that all 50 galleries were manually advanced, every long article was scrolled from beginning to end, or every lazy-loaded image was visually read. Source/media parity and the complete interaction checks are recorded separately by the automated verification and component audit.

The final production build should receive the same representative regression checks after rebuilding, because the development route cache can retain previously rendered content until a full reload.
