import { API_URL, CLIENT_ID, TOKEN_URL } from "@/lib/igdb-config";

interface Token {
  access_token: string; // Token to authenticate API requests.
}

interface RequestParams {
  resource: string; // The endpoint to request data from.
  body: string; // The body of the request, usually containing the query.
}

interface SearchParams {
  name: string; // The name to search for.
  [key: string]: any; // Allows for additional, dynamic parameters.
}

// Query to fetch games by their rating, with various filters applied.
const gamesByRating = `
  fields
    name,
    cover.image_id;
  sort aggregated_rating desc;
  where aggregated_rating_count > 20 & aggregated_rating != null & rating != null & category = 0;
  limit 12;
`;

// Query to fetch detailed information about a single game.
const fullGameInfo = `
  fields
    name,
    summary,
    aggregated_rating,
    cover.image_id,

    genres.name,
    screenshots.image_id,

    release_dates.platform.name,
    release_dates.human,

    involved_companies.developer,
    involved_companies.publisher,
    involved_companies.company.name,

    game_modes.name,
    game_engines.name,
    player_perspectives.name,
    themes.name,

    external_games.category,
    external_games.name,
    external_games.url,

    similar_games.name,
    similar_games.cover.image_id,

    websites.url,
    websites.category,
    websites.trusted
;`;

const api = {
  token: null as Token | null, // Initially, there's no token.

  // Function to retrieve a new token from the TOKEN_URL.
  async getToken(): Promise<void> {
    try {
      const res = await fetch(TOKEN_URL, { method: "POST", cache: "no-store" });
      this.token = (await res.json()) as Token; // Parse and store the token.
    } catch (error) {
      console.error(error); // Log any errors that occur during the fetch operation.
    }
  },

  // Function to make an authenticated request to the API.
  request({ resource, ...options }: RequestParams): Promise<any> {
    if (!this.token) {
      throw new Error("Token is not initialized."); // Ensure the token is present.
    }

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Accept", "application/json");
    requestHeaders.set("Client-ID", CLIENT_ID);
    requestHeaders.set("Authorization", `Bearer ${this.token.access_token}`);

    return fetch(`${API_URL}${resource}`, {
      method: "POST",
      headers: requestHeaders,
      ...options,
    })
      .then(async (response) => {
        const data = await response.json();
        return data; // Return the parsed JSON data.
      })
      .catch((error) => {
        return error; // Return any errors that occur during the fetch operation.
      });
  },

  // Function to fetch games by their rating using a predefined query.
  getGamesByRating(): Promise<any> {
    return this.request({
      resource: "/games",
      body: gamesByRating, // Use the gamesByRating query.
    });
  },

  // Function to fetch detailed information about a single game by its ID.
  getGameById(gameId: number): Promise<any> {
    return this.request({
      resource: "/games",
      body: `${fullGameInfo} where id = (${gameId});`, // Use the fullGameInfo query with a specific game ID.
    });
  },

  // Function to search for games based on a name and optional additional fields.
  search({ name = "", ...fields }: SearchParams): Promise<any> {
    let str = ""; // Initialize an empty string for additional search parameters.

    for (const [key, value] of Object.entries(fields)) {
      str += ` & ${key} = ${value}`; // Append each additional field to the search query.
    }

    return this.request({
      resource: "/games",
      body: `
      fields
        name,
        cover.image_id;
      where
        cover.image_id != null
        ${str};
      ${name ? `search "${name}";` : ""}
      limit 50;`, // Construct the final search query.
    });
  },
};

await api.getToken(); // Initialize the token before exporting the API.

export default api;
