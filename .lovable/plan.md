
I’ll update the dashboard using the attached `lovable_update_instructions.md` and `yogenfruz_dashboard_1.jsx`.

Implementation plan:
1. Update `src/components/YogenFruzDashboard.jsx`
   - Add the new `AUDIENCES` data constant.
   - Add the derived `CHANNEL_AGG` platform summary constant.
   - Keep existing design tokens, shared components, sidebar, header structure, campaign chips, and footer styling intact.

2. Enable sidebar view routing
   - Keep `activeNav` as the view state.
   - Update the header subtitle to change per section:
     - overview
     - campaigns
     - channels
     - audiences
     - stores
   - Update the page title to show the selected campaign or active nav section.

3. Wrap existing content as the overview page
   - Gate the current dashboard content behind `activeNav === 'overview'`.
   - Preserve the existing charts, KPI cards, tables, keywords, creatives, and local conversion panel unchanged.

4. Add the new sidebar pages
   - `campaigns`: interactive campaign cards with budget progress, channel spend allocation, stats, and insights.
   - `channels`: channel KPI cards, spend chart, CTR/CPC charts, and channel × campaign matrix.
   - `audiences`: TikTok audience KPI cards, insight strip, stacked audience chart, and audience matrix.
   - `stores`: local conversion KPI cards, drive-to-store campaign table, and expanded conversion breakdown.

5. Verify
   - Run the project build after implementation.
   - Fix any JSX/import/syntax issues if the uploaded JSX needs adjustment for this project.
   - Confirm the sidebar changes the main content without changing routes or app infrastructure.
