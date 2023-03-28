import { checkBoxScore, findTodayMatches } from "../_src/helpers/nba.js";

import Matches from "../_src/matches/match.model.js";
import MatchesStats from "../_src/matches-stats/match-stats.model.js";
import Players from "../_src/players/players.model.js";
import Teams from "../_src/teams/team.model.js";
import dayjs from "dayjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import pkg from "p-iteration";

const { forEachSeries } = pkg;

dotenv.config();

const isDevMode = process.env.NODE_ENV === "development";

async function saveStats(match, players) {
  await forEachSeries(
    players,
    async (p) =>
      new Promise(async (resolve) => {
        // find the player
        let existingPlayer = await Players.findOne({
          playerId: p.personId,
        });

        // if (!existingPlayer) {
        //   const player = {
        //     name: stat.name,
        //     firstName: stat.firstName,
        //     lastName: stat.lastName,
        //     playerId: stat.personId,
        //     number: stat.jerseyNum,
        //     position: stat.position,
        //     teamId: stats.teamId,
        //     teamTriCode: stats.teamTricode,
        //     teamName: stats.teamName,
        //   };

        //   try {
        //     const data = new Players(player);
        //     await data.save().then(() => {
        //       console.log(`${player.name} ✔`);
        //     });
        //   } catch (error) {
        //     console.log(`${player.name} ✖`);
        //     console.log(error);
        //   }
        // } else {
        //   existingPlayer.name = stat.name;
        //   existingPlayer.firstName = stat.firstName;
        //   existingPlayer.lastName = stat.lastName;
        //   existingPlayer.number = stat.jerseyNum;
        //   existingPlayer.position = stat.position;
        //   existingPlayer.teamId = stats.teamId;
        //   existingPlayer.teamTriCode = stats.teamTricode;
        //   existingPlayer.teamName = stats.teamName;

        //   try {
        //     const data = new Players(existingPlayer);
        //     await data.updateOne(existingPlayer).then(() => {
        //       console.log(`${existingPlayer.name} ✔`);
        //     });
        //   } catch (error) {
        //     console.log(`${existingPlayer.name} ✖`);
        //     console.log(error);
        //   }
        // }

        // // Retrieve player after update or create
        // existingPlayer = await Players.findOne({
        //   playerId: stat.personId,
        // });

        // find the stats
        const existingMatchStat = await MatchesStats.findOne({
          playerIdFull: p.personId,
          matchIdFull: match.matchId,
        });

        if (existingMatchStat) {
          existingMatchStat.statsJSON = {
            p: parseInt(p.statistics.points, 10),
            a: parseInt(p.statistics.assists, 10),
            or: parseInt(p.statistics.reboundsOffensive, 10),
            dr: parseInt(p.statistics.reboundsDefensive, 10),
            b: parseInt(p.statistics.blocks, 10),
            min: p.statistics.minutesCalculated,
            s: parseInt(p.statistics.steals, 10),
            fgm: parseInt(p.statistics.fieldGoalsMade, 10),
            fga: parseInt(p.statistics.fieldGoalsAttempted, 10),
            tm: parseInt(p.statistics.threePointersMade, 10),
            ta: parseInt(p.statistics.threePointersAttempted, 10),
          };

          try {
            const existingMatchStatPlayer = new MatchesStats(existingMatchStat);
            await existingMatchStatPlayer
              .updateOne(existingMatchStat)
              .then(() => {
                console.log(
                  `Updated stats for: ${existingPlayer.name} matchId: ${match.matchId}`
                );
              });
          } catch (error) {
            console.log("MatchStat for player doesnt update, see error...");
            console.log(error);
          }
        } else {
          const matchStat = {
            matchIdFull: match.matchId,
            playerIdFull: p.personId,
            player: existingPlayer._id,
            statsJSON: {
              p: parseInt(p.statistics.points, 10),
              a: parseInt(p.statistics.assists, 10),
              or: parseInt(p.statistics.reboundsOffensive, 10),
              dr: parseInt(p.statistics.reboundsDefensive, 10),
              b: parseInt(p.statistics.blocks, 10),
              min: p.statistics.minutesCalculated,
              s: parseInt(p.statistics.steals, 10),
              fgm: parseInt(p.statistics.fieldGoalsMade, 10),
              fga: parseInt(p.statistics.fieldGoalsAttempted, 10),
              tm: parseInt(p.statistics.threePointersMade, 10),
              ta: parseInt(p.statistics.threePointersAttempted, 10),
            },
          };

          try {
            const matchS = new MatchesStats(matchStat);
            await matchS.save().then((m) => {
              console.log(
                `MatchStat saved for: ${existingPlayer.name} matchId: ${match.matchId}`
              );
              // Update stats list in match for populate
              match.stats.push(m._id);
            });

            await match.save().then(() => {
              console.log("Saved stats in existing match...");
              console.log("----------------------------------");
            });
          } catch (error) {
            console.log("MatchStat doesnt save, see error...");
            console.log(error);
          }
        }

        resolve();
      })
  );
}

async function main(dateFormatted) {
  return new Promise(async (resolve) => {
    // MATCHES
    const todaysMatches = await findTodayMatches(dateFormatted);
    console.log(`Todays matches found : ${todaysMatches.length}`);
    console.log("----------------------------------");

    if (todaysMatches.length > 0) {
      await forEachSeries(todaysMatches, async (game) => {
        const existingMatch = await Matches.findOne({
          matchId: game.gameId,
        });

        // if match exists and it's not over, update it
        // if (existingMatch && existingMatch.statusNum !== 3) {
        //   console.log("Match exists, game is live, updating the record now...");

        //   existingMatch.nuggetText = game.gameSubtype;
        //   existingMatch.hTeamScore = game.homeTeam.score;
        //   existingMatch.vTeamScore = game.awayTeam.score;
        //   existingMatch.statusNum = game.gameStatus;
        //   existingMatch.hTeamWins = game.homeTeam.wins;
        //   existingMatch.hTeamLosses = game.homeTeam.losses;
        //   existingMatch.vTeamWins = game.awayTeam.wins;
        //   existingMatch.vTeamLosses = game.awayTeam.losses;
        //   existingMatch.maxRegular = game.regulationPeriods;
        //   existingMatch.currentPeriod = game.period;
        //   existingMatch.hTeamQScore = game.homeTeam.periods.map(
        //     (item) => item.score
        //   );
        //   existingMatch.vTeamQScore = game.awayTeam.periods.map(
        //     (item) => item.score
        //   );

        //   console.log("Updating the boxscore record now...");
        //   const bs = await checkBoxScore(dateFormatted, game.gameId);

        //   existingMatch.gameClock = bs.gameClock;

        //   // console.log("Saving players stats...");
        //   // await saveStats(existingMatch, bs.homeTeam);
        //   // await saveStats(existingMatch, bs.awayTeam);

        //   try {
        //     const data = new Matches(existingMatch);
        //     await data.updateOne(existingMatch).then(() => {
        //       console.log("----------------------------------");
        //       console.log("Match is live or over, updated game info...");
        //     });
        //   } catch (error) {
        //     console.log("Match didnt start probably, see error...");
        //     console.log(error);
        //   }
        // } else
        if (existingMatch && existingMatch.statusNum === 3) {
          existingMatch.endTimeUTC = game.endTimeUTC
            ? game.endTimeUTC
            : new Date();
          existingMatch.hTeamScore = game.homeTeam.score;
          existingMatch.vTeamScore = game.awayTeam.score;
          existingMatch.nuggetText = game.gameSubtype;
          existingMatch.maxRegular = game.regulationPeriods;
          existingMatch.currentPeriod = game.period;
          existingMatch.hTeamQScore = game.homeTeam.periods.map(
            (item) => item.score
          );
          existingMatch.vTeamQScore = game.awayTeam.periods.map(
            (item) => item.score
          );

          try {
            const data = new Matches(existingMatch);
            await data.updateOne(existingMatch).then(() => {
              console.log(
                `${game.awayTeam.teamTricode} ${game.awayTeam.score} @ ${game.homeTeam.score} ${game.homeTeam.teamTricode} ✔`
              );
            });
          } catch (error) {
            console.log(
              `${game.awayTeam.teamTricode} ${game.awayTeam.score} @ ${game.homeTeam.score} ${game.homeTeam.teamTricode} ✖`
            );
            console.log(error);
          }
        } else {
          const teams = await Teams.find({ isNBAFranchise: true });
          const homeTeam = teams.find(
            (t) => t.teamTriCode === game.homeTeam.teamTricode
          );
          const awayTeam = teams.find(
            (t) => t.teamTriCode === game.awayTeam.teamTricode
          );

          const match = {
            matchId: game.gameId,
            matchCode: game.gameCode,
            startDateEastern: dayjs(game.gameEt).format("YYYYMMDD"),
            startTimeUTCString: game.gameTimeUTC,
            startTimeUTC: new Date(game.gameTimeUTC),
            endTimeUTC: game.endTimeUTC ? game.endTimeUTC : new Date(),
            hTeam: homeTeam._id,
            hTeamId: game.homeTeam.teamId,
            hTeamWins: game.homeTeam.wins,
            hTeamLosses: game.homeTeam.losses,
            hTeamTriCode: game.homeTeam.teamTricode,
            hTeamScore: game.homeTeam.score,
            vTeam: awayTeam._id,
            vTeamId: game.awayTeam.teamId,
            vTeamWins: game.awayTeam.wins,
            vTeamLosses: game.awayTeam.losses,
            vTeamTriCode: game.awayTeam.teamTricode,
            vTeamScore: game.awayTeam.score,
            statusNum: game.gameStatus,
            nuggetText: game.gameSubtype ? game.gameSubtype : "",
            currentPeriod: game.period ? game.period : 0,
            maxRegular: game.regulationPeriods,
          };

          match.hTeamQScore = game.homeTeam.periods.map((item) => item.score);
          match.vTeamQScore = game.awayTeam.periods.map((item) => item.score);

          try {
            const data = new Matches(match);
            await data.save().then(async () => {
              console.log(
                `${game.awayTeam.teamTricode} ${game.awayTeam.score} @ ${game.homeTeam.score} ${game.homeTeam.teamTricode} ✔`
              );
            });
          } catch (error) {
            console.log(
              `${game.awayTeam.teamTricode} ${game.awayTeam.score} @ ${game.homeTeam.score} ${game.homeTeam.teamTricode} ✖`
            );
            console.log(error);
          }
        }
      });

      console.log("----------------------------------");
      console.log("----------------------------------");

      await forEachSeries(todaysMatches, async (game) => {
        const existingMatch = await Matches.findOne({
          matchId: game.gameId,
        });

        if (existingMatch && existingMatch.statusNum === 3) {
          const bs = await checkBoxScore(dateFormatted, game.gameId);
          existingMatch.gameClock = bs.gameClock;

          const players = [...bs.homeTeam.players, ...bs.awayTeam.players];
          await saveStats(existingMatch, players);
        }
      });

      console.log("----------------------------------");
    }

    resolve();
  });
}

export default function handler(req, res) {
  if (!isDevMode && req.query.type !== "daily") {
    res.status(404).end();

    return;
  }

  /**
   * Connecting database
   */
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.DB_URL);

  const { connection } = mongoose;

  connection.on("error", function (err) {
    console.log(`Connection error to the database ${process.env.DB_NAME}`);
    res.status(502).end();
  });

  connection.once("open", async () => {
    console.log(`Connecting to the database ${process.env.DB_NAME}`);

    // grab todays games and continue to update
    const todayDate =
      dayjs().hour() < 15
        ? dayjs().subtract(1, "d").format("YYYYMMDD")
        : dayjs().format("YYYYMMDD");

    console.log(`Running matches on ${todayDate}`);
    await main(todayDate).then(() => {
      console.log("----------------------------------");
      console.log("Closed database connection");
      connection.close();

      if (!isDevMode) {
        res.status(200).json({ success: true });
      }
    });
  });
}

if (isDevMode) {
  handler();
}
