const { createConnection, RowDataPacket } = require("mysql2");
import { connection } from "../utils"
import { IEvent } from "../../interface/eventInterface";

// Connect to DB
const sql = createConnection(connection);


export function eventGetAll(): Promise<IEvent[]> {
    return new Promise((resolve, rej) => {
        sql.query('SELECT * FROM event',
            (err: Error, res: typeof RowDataPacket[]) => {
                if (err) rej(err)
                else resolve(res as IEvent[])
            })
    })
}

export function eventAdd(event: IEvent) {
    return new Promise((resolve, rej) => {
        sql.query('INSERT INTO `event` (`id`, `date_deb`, `date_fin`, `titre`, `location`, `categorie`, `statut`, `description`, `transparence`, `nbMaj`) VALUES ( NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [event.date_deb, event.date_end, event.titre, event.location, event.category, event.status, event.description, event.transparence, event.nbOfUpdate],
        (err: Error) => {
            if (err) rej(err);
            else resolve("Event added");
        })
    })
}