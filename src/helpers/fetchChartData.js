import { calculateTimeSaved } from "./timeCalchelper";

const timePerUnit = {
  keystrokes: 60 / 170,
  invoices_posted: 60,
  error_pages_added: 120,
  hotkeys_pressed: 2,
  text_files_generated: 25,
  directories_created: 10,
  files_moved: 5,
  checks_sorted: 30,
  ach_sorted: 30,
  amex_sorted: 30,
  wire_sorted: 30,
  emails_flagged: 10,
  emails_destroyed: 60,
  emails_forwarded: 30,
  attachments_extracted: 25,
  times_opened: 0,
  crystal_reports_avoided: 60,
  vendor_numbers_appended: 35,
  pos_received: 45,
  json_dbs_poarsed: 100,
  html_files_converted: 45,
  pos_found: 45,
  added_to_release_queue: 10,
  invoices_renamed: 35,
};

export async function fetchAndParseChartData() {
  const response = await fetch("https://my-ap-stats-server.onrender.com/api/github-data");

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub data from backend.");
  }

  const timeline = await response.json();

  return timeline.map(({ date, stats }) => {
    const totalSeconds = stats.reduce((sum, stat) => sum + stat.seconds_saved, 0);
    const dollarsSaved = Math.round((totalSeconds / 3600) * 27.4);
    return {
      date,
      stats,
      timeSaved: totalSeconds,
      moneySaved: dollarsSaved,
    };
  });
}
