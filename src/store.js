import { AsyncStorage } from 'react-native';

const HIGHSCORE_KEY = 'highscore';

export const getHighscores = () => AsyncStorage
    .getItem(HIGHSCORE_KEY).then(highscore => JSON.parse(highscore) || []);

export const createHighscoreEntry = (playerName, seconds) =>
    getHighscores().then((highscores) => {
        const nextHighscore = (highscores || [])
            .concat([{ playerName, seconds, finished: new Date() }])
            .sort((entry1, entry2) => entry2.seconds - entry1.seconds);
        return AsyncStorage.setItem(HIGHSCORE_KEY, JSON.stringify(nextHighscore));
    });
