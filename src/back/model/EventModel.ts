const { createConnection, RowDataPacket } = require("mysql2");
import { connection } from "../utils"
import { IEvent } from "../../interface/eventInterface";

// Connect to DB
const sql = createConnection(connection);

// Get All Data
export function eventGetAll(): Promise<IEvent[]> {
    return new Promise((resolve, rej) => {
        sql.query('SELECT * FROM event',
            (err: Error, res: typeof RowDataPacket[]) => {
                if (err) rej(err)
                else resolve(res as IEvent[])
            })
    })
}

// Get Data by ID
export function eventGetById(id: Number): Promise<IEvent[]> {
    return new Promise((resolve, rej) => {
        sql.query('SELECT * FROM event WHERE id = ?', id,
            (err: Error, res: typeof RowDataPacket[]) => {
                if (err) rej(err)
                else resolve(res as IEvent[])
            })
    })
}

// Add Event
export function eventAdd(event: IEvent) {
    return new Promise((resolve, rej) => {
        sql.query('INSERT INTO `event` (`id`, `date_deb`, `date_fin`, `titre`, `location`, `categorie`, `statut`, `description`, `transparence`, `nbMaj`) VALUES ( NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [event.date_deb, event.date_fin, event.titre, event.location, event.categorie, event.statut, event.description, event.transparence, event.nbOfUpdate],
        (err: Error) => {
            if (err) rej(err);
            else resolve("Event added");
        })
    })
}

// Update Event
export function eventUpdate(event: IEvent) {
    return new Promise((resolve, rej) => {
        sql.query('UPDATE `event` SET `date_deb` = ?, `date_fin` = ?, `titre` = ?, `location` = ?, `categorie` = ?, `statut` = ?, `description` = ?, `transparence` = ?, `nbMaj` = `nbMaj` +1 WHERE id = ?',
        [event.date_deb, event.date_fin, event.titre, event.location, event.categorie, event.statut, event.description, event.transparence, event.id],
        (err: Error) => {
            if (err) rej(err);
            else resolve("Event updated");
        })
    })
}

// Delete Event
export function eventDelete(id: number) {
    return new Promise((resolve, rej) => {
        sql.query('DELETE FROM `event` WHERE id = ?',
        id,
        (err: Error) => {
            if (err) rej(err);
            else resolve("Event updated");
        })
    })
}