// import MatchesStats from "../matches-stats/match-stats.model";
// import Players from "../players/player.model";
import Teams from "../teams/team.model.js";
// import YoutubeVideos from "../videos/youtube.model";
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import mongoose from "mongoose";

const MatchesSchema = new mongoose.Schema(
  {
    id: Number,

    matchId: {
      type: String,
      required: true,
      unique: true,
    },

    matchCode: String,

    startDateEastern: String,

    startTimeUTCString: String,

    startTimeUTC: Date,

    endTimeUTC: Date,

    hTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Teams" },

    hTeamId: String,

    hTeamWins: String,

    hTeamLosses: String,

    hTeamTriCode: String,

    hTeamScore: String,

    vTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Teams" },

    vTeamId: String,

    vTeamWins: String,

    vTeamLosses: String,

    vTeamTriCode: String,

    vTeamScore: String,

    statusNum: Number,

    nuggetText: String,

    gameClock: String,

    currentPeriod: Number,

    periodType: Number,

    maxRegular: Number,

    isHalfTime: Boolean,

    isEndOfPeriod: Boolean,

    hTeamQScore: Object,

    vTeamQScore: Object,

    seriesGameNumber: String,

    seriesText: String,

    seriesConference: String,

    poRoundDesc: String,

    stats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MatchesStats",
      },
    ],

    // videos: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "YoutubeVideos",
    //   },
    // ],
  },
  {
    toJSON: { virtuals: true },
  }
);

MatchesSchema.virtual("hTeamRecordFormatted").get(function () {
  return `${this.hTeamWins}-${this.hTeamLosses}`;
});

MatchesSchema.virtual("vTeamRecordFormatted").get(function () {
  return `${this.vTeamWins}-${this.vTeamLosses}`;
});

MatchesSchema.statics.findMatchesByStartDate = function (date) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line consistent-return
    this.find({ startDateEastern: date }, (error, matches) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      resolve(matches);
    })
      .select("-__v")
      .select("-_id")
      // .populate({
      //   path: "videos",
      //   select: "-_id -__v",
      //   populate: { path: "players", select: "-_id -__v" },
      // })
      // .populate({
      //   path: "stats",
      //   select: "-_id -__v",
      //   // populate: { path: "player", select: "-_id -__v" },
      // })
      .populate("hTeam vTeam", "-_id -__v");
    // use leanQueries for extra data manipulation for frontend
    // .lean({ virtuals: true });
  });
};

MatchesSchema.pre("remove", (next) => {
  this.model("MatchesStats").deleteMany({ match: this._id }, next);
  // this.model("YoutubeVideos").deleteMany({ match: this._id }, next);
});

const Matches = mongoose.model("Matches", MatchesSchema, "Matches");
export default Matches;
