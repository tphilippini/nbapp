import mongoose from "mongoose";

const MatchesStatsSchema = new mongoose.Schema({
  id: Number,

  matchIdFull: String,

  playerIdFull: String,

  statsJSON: Object,

  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Players",
  },
});

const MatchesStats = mongoose.model(
  "MatchesStats",
  MatchesStatsSchema,
  "MatchesStats"
);
export default MatchesStats;
