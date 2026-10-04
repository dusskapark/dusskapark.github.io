import "server-only";

/** Live GitHub profile stats, fetched at build/revalidate time. */
export interface GithubProfile {
  url: string;
  repos: number;
  followers: number;
  since: number;
}

const GITHUB_USER = "dusskapark";

/**
 * Pulls public profile stats from the GitHub REST API. Returns null on any
 * failure (offline build, rate limit, schema change) so callers can fall back
 * to static copy instead of breaking the page.
 */
export async function getGithubProfile(): Promise<GithubProfile | null> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER}`,
      {
        headers: { Accept: "application/vnd.github+json" },
        // Refresh once a day; these numbers change slowly.
        next: { revalidate: 86400 },
      },
    );
    if (!response.ok) return null;
    const data = await response.json();
    const since = new Date(data.created_at).getFullYear();
    return {
      url: data.html_url ?? `https://github.com/${GITHUB_USER}`,
      repos: typeof data.public_repos === "number" ? data.public_repos : 0,
      followers: typeof data.followers === "number" ? data.followers : 0,
      since: Number.isFinite(since) ? since : 2013,
    };
  } catch {
    return null;
  }
}
