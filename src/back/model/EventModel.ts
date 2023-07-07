import { createConnection } from "mysql2";
import { connection } from "../utils"
import { IEvent } from "../../interface/eventInterface";

// Connect to DB
const sql = createConnection(connection);


export function eventGetAll(): Promise<IEvent[]> {
    return new Promise((resolve, rej) => {
        sql.query('SELECT * FROM event',
            (err: Error, res) => {
                if (err) rej(err)
                else resolve(res as IEvent[])
            })
    })
}

export function eventAdd(event: IEvent) {
    return new Promise((resolve, rej) => {
        sql.query('iNSERT INTO event (date_deb,date_fin, titre, location, categorie, status, description, transparence, nbMaj) VALUES (?,?,?,?,?,?,?,?,?)'),
        [event.date_start, event.date_end, event.title, event.location, event.category, event.status, event.description, event.transparence, event.nbOfUpdate],
        (err: Error) => {
            if (err) rej(err);
            else resolve("Event added");
        }
    })
}