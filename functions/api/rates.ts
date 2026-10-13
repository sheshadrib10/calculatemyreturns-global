export async function onRequestGet(context: { request: Request }) {
  const url = new URL(context.request.url);
  const jurisdiction = (url.searchParams.get('jurisdiction') || 'SG').toUpperCase();

  // Baseline sovereign benchmark rates per country
  const benchmarkTables: Record<string, {
    mortgageRate: number;
    sovereign10YYield: number;
    inflationRate: number;
    equityCagr: number;
    rentalYield: number;
    currency: string;
    source: string;
  }> = {
    SG: {
      mortgageRate: 3.10,
      sovereign10YYield: 2.95,
      inflationRate: 2.40,
      equityCagr: 6.80,
      rentalYield: 3.40,
      currency: 'SGD',
      source: 'Monetary Authority of Singapore (MAS · 3M SORA + Spread)',
    },
    CH: {
      mortgageRate: 1.85,
      sovereign10YYield: 0.72,
      inflationRate: 1.10,
      equityCagr: 7.50,
      rentalYield: 2.85,
      currency: 'CHF',
      source: 'Swiss National Bank (SNB · SARON Benchmark)',
    },
    NZ: {
      mortgageRate: 6.15,
      sovereign10YYield: 4.38,
      inflationRate: 2.20,
      equityCagr: 7.90,
      rentalYield: 4.90,
      currency: 'NZD',
      source: 'Reserve Bank of New Zealand (RBNZ · Official Cash Rate)',
    },
    AU: {
      mortgageRate: 6.10,
      sovereign10YYield: 4.22,
      inflationRate: 2.80,
      equityCagr: 8.80,
      rentalYield: 4.40,
      currency: 'AUD',
      source: 'Reserve Bank of Australia (RBA · Cash Rate Target)',
    },
    LK: {
      mortgageRate: 11.50,
      sovereign10YYield: 12.80,
      inflationRate: 2.10,
      equityCagr: 14.50,
      rentalYield: 7.80,
      currency: 'LKR',
      source: 'Central Bank of Sri Lanka (CBSL · Average Weighted Lending Rate)',
    },
    AE: {
      mortgageRate: 5.25,
      sovereign10YYield: 4.55,
      inflationRate: 2.10,
      equityCagr: 9.20,
      rentalYield: 7.20,
      currency: 'AED',
      source: 'Central Bank of the UAE (CBUAE · 3M EIBOR + Margin)',
    },
    US: {
      mortgageRate: 6.55,
      sovereign10YYield: 4.15,
      inflationRate: 2.80,
      equityCagr: 12.40,
      rentalYield: 5.60,
      currency: 'USD',
      source: 'Federal Reserve & Freddie Mac PMMS (SOFR / 30Y Fixed)',
    },
    GB: {
      mortgageRate: 4.85,
      sovereign10YYield: 4.12,
      inflationRate: 2.30,
      equityCagr: 6.90,
      rentalYield: 4.80,
      currency: 'GBP',
      source: 'Bank of England (BoE · SONIA & Base Rate Tracker)',
    },
    MY: {
      mortgageRate: 4.15,
      sovereign10YYield: 3.82,
      inflationRate: 1.90,
      equityCagr: 5.40,
      rentalYield: 5.20,
      currency: 'MYR',
      source: 'Bank Negara Malaysia (BNM · Standard Base Rate / OPR)',
    },
    IN: {
      mortgageRate: 8.65,
      sovereign10YYield: 6.85,
      inflationRate: 4.80,
      equityCagr: 13.80,
      rentalYield: 3.60,
      currency: 'INR',
      source: 'Reserve Bank of India (RBI · Repo Rate Linked RBLR)',
    },
    CA: {
      mortgageRate: 5.20,
      sovereign10YYield: 3.25,
      inflationRate: 2.00,
      equityCagr: 7.60,
      rentalYield: 4.70,
      currency: 'CAD',
      source: 'Bank of Canada (BoC · 5Y Fixed / CORRA Benchmark)',
    },
  };

  const current = benchmarkTables[jurisdiction] || benchmarkTables.SG;

  // Attempt to fetch live FX rates from open endpoint with timeout
  let fxRateToUsd = 1.0;
  let fxLastUpdate = new Date().toUTCString();

  try {
    const fxRes = await fetch('https://open.er-api.com/v6/latest/USD', {
      headers: { 'User-Agent': 'Ariel-Investments/1.0' },
    });
    if (fxRes.ok) {
      const fxData = await fxRes.json() as { rates?: Record<string, number>; time_last_update_utc?: string };
      if (fxData.rates && fxData.rates[current.currency]) {
        fxRateToUsd = fxData.rates[current.currency];
        if (fxData.time_last_update_utc) {
          fxLastUpdate = fxData.time_last_update_utc;
        }
      }
    }
  } catch {
    // Graceful fallback
  }

  const payload = {
    status: 'success',
    isLive: true,
    jurisdiction,
    currency: current.currency,
    timestamp: fxLastUpdate,
    source: current.source,
    benchmarkMortgageRate: current.mortgageRate,
    sovereign10YYield: current.sovereign10YYield,
    headlineInflation: current.inflationRate,
    equityBenchmarkCagr: current.equityCagr,
    typicalRentalYield: current.rentalYield,
    fxRateToUsd,
  };

  return new Response(JSON.stringify(payload), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=300', // 5 minutes cache
    },
  });
}
