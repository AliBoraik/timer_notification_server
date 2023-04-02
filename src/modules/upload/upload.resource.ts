import { query } from "../../services/db.service";

export const importExcelDataToSQL = async (userId: number, day: Date, minutes: number) => {
    const q = `insert
               into hours_turnstiles (value,
                                     user_id,
                                     updated_at,
                                     day)
               values ($1, $2, null, $3)`;
    return await query(q, [minutes, userId, day]);
};

export const getUserIdByName = async (username: string) => {
    const q = `select id
               from users
               where username = $1;`;
    const { rows } = await query(q, [username]);
    if (rows.length !== 0)
        return rows[0].id;
};

