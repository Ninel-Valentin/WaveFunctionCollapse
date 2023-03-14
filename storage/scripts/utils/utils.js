import tilesJsonData from '../../data/relations.json' assert {type: 'json'};
import Consts from "./Consts.js";

export default class utils {
    /**
     * @param {Consts.direction} direction
     */
    static GetOppositeDirection(direction) {
        const directionKeys = Object.keys(Consts.direction);

        const currentIndex = directionKeys.indexOf(direction);
        // N-E-S-W : the oppositeDirections are 2 indexes away
        const nextIndex = (currentIndex + 2) % directionKeys.length;

        return Consts.direction[directionKeys[nextIndex]];
    }

    /**
     * @param {Number} jsonId
     * @param {Consts.direction} direction
     */
    static GetDirectionData(jsonId, direction) {
        let links = Object.assign([], tilesJsonData.find(x => x.id == jsonId).links);
        switch (direction) {
            case Consts.direction.N:
                return links.shift();
            case Consts.direction.E:
                return links.map(x => x.split('').pop()).join('');
            case Consts.direction.S:
                return links.pop();
            case Consts.direction.W:
                return links.map(x => x.split('').shift()).join('');
            default:
                this.ErrorLogs.DirectionUnknown(direction);
        }
        return null;
    }

    /**
     * @param {Number} colPos 
     * @param {Number} rowPos 
     */
    static GetIdByCoords(colPos, rowPos) {
        return document.querySelector(`div.tile[data-position="${colPos}:${rowPos}"]`)?.getAttribute('data-tileid') || null;
    }

    static ErrorLogs = {
        /**
         * @param {Consts.direction} direction
         */
        DirectionUnknown: (direction) => {
            console.log(`ERROR: ~/GetDirectionData(): Unknown direction "${direction}".`)
        },
        AlgorithmLogicError: () => {
            console.log(`ERROR: ~/StartAlgorithm(): Bad algorithm solving try! Retrying...`)
        },
    }

    static GetRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
};