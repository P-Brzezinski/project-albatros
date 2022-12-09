import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("albatros.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    // database.transaction((tx) => {
    //   tx.executeSql("DROP TABLE games");
    // });
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY NOT NULL,
        dateStarted TEXT NOT NULL,
        dateEnded TEXT NOT NULL,
        timePlayed TEXT NOT NULL
    )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const insertGame = (game) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO games (dateStarted, dateEnded, timePlayed) VALUES (?, ?, ?)`,
        [game.dateStarted, game.dateEnded, game.timePlayed],
        (_, result) => {
          resolve(result);
          console.log(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};
