import * as msw from 'msw'

const rest = msw.rest ?? (msw.default && msw.default.rest)
if (!rest) {
  throw new Error('msw.rest is not available. Check msw installation')
}

export const handlers = [
  rest.get('https://api.sportsdata.io/v3/nba/scores/json/SchedulesBasic/:season', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]))
  })
]
