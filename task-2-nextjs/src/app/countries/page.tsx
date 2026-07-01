import type { Country, CountriesGraphQLResponse } from "@/types/countries";

const GRAPHQL_ENDPOINT = "https://countries.trevorblades.com";

// Query: retrieve all countries whose currency is USD
const GET_USD_COUNTRIES = `
  query GetUSDCountries {
    countries(filter: { currency: { eq: "USD" } }) {
      name
      code
      languages {
        name
      }
      continent {
        name
      }
    }
  }
`;

async function fetchUSDCountries(): Promise<Country[]> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: GET_USD_COUNTRIES }),
    next: { revalidate: 86400 }, // cache for 24 hours — country data rarely changes
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed with status ${res.status}.`);
  }

  const json: CountriesGraphQLResponse = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }

  return json.data?.countries ?? [];
}

export default async function CountriesPage() {
  let countries: Country[] = [];
  let error: string | null = null;

  try {
    countries = await fetchUSDCountries();
    countries = [...countries].sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    error = err instanceof Error ? err.message : "An unexpected error occurred.";
  }

  return (
    <section>
      {/* Section header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-900 pb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">USD Countries</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Countries that use the US Dollar as their official currency
          </p>
        </div>
        {!error && (
          <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
            {countries.length} countries
          </span>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Countries table */}
      {!error && (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 font-semibold text-gray-700 uppercase tracking-wider text-xs w-12">
                  #
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700 uppercase tracking-wider text-xs">
                  Country Name
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700 uppercase tracking-wider text-xs">
                  Code
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700 uppercase tracking-wider text-xs">
                  Official Language(s)
                </th>
                <th className="px-4 py-3 font-semibold text-gray-700 uppercase tracking-wider text-xs">
                  Continent
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {countries.map((country, index) => (
                <tr
                  key={country.code}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-gray-400 text-xs">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {country.name}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-mono font-semibold text-gray-700">
                      {country.code}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {country.languages.length > 0
                      ? country.languages.map((l) => l.name).join(", ")
                      : <span className="text-gray-400 italic">—</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {country.continent.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
